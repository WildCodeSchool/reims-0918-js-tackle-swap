const parseMessage = message => {
  const startBold = message.indexOf("[BOLD]");
  const endBold = message.indexOf("[/BOLD]");
  console.log(
    message.replace(/\[BOLD\]/, "<strong>").replace(/\[\/BOLD\]/, "</strong>")
  );
  return message;
};
export default parseMessage;
