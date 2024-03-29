import { Pagination } from 'antd';

import ArticleList from '../article-list/ArticleList';
import Header from '../header';

const App = () => {
  return (
    <>
      <Header />
      <ArticleList />
      <Pagination defaultCurrent={1} total={50} className="pagination" />
    </>
  );
};

export default App;
