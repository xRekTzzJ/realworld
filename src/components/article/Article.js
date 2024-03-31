import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { slug } = useParams();
  console.log(slug);
  const markdown = `# Проект: movie-app Одностраничный сайт, выполненный в рамках проектной работы на сервисе онлайн-обучения: 'Kata Academy'. 
## Технологии, которые использовались: 
1. HTML. 
2. CSS. 
3. JS. 
4. React 
5. Redux 

[Ссылка на vercel](https://aviasales-three-liart.vercel.app/)`;

  return (
    <section className="article">
      <div className="article__header">
        <h2 className="article__title">Some article title</h2>
        <ul className="article__tag-container">
          <li>Tag1</li>
        </ul>
        <div className="article__person-info">
          <span>username</span>
          <span>date</span>
          <img alt="Person avatar." />
        </div>
      </div>
      <p className="article__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis corrupti, expedita sint repudiandae saepe
        aliquid reprehenderit! Eveniet dolor animi rerum est labore similique perferendis. Itaque voluptate laudantium
        tempore adipisci accusantium?
      </p>
      <div className="article__markdown">
        <Markdown>{markdown}</Markdown>
      </div>
    </section>
  );
};

export default Article;
