import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getArticles } from '../../store/actions';
import Article from '../article/Article';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  if (articles.length === 0) {
    return <section className="article-list">loading</section>;
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
    </section>
  );
};

export default ArticleList;
