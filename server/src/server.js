const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
// const socketio = require('socket.io');
const webSockets = require('./utils/webSocket');
const { Server } = require('socket.io');
dotenv.config({ path: `${__dirname}/../config.env` });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log('DB connection sucessfully');
});
/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = new Server(server);
global.io.on('connection', webSockets.connection);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on  http://localhost:${port}`);
});
