import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import avatar from '../../img/avatar.png';
import { logOut } from '../../store/actions';

import classes from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);
  const userImage = useSelector((state) => state.user.image);
  const [logOutModal, setLogOutModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const SignContainer = () => {
    return (
      <div className={classes['header__button-container']}>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  };

  const renderImage = () => {
    if (imageError || !userImage) {
      return <img src={avatar} alt="Person avatar." />;
    }
    return <img src={userImage} alt="Person avatar." onError={() => setImageError(true)} />;
  };

  const LogOutModal = () => {
    return (
      <Modal
        title="Log out"
        open={logOutModal}
        onOk={() => {
          setLogOutModal(false);
          dispatch(logOut());
          history.push('/');
          toast.success('You have successfully logged out!');
        }}
        onCancel={() => {
          setLogOutModal(false);
        }}
      >
        <p>Do you really want to log out?</p>
      </Modal>
    );
  };

  const ProfileContainer = () => {
    return (
      <div className={classes['header__profile-container']}>
        <Link to="/new-article">Create article</Link>
        <Link to="/profile">
          <div className={classes['header__profile']}>
            <span>{username}</span>
            {renderImage()}
          </div>
        </Link>

        <button
          onClick={() => {
            setLogOutModal(true);
          }}
        >
          Log Out
        </button>
      </div>
    );
  };

  return (
    <header className={classes['header']}>
      <Link to="/">Realworld Blog</Link>
      {auth ? <ProfileContainer /> : <SignContainer />}
      {logOutModal ? <LogOutModal /> : null}
    </header>
  );
};

export default Header;
