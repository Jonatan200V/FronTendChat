import React, { useState } from 'react';
// import Piker from 'emoji-piker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  const handleChange = (evt) => {
    setMsg(evt.target.value);
  };
  return (
    <div className='input'>
      <div className='input__button'>
        <form className='input__container' onSubmit={handleSubmit}>
          <div className='input__emoji'>
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {/* {showEmojiPicker && <Piker />} */}
          </div>
          <input
            placeholder='Send Message'
            className='input__input'
            value={msg}
            onChange={handleChange}
          />
          <button className='input__submit'>
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
