import { format } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import activeLike from '../../img/active-like.svg';
import avatar from '../../img/avatar.png';
import like from '../../img/like.svg';
import classes from '../../index.module.scss';

const articleItem = ({ image, username, title, description, favoritesCount, favorited, tagList, createdAt, slug }) => {
  const history = useHistory();
  const [imageError, setImageError] = useState(false);
  const auth = useSelector((state) => state.user.token);

  const clickHandler = () => {
    history.push(`${slug}/`);
  };

  const rateClasses = auth
    ? classes['article-item__rate-container']
    : `${classes['article-item__rate-container']} ${classes['article-item__rate-container_disabled']}`;

  const renderImage = () => {
    if (imageError) {
      return <img src={avatar} alt="Person avatar." />;
    }
    return <img src={image} alt="Person avatar." onError={() => setImageError(true)} />;
  };

  return (
    <div className={classes['article-item']}>
      <div className={classes['article-item__header']}>
        <div className={classes['article-item__info-container']}>
          <h2 className={classes['article-item__title']} onClick={clickHandler}>
            {title.trim()}
          </h2>
        </div>
        <div className={classes['article-item__tag-container']}>
          {tagList.map((i, index) => {
            if (index < 10 && i !== null && i.length) {
              return <span key={index}>{i}</span>;
            }
          })}
        </div>
        <div className={classes['article-item__person-info']}>
          <span>{username.trim()}</span>
          <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          {renderImage()}
        </div>
      </div>
      <p onClick={clickHandler}>{description}</p>
      <div className={rateClasses}>
        <img src={favorited ? activeLike : like} alt="Like button." />
        <span>{favoritesCount}</span>
      </div>
    </div>
  );
};

export default articleItem;
