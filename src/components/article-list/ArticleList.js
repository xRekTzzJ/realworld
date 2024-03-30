import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import { getArticles } from '../../store/actions';
import ArticleItem from '../article-item';

const ArticleList = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { articles, articlesCount } = useSelector((state) => state.articles);

  const { id } = useParams();

  const renderArticles = async () => {
    setLoading(true);
    await dispatch(getArticles(id));
    setLoading(false);
  };

  useEffect(() => {
    if (!id) {
      history.push(`${1}`);
    }
    renderArticles();
  }, [id]);

  if (!articles.length || loading) {
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
          />
        ))}
      </section>
      <Pagination
        current={id}
        total={Math.floor(articlesCount / 20) * 10}
        className="pagination"
        showSizeChanger={false}
        onChange={(e) => {
          history.push(`${e}`);
        }}
      />
    </>
  );
};

export default withRouter(ArticleList);
