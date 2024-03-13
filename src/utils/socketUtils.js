let users = [];

const addUser = (userId, socketId) => {
  if (userId && !users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

export { addUser, removeUser, getUser, users };
