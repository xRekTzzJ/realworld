import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Spin } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import avatar from '../../img/avatar.png';
import { deleteArticle } from '../../services/realworld-service';
import { favoriteArticle, getArticle, unfavoriteArticle } from '../../store/actions';
import Rate from '../rate';

import classes from './article.module.scss';

const Article = () => {
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { title, description, tagList, body, createdAt, author, favorited, favoritesCount } = useSelector(
    (state) => state.article
  );
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const token = useSelector((state) => state.user.token);
  const [onLikeLoading, setOnLikeLoading] = useState(false);
  const renderArticle = async () => {
    try {
      await dispatch(getArticle(slug, token));
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    renderArticle();
  }, []);

  if (loading) {
    return (
      <section className={classes['article']}>
        <Spin
          style={{
            display: 'block',
            margin: '0 auto',
          }}
          indicator={
            <LoadingOutlined
              style={{
                color: '#52c41a',
                fontSize: 48,
              }}
              spin
            />
          }
        />
      </section>
    );
  }

  const renderImage = () => {
    if (imageError) {
      return <img src={avatar} alt="Person avatar." />;
    }
    return <img src={author.image} alt="Person avatar." onError={() => setImageError(true)} />;
  };

  const likeHandler = async () => {
    setOnLikeLoading(true);
    try {
      if (favorited) {
        await dispatch(unfavoriteArticle(slug, token));
      } else {
        await dispatch(favoriteArticle(slug, token));
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setOnLikeLoading(false);
    }
  };

  if (error) {
    return (
      <section className={classes['article']}>
        <div className={classes['article__header']}>
          <h2 className={classes['article__title']}>data error</h2>
          <div className={classes['article__person-info']}>
            <span></span>
            <span></span>
            <span>username</span>
            <img src={avatar} alt="Person avatar." />
          </div>
        </div>
        <p className={classes['article__description']}>Please try again later.</p>
        <div className={classes['article__markdown']}></div>
      </section>
    );
  }

  const confirm = async () => {
    try {
      await deleteArticle(slug, token);
      history.push('/');
      toast.success('You have successfully delete an article!');
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className={classes['article']}>
      {userName === author.username && (
        <div className={classes['article__author-buttons']}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this article?"
            okText="Yes"
            onConfirm={confirm}
            cancelText="No"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
          >
            <button
              style={{
                color: '#F5222D',
              }}
            >
              Delete
            </button>
          </Popconfirm>
          <button
            style={{
              color: '#52C41A',
            }}
            onClick={() => {
              history.push({
                pathname: 'edit',
                state: { slug },
              });
            }}
          >
            Edit
          </button>
        </div>
      )}
      <div className={classes['article__header']}>
        <h2 className={classes['article__title']}>{title}</h2>
        <ul className={classes['article__tag-container']}>
          {tagList.map((i, index) => {
            if (index < 10 && i !== null && i.length) {
              return <li key={index}>{i}</li>;
            }
          })}
        </ul>
        <div className={classes['article__person-info']}>
          <span>{author.username}</span>
          <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          {renderImage()}
        </div>
      </div>
      <div className={classes['article__description-container']}>
        <p className={classes['article__description']}>{description}</p>
        <Rate
          auth={token}
          onLikeLoading={onLikeLoading}
          likeHandler={likeHandler}
          isFavorited={favorited}
          favortiedCount={favoritesCount}
        />
      </div>

      <div className={classes['article__markdown']}>
        <Markdown>{body}</Markdown>
      </div>
    </section>
  );
};

export default Article;
