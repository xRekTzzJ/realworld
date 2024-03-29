import { Pagination } from 'antd';
import { Provider } from 'react-redux';

import store from '../../store';
import ArticleList from '../article-list/ArticleList';
import Header from '../header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <ArticleList />
      <Pagination defaultCurrent={1} total={50} className="pagination" />
    </Provider>
  );
};

export default App;
