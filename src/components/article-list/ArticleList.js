import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getArticles } from '../../store/actions';
import Article from '../article/Article';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  if (articles.length === 0) {
    return (
      <section className="article-list">
        <Spin
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

  return (
    <section className="article-list">
      {articles.map((i) => (
        <Article
          key={i.slug}
          image={i.author.image}
          username={i.author.username}
          title={i.title}
          description={i.description}
          favoritesCount={i.favoritesCount}
          favorited={i.favorited}
          tagList={i.tagList}
          createdAt={i.createdAt}
        />
      ))}
      <Pagination
        defaultCurrent={1}
        total={Math.round(articlesCount / 20)}
        className="pagination"
        showSizeChanger={false}
        onChange={(e) => dispatch(getArticles(e))}
      />
    </section>
  );
};

export default ArticleList;
