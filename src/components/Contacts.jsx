import { useState, useEffect } from 'react';

const Contacts = ({ contacts, currentUser, handleChangeCurrentChatState }) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    handleChangeCurrentChatState(contact);
    setCurrentSelected(index);
  };
  return (
    <div className='contact'>
      {currentUserImage && currentUserName ? (
        <div className='contact__container'>
          <div className='contact__brand'>
            <img
              className='contact__img'
              src='../assets/logo.svg'
              alt='Logo'
              loading='lazy'
            />
            <h3 className='contact__h3'>Chats</h3>
          </div>
          <div className='contact__left'>
            {contacts?.map((contact, index) => (
              <div className='contact__key' key={index}>
                <div
                  className={`contact__contact ${
                    index === currentSelected ? 'contact__selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='contact__avatar'>
                    <img
                      src={contact.avatarImage}
                      alt='Avatar'
                      className='contact__img-avatar'
                    />
                  </div>
                  <div className='contact__username'>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='contact__currentuser'>
            <div className='contact__user-avatar'>
              <img
                className='contact__userimage'
                src={currentUserImage}
                alt='Avatar'
              />
              <div className='contact__users'>
                <h1>{currentUserName}</h1>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Contacts;
