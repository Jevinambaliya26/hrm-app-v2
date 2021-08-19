import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// We will create these two pages in a moment
// Authentication
import LoginPage from './loginpage'
import RegistrationPage from './RegistrationPage'
import ForgotPassword from './forgotpassword'
import OTP from './otp'
import LockScreen from './lockscreen'

import ApplyJobs from './ApplyJob';

//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import Tasklayout from './Sidebar/tasklayout';
import Emaillayout from './Sidebar/emaillayout';
import chatlayout from './Sidebar/chatlayout';
import data from '../libs/dummyEmployee';

import uicomponents from '../MainPage/UIinterface/components';

//Error Page
import Error404 from '../MainPage/Pages/ErrorPage/error404';
import Error500 from '../MainPage/Pages/ErrorPage/error500';


// import 'Assets/css/font-awesome.min.css';

import $ from 'jquery';
import useUser from '../Data/use-user';
import { getAllEmployees } from '../libs/api-user';
import useSWR from 'swr';
import axios from 'axios';
window.jQuery = $;
window.$ = $;

// import UserPage from './pages/UserPage'
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />}
    />;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = { user: '', mutate: '', loggedOut: '' };
    }

    componentDidMount() {

        if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword")
            || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
            $('body').addClass('account-page');
        } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
            $('body').addClass('error-page');
        }
    }

    render() {
        let { location, match } = this.props;
        // user = localStorage.getItem("email");
        var user;
        if (localStorage.getItem("email"))
            user = data.find(d => d.email === localStorage.getItem("email"));

        // axios.post("http://localhost:3000/employee/auth_permission/v1", {
        //     email: "vijay.a@gmail.com",
        //     password: "123456"
        // }, {
        //     headers: {
        //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpamF5LmFAZ21haWwuY29tIiwiaWF0IjoxNjI5MDk2MDYzLCJleHAiOjE2MjkxODI0NjMsInN1YiI6IjEifQ.uf_4QVhwZvC3cgDGD4sGy_laaPVtUoRauWD9ZaU8sS0`
        //     }
        // }).then(res => {
        //     console.log(res.data.data);
        // }).catch(err => console.log(err));

        if (location.pathname === '/') {
            if (user !== null) {
                return (<Redirect to={'/app/main/dashboard'} />);
            } else {
                return (<Redirect to={'/login'} />);
            }
        }
        if (location.pathname === '/') {
            return (<Redirect to={'/app/main/dashboard'} />);
        }

        return (
            <Switch>
                <InitialPath
                    component={DefaultLayout}
                    authUser={user}
                    path={`${match.url}app`}
                />
                <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/otp" component={OTP} />
                <Route path="/lockscreen" component={LockScreen} />
                <Route path="/applyjob" component={ApplyJobs} />

                <Route path="/app" component={DefaultLayout} />
                <Route path="/settings" component={Settinglayout} />
                <Route path="/tasks" component={Tasklayout} />
                <Route path="/email" component={Emaillayout} />
                <Route path="/conversation" component={chatlayout} />

                <Route path="/ui-components" component={uicomponents} />
                <Route path="/error-404" component={Error404} />
                <Route path="/error-500" component={Error500} />
            </Switch>
        );
    }
}
