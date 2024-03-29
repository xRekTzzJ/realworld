import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/articles/">
        <h1>Realworld Blog</h1>
      </Link>
      <div className="header__button-container">
        <button>Sign in</button>
        <button>Sign Up</button>
      </div>
    </header>
  );
};
export default Header;
