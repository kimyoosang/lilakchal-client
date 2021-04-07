import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import Mypage from './pages/Mypage';
import Header from './components/Navigation/Header';
import { RouterProps, withRouter } from 'react-router';


const Main:React.FC<RouterProps> = ({ history }) => {

  return (
    <Router history={history}>
      <Header/>
      <Switch>
        <Route path='/main/register'>
          <RegisterPage/>
        </Route>
        <Route path='/mypage'>
          <Mypage/>
        </Route>
        <Route path='/main/search'>
          <SearchPage/>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(Main);