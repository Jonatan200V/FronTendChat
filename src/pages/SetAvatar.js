import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import { registerRoute } from '../utils/ApiRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { VALIDATIONS } from '../utils/variables';
import { setAvatarRoute } from '../utils/ApiRoutes';
const IMAGES = [
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png',
  `https://mir-s3-cdn-cf.behance.net/project_modules/disp/b3053232163929.567197ac6e6f5.png`,
  `https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png`,
];
const SetAvatar = () => {
  const [avatars, setAvatars] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();
  // const [image, setImage] = useState('');
  useEffect(() => {
    const existUser = window.localStorage.getItem('user');
    console.log(existUser);
    if (!existUser) {
      navigate('/login');
    }
    setAvatars(IMAGES);
  }, []);
  const imageDbUrl = (index) => {
    setSelectedAvatar(index);
  };
  const handleProfilePicture = async () => {
    if (selectedAvatar === null) {
      return toast.error('Please select an avatar', VALIDATIONS);
    }
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user);
    if (user[0]?._id) {
      const { data } = await axios.post(`${setAvatarRoute}/${user[0]._id}`, {
        avatarImage: avatars[selectedAvatar],
      });
      console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        window.localStorage.setItem('user', JSON.stringify(user));
        return navigate('/');
      }
    }
    if (user?._id) {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: avatars[selectedAvatar],
      });
      console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        window.localStorage.setItem('user', JSON.stringify(user));
        return navigate('/');
      }
    }

    toast.error('Error setting avatar. Please try again', VALIDATIONS);
  };
  return (
    <div className='avatar'>
      <div className='avatar__container'>
        <h1 className='avatar__h1'>Pick an avatar as your profile picture</h1>
        <div className='avatar__div'>
          {avatars?.map((avatar, index) => (
            <div key={index} className={'avatar__profil'}>
              {console.log(avatar)}
              <img
                className={`avatar__img ${
                  selectedAvatar === index ? 'avatar__selected' : ''
                }`}
                src={avatar}
                alt='avatar'
                onClick={() => imageDbUrl(index)}
              />
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
      <button onClick={handleProfilePicture} className='register__button'>
        Set as profile picture
      </button>
    </div>
  );
};

export default SetAvatar;
