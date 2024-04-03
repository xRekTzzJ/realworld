import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from '../../store/actions';
import Article from '../article';
import ArticleList from '../article-list/';
import Header from '../header';
import Profile from '../profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initialState = async () => {
    await dispatch(checkAuth(JSON.parse(localStorage.getItem('user'))));
    setLoading(false);
  };

  const auth = useSelector((state) => state.user.token);

  useEffect(() => {
    initialState();
  }, []);

  const PrivateRoute = () => {
    return <Redirect to="/articles/" />;
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
