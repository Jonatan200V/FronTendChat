import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/main.css';
import { INITIAL_STATE_REGISTER, VALIDATIONS } from '../utils/variables';
import { loginRoute } from '../utils/ApiRoutes';
const Register = () => {
  const [register, setRegister] = useState(INITIAL_STATE_REGISTER);
  const { username, password } = register;
  const navigate = useNavigate();
  useEffect(() => {
    const userRegister = JSON.parse(window.localStorage.getItem('user'));
    console.log(userRegister);
    if (userRegister) {
      navigate('/');
    }
  }, [navigate]);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = handleValidations();
    if (validations === true) {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (!data.status) {
        return toast.error('User exists', VALIDATIONS);
      }
      console.log(data.status);
      window.localStorage.setItem('user', JSON.stringify(data.newUser));
      navigate('/setAvatar');
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };
  const handleValidations = () => {
    if (username.length === 0) {
      toast.error('Username and password is required.', VALIDATIONS);
      return false;
    }
    if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters',
        VALIDATIONS
      );
      return false;
    }

    return true;
  };
  return (
    <div className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <div className='register__div'>
          <img className='register__img' src='../assets/logo.svg' alt='Logo' />
          <h1 className='register__h1'>Chats</h1>
        </div>
        <input
          className='register__input'
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
          value={register.username}
        />

        <input
          className='register__input'
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
          value={register.password}
        />

        <button className='register__button'> Create User</button>
        <div className='register__login'>
          <span className='register__span'>Don't have an account ?</span>
          <Link className='link register__link' to='/register'>
            Register
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
