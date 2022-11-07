import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUserRoute, host } from '../utils/ApiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';
const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const navigate = useNavigate();
  // useEffect(())
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!window.localStorage.getItem('user')) {
      return navigate('/login');
    }
    console.log(user);
    if (user[0]) {
      setCurrentUser(user[0]);
    } else {
      setCurrentUser(user);
    }
    console.log('hola');
  }, []);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
    console.log(currentUser.isAvatarImageSet);
    if (currentUser && currentUser.isAvatarImageSet) {
      const getAllUserApi = async () => {
        const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
        return setContacts(data);
      };
      getAllUserApi();
    }
    // navigate('/setAvatar');
  }, [currentUser]);
  console.log(currentUser);
  const handleChangeCurrentChatState = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className='chat'>
      <div className='chat__container'>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          handleChangeCurrentChatState={handleChangeCurrentChatState}
        />
        {currentChat ? (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        ) : (
          <Welcome currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Chat;
