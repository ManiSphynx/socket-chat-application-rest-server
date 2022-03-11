class Message {
  constructor(uid, name, message) {
    this.uid = uid;
    this.name = name;
    this.message = message;
  }
}

class MessageChat {
  constructor() {
    this.messages = [];
    this.users = {};
  }

  get lastMessages() {
    this.messages = this.messages.slice(0, 10);
    return this.messages;
  }

  get usersArray() {
    return Object.values(this.users);
  }

  addMessage(uid, name, message) {
    this.messages.unshift(new Message(uid, name, message));
  }

  addUser(user) {
    this.users[user.id] = user;
  }

  disconectUser(uid) {
    delete this.users[uid];
  }
}

module.exports = MessageChat;
