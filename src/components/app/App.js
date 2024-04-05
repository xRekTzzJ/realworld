import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from '../../store/actions';
import Article from '../article';
import ArticleForm from '../article-form/';
import ArticleList from '../article-list/';
import Header from '../header';
import Profile from '../profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.user.token);

  const initialState = async () => {
    try {
      await dispatch(checkAuth(JSON.parse(localStorage.getItem('user'))));
      setLoading(false);
    } catch {
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  useEffect(() => {
    initialState();
  }, []);

  const PrivateRoute = () => {
    return <Redirect to="/articles/" />;
  };
  const RouteToSignIn = () => {
    return <Redirect to="/sign-in" />;
  };

  if (loading) {
    return (
      <Router>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                width: '100%',
                color: '#52c41a',
                fontSize: 64,
              }}
              spin
            />
          }
        />
      </Router>
    );
  }

  return (
    <Router>
      <Header />
      <ToastContainer pauseOnHover={false} position="top-right" autoClose={3000} pauseOnFocusLoss={false} />
      <Switch>
        <Route path="/articles/" exact component={ArticleList} />
        <Route path="/articles/:slug/" exact component={Article} />
        <Route path="/sign-up" component={auth ? PrivateRoute : SignUp} />
        <Route path="/sign-in" component={auth ? PrivateRoute : SignIn} />
        <Route path="/profile" component={!auth ? PrivateRoute : Profile} />
        <Route path="/new-article" component={!auth ? RouteToSignIn : ArticleForm} />
        <Route path="/articles/:slug/edit" component={!auth ? PrivateRoute : ArticleForm} />
        <Redirect to="/articles/" />
      </Switch>
    </Router>
  );
};

export default App;
