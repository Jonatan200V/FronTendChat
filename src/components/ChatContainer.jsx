import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import { allMessageRoute, sendMessageRoute } from '../utils/ApiRoutes';
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();
  useEffect(() => {
    const getAllMsg = async () => {
      if (currentChat) {
        const res = await axios.post(allMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(res.data);
      }
    };
    getAllMsg();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);
  return (
    <div className='chatcontainer'>
      <div className='chatcontainer__container'>
        <div className='chatcontainer__details'>
          <div className='chatcontainer__avatar'>
            <img
              className='contact__userimage'
              src={currentChat?.avatarImage}
              alt='Avatar'
            />
            <div className='chatcontainer__username'>
              <h3>{currentChat?.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
      </div>
      {/* <Messages /> */}
      <div className='chatcontainer__map'>
        {messages.map((msg, index) => (
          <div ref={scrollRef} className='chatcontainer__key' key={index}>
            <div
              className={`chatcontainer__message ${
                msg.fromSelf ? 'sended' : 'received'
              }`}
            >
              <div className='chatcontainer__containermap'>
                <p
                  className={`chatcontainer__p ${
                    msg.fromSelf ? 'p__sended' : 'p__received'
                  }`}
                >
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
