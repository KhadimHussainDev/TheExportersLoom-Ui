import orderList from "../Data/Orders";

export const calculateOrderSummary = () => {
  let completed = 0,
    ongoing = 0,
    todo = 0;

  orderList.forEach((order) => {
    completed += order.modulesSummary.completed;
    ongoing += order.modulesSummary.ongoing;
    todo += order.modulesSummary.todo;
  });

  const total = completed + ongoing + todo;

  return {
    completedPercentage: (completed / total) * 100,
    ongoingPercentage: (ongoing / total) * 100,
    todoPercentage: (todo / total) * 100,
    total,
  };
};
