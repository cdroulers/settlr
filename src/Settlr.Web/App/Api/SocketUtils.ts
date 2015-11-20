/*import io = require("socket.io-client");

class SocketUtils {
  private rootUrl: string = process.env.API_URL_ROOT;

  private socket: SocketIOClient.Socket = io.connect(this.rootUrl, {
    path: process.env.API_URL_SOCKET_PATH
  });

  public on(event: string, callback: Function): SocketUtils {
    this.socket.on(event, callback);
    return this;
  }
}

export default new SocketUtils();*/