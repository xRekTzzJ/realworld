import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import activeLike from '../../img/active-like.svg';
import like from '../../img/like.svg';

const articleItem = ({ image, username, title, description, favoritesCount, favorited, tagList, createdAt, slug }) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(slug);
  };

  return (
    <div className="article-item">
      <div className="article-item__header">
        <div className="article-item__info-container">
          <h2 className="article-item__title" onClick={clickHandler}>
            {title.trim()}
          </h2>
        </div>
        <div className="article-item__tag-container">
          {tagList.map((i, index) => {
            if (index < 10 && i !== null && i.length) {
              return <span key={index}>{i}</span>;
            }
          })}
        </div>
        <div className="article-item__person-info">
          <span>{username.trim()}</span>
          <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          <img src={image} alt="Person avatar." />
        </div>
      </div>
      <p>{description}</p>
      {/* article-item__rate-container_disabled */}
      <div className="article-item__rate-container">
        <img src={favorited ? activeLike : like} alt="Like button." />
        <span>{favoritesCount}</span>
      </div>
    </div>
  );
};

export default articleItem;
