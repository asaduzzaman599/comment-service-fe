import { useEffect } from "react";
import { connectSocket } from "../lib/socket";
import { useDispatch } from "react-redux";
import { addComment, addLikeAndDislike, removeComment } from "../store/comments-slice";

export default function SocketProvider(){
  const dispetch = useDispatch()
     useEffect(() => {
        console.log("Socket Connecting")
    const socket = connectSocket();

    socket.on("connection", () => {
      console.log("Connected with socket ID:", socket.id);
      socket.emit("message", { text: "Hello server!" });
    });
   socket.on("error", (err) => {
  console.error("Connection error:", err.message);
});

    // Listen for messages from server
    socket.on("commentCreated", (msg: any) => {
      dispetch(addComment(msg.comment))
    });
    socket.on("commentRemoved", (msg: any) => {
      dispetch(removeComment(msg.commentId))
    });
    socket.on("commentLikedDisliked", (msg: any) => {
      dispetch(addLikeAndDislike(msg))
    });
  }, []);

    return(<></>)
}