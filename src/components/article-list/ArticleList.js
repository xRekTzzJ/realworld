import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getArticles } from '../../store/actions';
import Article from '../article/Article';

const ArticleList = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const currentPage = useSelector((state) => state.articles.page);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  if (articles.length === 0 || loading) {
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
    <>
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
      </section>
      <Pagination
        current={currentPage}
        total={Math.floor(articlesCount / 20) * 10}
        className="pagination"
        showSizeChanger={false}
        onChange={async (e) => {
          setLoading(true);
          await dispatch(getArticles(e));
          setLoading(false);
        }}
      />
    </>
  );
};

export default ArticleList;
