// socketUtils.js
const userSocketIdMap = new Map();

const storeSocketId = (userId, socketId) => {
  userSocketIdMap.set(userId, socketId);
};

const getSocketId = (userId) => {
  return userSocketIdMap.get(userId);
};

export { storeSocketId, getSocketId };
