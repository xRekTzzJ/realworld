import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import avatar from '../../img/avatar.png';
import classes from '../../index.module.scss';
import { getArticle } from '../../store/actions';

const Article = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { title, description, tagList, body, createdAt, author } = useSelector((state) => state.article);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const renderArticle = async () => {
    await dispatch(getArticle(slug));
    setLoading(false);
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

  return (
    <section className={classes['article']}>
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
      <p className={classes['article__description']}>{description}</p>
      <div className={classes['article__markdown']}>
        <Markdown>{body}</Markdown>
      </div>
    </section>
  );
};

export default Article;
