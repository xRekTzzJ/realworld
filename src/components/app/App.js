import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { checkAuth } from '../../store/actions';
import Article from '../article';
import ArticleList from '../article-list/';
import Header from '../header';
import Profile from '../profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth(JSON.parse(localStorage.getItem('user'))));
  }, []);

  const auth = useSelector((state) => state.user.token);

  const PrivateRoute = () => {
    return <Redirect to="/articles/" />;
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/articles/" exact component={ArticleList} />
        <Route path="/articles/:slug" component={Article} />
        <Route path="/sign-up" component={auth ? PrivateRoute : SignUp} />
        <Route path="/sign-in" component={auth ? PrivateRoute : SignIn} />
        <Route path="/profile" component={!auth ? PrivateRoute : Profile} />
        <Redirect to="/articles/" />
      </Switch>
    </Router>
  );
};

export default App;
