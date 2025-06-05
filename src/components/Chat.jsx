import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  FaPhoneAlt,
  FaVideo,
  FaCheck,
  FaCheckDouble,
  FaCircle,
} from "react-icons/fa";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const socketRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Fetch target user info
  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${targetId}`, {
          withCredentials: true,
        });
        setTargetUser(res?.data?.user);
        setIsOnline(res?.data?.user?.isOnline);
        setLastSeen(res?.data?.user?.lastSeen);
      } catch {
        setTargetUser(null);
      }
    };
    if (targetId) fetchTargetUser();
  }, [targetId]);

  // Fetch chat messages
  const fetchChatMessages = async () => {
    const res = await axios.get(`${BASE_URL}/chat/${targetId}`, {
      withCredentials: true,
    });
    const chatMessages = res?.data?.messages.map((msg) => ({
      _id: msg._id,
      firstName: msg.senderId?.firstName,
      lastName: msg.senderId?.lastName,
      senderId: msg.senderId?._id,
      text: msg.text,
      sentAt: msg.sentAt,
      seen: msg.seen,
      seenAt: msg.seenAt,
      status: msg.seen ? "seen" : "delivered",
      chatId: res?.data?._id,
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
    // eslint-disable-next-line
  }, [targetId]);

  // Socket logic
  useEffect(() => {
    if (!userId || !targetId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("userOnline", { userId });
    socket.emit("joinChat", { userId, targetId });

    socket.on("userStatus", ({ userId: changedId, isOnline, lastSeen }) => {
      if (changedId === targetId) {
        setIsOnline(isOnline);
        setLastSeen(lastSeen);
      }
    });

    socket.on("messageReceived", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          status: "delivered",
          seen: false,
          chatId: msg.chatId,
        },
      ]);
      scrollToBottom();
    });

    socket.on("messageSeen", ({ messageId, seenAt }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, seen: true, seenAt, status: "seen" } : m
        )
      );
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [userId, targetId]);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // Mark messages as seen
  useEffect(() => {
    // Find last message sent by target user that is not seen
    const unseen = messages.filter(
      (msg) => msg.senderId === targetId && !msg.seen && msg.chatId && msg._id
    );
    if (unseen.length > 0 && socketRef.current) {
      unseen.forEach((msg) => {
        socketRef.current.emit("messageSeen", {
          chatId: msg.chatId,
          messageId: msg._id,
          userId,
          targetId,
        });
      });
    }
    // eslint-disable-next-line
  }, [messages, userId, targetId]);

  // Format time
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format last seen
  const formatLastSeen = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return `last seen today at ${formatTime(dateStr)}`;
    }
    return `last seen on ${date.toLocaleDateString()} at ${formatTime(
      dateStr
    )}`;
  };

  return (
    <div className="flex flex-col w-full h-[99vh] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden font-sans">
      {/* Chat Header */}
      <div className="flex flex-row justify-between items-center w-full bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full border-2 border-primary">
              <img
                src={
                  targetUser?.photoURL ||
                  "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                }
                alt={targetUser?.firstName}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                {targetUser
                  ? `${targetUser.firstName} ${targetUser.lastName}`
                  : messages.find((msg) => msg.senderId === targetId)
                  ? `${
                      messages.find((msg) => msg.senderId === targetId)
                        .firstName
                    } ${
                      messages.find((msg) => msg.senderId === targetId).lastName
                    }`
                  : "Chat"}
              </span>
              {isOnline ? (
                <span className="flex items-center text-green-400 text-xs font-semibold ml-2">
                  <FaCircle className="mr-1" /> Online
                </span>
              ) : (
                <span className="flex items-center text-gray-400 text-xs font-semibold ml-2">
                  <FaCircle className="mr-1" /> {formatLastSeen(lastSeen)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">{targetUser?.emailId}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className="btn btn-circle btn-ghost text-primary text-xl hover:bg-primary/10"
            title="Call"
          >
            <FaPhoneAlt />
          </button>
          <button
            className="btn btn-circle btn-ghost text-primary text-xl hover:bg-primary/10"
            title="Video Call"
          >
            <FaVideo />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div
        className="flex-1 overflow-y-auto p-6 bg-gray-900 text-gray-200"
        ref={chatBodyRef}
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No messages yet</p>
        ) : (
          messages.map((msg, index) => {
            const isSent = msg.senderId === userId;
            return (
              <div
                key={index}
                className={`flex mb-6 ${
                  isSent ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-2xl px-5 py-3 shadow-lg relative
                  ${
                    isSent
                      ? "bg-gradient-to-br from-green-600 to-green-500 text-white rounded-tr-none"
                      : "bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-tl-none"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <span className="text-xs opacity-70">
                      {formatTime(msg.sentAt)}
                    </span>
                    {isSent && (
                      <>
                        {msg.status === "seen" ? (
                          <FaCheckDouble
                            className="text-blue-300"
                            title="Seen"
                          />
                        ) : (
                          <FaCheck
                            className="text-gray-300"
                            title="Delivered"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Chat Input */}
      <div className="relative flex items-center p-4 bg-gray-800 border-t border-gray-700">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          type="text"
          className="w-full bg-gray-700 text-white rounded-full py-3 pl-4 pr-16 outline-none focus:bg-gray-600 placeholder-gray-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="absolute right-6 bg-primary text-white rounded-full w-14 h-10 flex items-center justify-center hover:bg-primary/80 active:bg-primary/90 transition-colors font-bold text-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
