import { format } from 'date-fns';

import activeLike from '../../img/active-like.svg';
import like from '../../img/like.svg';

const Article = ({ image, username, title, description, favoritesCount, favorited, tagList, createdAt }) => {
  return (
    <div className="article">
      <div className="article__header">
        <div className="article__info-container">
          <h2 className="article__title">{title.trim()}</h2>
        </div>
        <div className="article__tag-container">
          {tagList.map((i, index) => {
            if (i.trim().length > 0) {
              return <span key={index}>{i}</span>;
            }
          })}
        </div>
        <div className="article__person-info">
          <span>{username.trim()}</span>
          <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          <img src={image} alt="Person avatar." />
        </div>
      </div>
      <p>{description}</p>
      {/* article__rate-container_disabled */}
      <div className="article__rate-container">
        <img src={favorited ? activeLike : like} alt="Like button." />
        <span>{favoritesCount}</span>
      </div>
    </div>
  );
};

export default Article;
