import React, { useEffect, useRef, useState } from "react";
import EmojiInput from "react-input-emoji";
import {
  getMessages,
  getUser,
  getVendor,
  sendMessage,
} from "../../../../Services/chatApi";

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    try {
      const othersId = chat?.members.find((id) => id !== currentUser);
      if (chat !== null) {
        (async function () {
          const { data } = await getUser(othersId);
          console.log(data);
          setUserData(data.user);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    try {
      if (chat !== null) {
        (async function () {
          const { data } = await getMessages(chat._id);
          console.log(data, "dshjg");
          setMessages(data);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [chat]);

  useEffect(() => {
    try {
      if (chat !== null) {
        (async function () {
          const { data } = await getMessages(chat._id);
          setMessages(data);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await sendMessage(message);
      setMessages([...messages, data.message]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage?.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  return (
    <>
      {chat && (
        <>
          <div className="py-2 px-3 bg-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                  alt="User"
                />
              </div>
              <div className="ml-4">
                <p className="text-gray-900">{userData?.name}</p>
                {/* <p className="text-gray-700 text-xs mt-1">
                                    Andrés, Tom, Harrison, Arnold, Sylvester
                                </p> */}
              </div>
            </div>
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    fillOpacity=".5"
                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    fillOpacity=".5"
                    d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    fillOpacity=".6"
                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-gray-300">
            <div className="py-2 px-3">
              <div className="flex justify-center mb-2">
                <div className="rounded py-2 px-4 bg-blue-200">
                  <p className="text-sm uppercase">February 20, 2018</p>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="rounded py-2 px-4 bg-yellow-200">
                  <p className="text-xs">
                    Messages to this chat and calls are now secured with
                    end-to-end encryption. Tap for more info.
                  </p>
                </div>
              </div>

              {messages &&
                messages.map((message) => (
                  <>
                    {message.senderId == currentUser ? (
                      <div ref={scroll} className="message">
                        <div className="chat chat-end">
                          <div className="chat-bubble chat-bubble-success">
                            {message?.text}
                            <time className="text-xs ml-4 opacity-50 self-end">
                              {new Date(message?.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </time>
                          </div>
                          <div className="chat-footer opacity-50">
                            Delivered
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div ref={scroll} className="message ">
                      <div className="chat chat-start">
                          <div className="chat-bubble ">
                            {message?.text}
                            <time className="text-xs ml-4 opacity-50 self-end">
                              {new Date(message?.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </time>
                          </div>
                          <div className="chat-footer opacity-50">
                            Delivered
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="bg-gray-200 px-4 py-4 flex items-center">
            <div className="flex-1 ">
              <EmojiInput value={newMessage} onChange={handleChange} />
            </div>
            <div>
              <button
                className="btn btn-sm btn-neutral"
                onClick={handleSend}
                disabled={!newMessage.trim()} // Disable button when no message
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBox;
