const Article = () => {
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis corrupti, expedita sint repudiandae saepe
        aliquid reprehenderit! Eveniet dolor animi rerum est labore similique perferendis. Itaque voluptate laudantium
        tempore adipisci accusantium?
      </p>
    </section>
  );
};

export default Article;
