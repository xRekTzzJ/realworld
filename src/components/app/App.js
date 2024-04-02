import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import store from '../../store';
import Article from '../article';
import ArticleList from '../article-list/';
import Header from '../header';
import SignUp from '../sign-up';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/articles/" exact component={ArticleList} />
          <Route path="/articles/:slug" component={Article} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" />
          <Redirect to="/articles/" />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
