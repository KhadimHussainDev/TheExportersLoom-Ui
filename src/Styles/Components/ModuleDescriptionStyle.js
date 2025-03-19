import { StyleSheet } from 'react-native';

const ModuleDescriptionStyle = (width, height) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 15,
      margin: 10,
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    headerText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#2c3e50',
      marginLeft: 10,
    },
    content: {
      paddingHorizontal: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: '#666',
      width: 100,
    },
    value: {
      fontSize: 15,
      color: '#2c3e50',
      flex: 1,
    },
    priceValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2ecc71',
      flex: 1,
    },
    descriptionContainer: {
      marginTop: 5,
    },
    description: {
      fontSize: 14,
      color: '#34495e',
      marginTop: 5,
      lineHeight: 20,
    },
  });
};

export default ModuleDescriptionStyle;
