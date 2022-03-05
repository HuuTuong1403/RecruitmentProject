class webSockets {
  jobSeekers = [];
  employers = [];
  users = [];
  connection(client) {
    // event fired when the chat room is disconnected
    client.on('disconnection', () => {
      this.users = this.users.filter((user) => user.socketID !== client.id);
    });
    // add identity of user mapped to the socket id
    client.on('identify', (userID) => {
      this.users.push({
        socketID: client.id,
        userID: userID,
      });
    });
    // subscribe person to chat & other user as well
    client.on('subscribe', (room) => {
      client.join(room);
    });
    // mute a chat room
    client.on('unsubscribe', (room) => {
      client.leave(room);
    });
  }
}
module.exports = new webSockets();
