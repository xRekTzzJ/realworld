import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import avatar from '../../img/avatar.png';
import classes from '../../index.module.scss';
import { logOut } from '../../store/actions';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);
  const userImage = useSelector((state) => state.user.image);

  const [logOutModal, setLogOutModal] = useState(false);

  const SignContainer = () => {
    return (
      <div className={classes['header__button-container']}>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  };

  const LogOutModal = () => {
    return (
      <Modal
        title="Log out"
        open={logOutModal}
        onOk={() => {
          setLogOutModal(false);
          dispatch(logOut());
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
        <Link to="/sign-up">Create article</Link>

        <Link to="/profile">
          <div className={classes['header__profile']}>
            <span>{username}</span>
            <img src={userImage ? userImage : avatar} alt="Avatar." />
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
