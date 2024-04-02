import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import avatar from '../../img/avatar.png';
import classes from '../../index.module.scss';

const Header = () => {
  const auth = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const SignContainer = () => {
    return (
      <div className={classes['header__button-container']}>
        <button>Sign in</button>
        <button>
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    );
  };

  const ProfileConteiner = () => {
    return (
      <div className={classes['header__profile-container']}>
        <button>
          <Link to="/sign-up">Create article</Link>
        </button>

        <div className={classes['header__profile']}>
          <span>{username}</span>
          <img src={avatar} alt="Avatar." />
        </div>

        <button>
          <Link to="/sign-up">Log Out</Link>
        </button>
      </div>
    );
  };

  return (
    <header className={classes['header']}>
      <Link to="/">
        <h1>Realworld Blog</h1>
      </Link>
      {auth ? <ProfileConteiner /> : <SignContainer />}
    </header>
  );
};
export default Header;
