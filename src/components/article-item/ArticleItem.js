import { format } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import avatar from '../../img/avatar.png';
import { favoriteAnArticle, unfavoriteAnArticle } from '../../services/realworld-service';
import Rate from '../rate';

import classes from './article-item.module.scss';

const ArticleItem = ({ image, username, title, description, favoritesCount, favorited, tagList, createdAt, slug }) => {
  const history = useHistory();
  const [imageError, setImageError] = useState(false);
  const auth = useSelector((state) => state.user.token);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [favortiedCount, setFavoritedCount] = useState(favoritesCount);
  const [onLikeLoading, setOnLikeLoading] = useState(false);

  const clickHandler = () => {
    history.push(`${slug}/`);
  };

  const likeHandler = async () => {
    setOnLikeLoading(true);
    try {
      if (isFavorited) {
        await unfavoriteAnArticle(slug, auth);
        setIsFavorited(false);
        setFavoritedCount((state) => state - 1);
      } else {
        await favoriteAnArticle(slug, auth);
        setIsFavorited(true);
        setFavoritedCount((state) => state + 1);
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setOnLikeLoading(false);
    }
  };

  const renderImage = () => {
    if (imageError) {
      return <img src={avatar} alt="Person avatar." />;
    }
    return <img src={image} alt="Person avatar." onError={() => setImageError(true)} />;
  };

  return (
    <div className={classes['article-item']} onClick={clickHandler}>
      <div className={classes['article-item__header']}>
        <div className={classes['article-item__info-container']}>
          <h2
            className={classes['article-item__title']}
            style={
              !title
                ? {
                    opacity: '0.5',
                  }
                : null
            }
          >
            {title ? title : 'The user has not added a title yet.'}
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
      <p
        style={
          !description
            ? {
                opacity: '0.5',
              }
            : null
        }
      >
        {description ? description : 'The user has not added a description yet.'}
      </p>
      <Rate
        auth={auth}
        onLikeLoading={onLikeLoading}
        likeHandler={likeHandler}
        isFavorited={isFavorited}
        favortiedCount={favortiedCount}
      />
    </div>
  );
};

export default ArticleItem;
