import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import ShowFaq from './ShowUsers';
import DeleteUser from './DeleteUser';
import history from '../history';
import UpdateUser from './UpdateUser';

const App = () => {
    return (
        <Router history={history}>
            <div className="ui container">
                    <Header /> 
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/users" exact component={ShowFaq} />
                        <Route path="/users/edit/:id" exact component={UpdateUser} />
                        <Route path="/users/delete/:id" exact component={DeleteUser} />
                    </Switch> 
            </div>
        </Router>
    )
}

export default App;