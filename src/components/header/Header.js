import { Link } from 'react-router-dom';

import classes from '../../index.module.scss';

const Header = () => {
  return (
    <header className={classes['header']}>
      <Link to="/">
        <h1>Realworld Blog</h1>
      </Link>
      <div className={classes['header__button-container']}>
        <button>Sign in</button>

        <button>
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    </header>
  );
};
export default Header;
