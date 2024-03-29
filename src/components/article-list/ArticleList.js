import { useEffect, useState } from 'react';

import { getArticles } from '../../services/realworld-service';
import Article from '../article/Article';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const getData = async () => {
    const data = await getArticles();
    setArticles(data.articles);
  };

  useEffect(() => {
    getData();
  }, []);

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
