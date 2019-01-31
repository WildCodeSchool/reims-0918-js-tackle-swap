import io from "socket.io-client";

const socket = io.connect(`${process.env.REACT_APP_URL_API}`);

module.exports.default = socket;
