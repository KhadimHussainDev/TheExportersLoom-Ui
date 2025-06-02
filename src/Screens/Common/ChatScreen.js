import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { messageService } from '../../services/messageService';
import { storageService } from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/contants/constants';
import { colors } from '../../Styles/Themes/colors';
import getWindowDimensions from '../../utils/helpers/dimensions';

const { width, height } = getWindowDimensions();

const ChatScreen = ({ route, navigation }) => {
  const { receiverId, receiverName, orderId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  // Set the header title to the receiver's name
  useEffect(() => {
    navigation.setOptions({
      title: receiverName || 'Chat',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, receiverName]);

  // Fetch current user data
  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await storageService.get(STORAGE_KEYS.USER_DATA);
      if (userData.success && userData.data) {
        setCurrentUser(userData.data);
        return userData.data;
      }
      return null;
    } catch (err) {
      console.error('Error fetching current user:', err);
      setError('Failed to load user data');
      return null;
    }
  }, []);

  // Fetch messages between users
  const fetchMessages = useCallback(async () => {
    try {
      setError(null);
      
      const user = currentUser || await fetchCurrentUser();
      if (!user || !user.user_id) {
        setError('User data not available');
        setLoading(false);
        return;
      }

      if (!receiverId) {
        setError('Recipient information missing');
        setLoading(false);
        return;
      }

      const response = await messageService.getMessagesBetweenUsers(user.user_id, receiverId);
      
      if (response.success) {
        setMessages(response.data || []);
      } else {
        setError(response.message || 'Failed to load messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser, receiverId, fetchCurrentUser]);

  // Initial data fetch
  useEffect(() => {
    fetchMessages();
    
    // Set up polling for new messages every 10 seconds
    const intervalId = setInterval(fetchMessages, 10000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchMessages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !receiverId) return;
    
    try {
      const response = await messageService.sendMessage(
        currentUser.user_id,
        receiverId,
        newMessage.trim()
      );
      
      if (response.success) {
        // Add new message to the list
        setMessages(prevMessages => [...prevMessages, response.data]);
        setNewMessage(''); // Clear input
        
        // Scroll to bottom
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      } else {
        console.error('Failed to send message:', response.message);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  // Render a message item
  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUser?.user_id;
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.sentMessage : styles.receivedMessage
      ]}>
        <View style={[
          styles.messageBubble,
          isCurrentUser ? styles.sentBubble : styles.receivedBubble
        ]}>
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.sentText : styles.receivedText
          ]}>
            {item.content}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  // Loading state
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMessages}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* Order reference if available */}
        {orderId && (
          <View style={styles.orderReference}>
            <Text style={styles.orderReferenceText}>
              Order: {orderId}
            </Text>
          </View>
        )}
        
        {/* Messages list */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        
        {/* Message input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newMessage.trim() ? styles.sendButtonDisabled : {}
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons
              name="send"
              size={24}
              color={!newMessage.trim() ? '#cccccc' : colors.white}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textDark,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 18,
    minWidth: 80,
  },
  sentBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 5,
  },
  receivedBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: colors.white,
  },
  receivedText: {
    color: colors.textDark,
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  orderReference: {
    padding: 10,
    backgroundColor: colors.lightBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderReferenceText: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: 'bold',
  },
});

export default ChatScreen; 