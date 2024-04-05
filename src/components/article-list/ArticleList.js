import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getArticles } from '../../store/actions';
import ArticleItem from '../article-item';

import classes from './article-list.module.scss';

import '../../styles/ant-pagination-item-active.scss';

const ArticleList = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { articles, articlesCount } = useSelector((state) => state.articles);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = useSelector((state) => state.user.token);

  const id = params.get('page');

  const renderArticles = async () => {
    try {
      setLoading(true);
      await dispatch(getArticles(id, token));
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    renderArticles();
  }, [id]);

  if (loading) {
    return (
      <section className={classes['article-list']}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                color: '#52c41a',
                fontSize: 64,
              }}
              spin
            />
          }
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes['article-list']}>
        <Alert
          style={{
            width: 900,
          }}
          message="The service is temporarily unavailable."
          description="Please try again later."
          type="error"
          showIcon
        />
      </section>
    );
  }

  return (
    <>
      <section className={classes['article-list']}>
        {articles.map((i) => (
          <ArticleItem
            key={i.slug}
            image={i.author.image}
            username={i.author.username}
            title={i.title}
            description={i.description}
            favoritesCount={i.favoritesCount}
            favorited={i.favorited}
            tagList={i.tagList}
            createdAt={i.createdAt}
            slug={i.slug}
          />
        ))}
      </section>
      <Pagination
        current={id}
        total={Math.floor(articlesCount / 20) * 10}
        className={classes['pagination']}
        showSizeChanger={false}
        onChange={(e) => {
          history.push(`?page=${e}`);
        }}
      />
    </>
  );
};

export default ArticleList;
