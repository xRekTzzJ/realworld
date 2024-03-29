import like from '../../img/like.svg';

import avatar from './avatar.png';

const Article = () => {
  return (
    <div className="article">
      <div className="article__header">
        <h2 className="article__title">Some article title</h2>
        <div className="article__rate-container">
          <img src={like} alt="Like button." />
          <span>12</span>
        </div>
        <div className="article__tag-container">
          <span>Tag1</span>
          <span>SomeTag</span>
        </div>
        <div className="article__person-info">
          <span>John Doe</span>
          <span>March 5, 2020</span>
          <img src={avatar} alt="Person avatar." />
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </div>
  );
};

export default Article;
