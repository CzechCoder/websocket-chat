const webSocketServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
const { client } = require("websocket");

// starting the http server and the websocket server
const server = http.createServer();
server.listen(webSocketServerPort);
console.log("Listening on port 8000");

const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

const getUniqueID = () => {
  const s4 = () =>
    Math.floor(1 + Math.random() + 0 * 10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  let userID = getUniqueID();
  console.log(
    new Date() +
      " Received a new connection from origin " +
      request.origin +
      "."
  );
  // receive only requests only from allowerd origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received message: ", message.utf8Data);

      // broadcasting message to all connected users
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log("Sent Message to: ", clients[key]);
      }
    }
  });
});
