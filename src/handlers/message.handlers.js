export function handleNewMessage(event) {
    const message = event.message;

    console.log("-------------Message:", message.message);
    console.log("Sender:", message.senderId);
    console.log("Chat:", message.peerId.className);
    console.log("Date:", message.date);
    console.log("Out:", message.out);
}