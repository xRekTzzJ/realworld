import { Provider } from 'react-redux';

import store from '../../store';
import ArticleList from '../article-list/ArticleList';
import Header from '../header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <ArticleList />
    </Provider>
  );
};

export default App;
