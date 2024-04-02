import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { checkAuth } from '../../store/actions';
import Article from '../article';
import ArticleList from '../article-list/';
import Header from '../header';
import SignUp from '../sign-up';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth(JSON.parse(localStorage.getItem('user'))));
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/articles/" exact component={ArticleList} />
        <Route path="/articles/:slug" component={Article} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" />
        <Redirect to="/articles/" />
      </Switch>
    </Router>
  );
};

export default App;
