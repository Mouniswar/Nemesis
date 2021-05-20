import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import ShowFaq from './ShowFaq';
import CreateFaq from './CreateFaq';
import DeleteFaq from './DeleteFaq';

const App = () => {
    return (
        <div className="ui container">
            <div>
                <BrowserRouter>
                    <Header /> 
                    <Route path="/" exact component={Login} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/faqs" exact component={ShowFaq} />
                    <Route path="/faqs/create" exact component={CreateFaq} />
                    <Route path="/faqs/delete/:id" exact component={DeleteFaq} />
                </BrowserRouter> 
            </div>
        </div>
    )
}

export default App;