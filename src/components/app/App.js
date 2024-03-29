import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import store from '../../store';
import ArticleList from '../article-list/';
import Header from '../header';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/articles/:id?" component={ArticleList} />
          <Redirect to="/articles/" />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
