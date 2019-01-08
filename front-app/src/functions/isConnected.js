import ls from "local-storage";

const isConnected = () => {
  return ls.get("jwt-tackle-swap") ? true : false;
};

export default isConnected;
