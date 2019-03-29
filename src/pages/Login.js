import React, { Component } from 'react';
import $ from 'jquery';
import '../styles/Login.css';

import Banner from '../components/Banner';
import Popup, { showSuccess, showError } from '../components/Popup';

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 100);
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signinsuccess: false,
            username: null, 
            password: null,
            formErrors: {
                userName: "",
                password: ""
            }
        }
    }

    componentDidMount() {
        scrollToTop(); 
        // this.setState({signinsuccess: this.props.location.state.success})
        if(this.props.location.state.success) {
            showSuccess();
        }           
    }


    formValid = ({formErrors, ...rest}) => {
        let valid = true;
        Object.values(formErrors).forEach(val => {
            if(val.length > 0) {
                valid = false;
            }
        });
        Object.values(rest).forEach(val => {
            if(val === null) { 
                valid = false;
            }
        })
        return valid;
    }

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch(name) {
            case 'username':
                formErrors.userName = value.length < 3 ? 'minimum 3 characters' : '';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 characters': '';
                break;
            default: 
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state));
        
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        if(this.formValid(this.state)) {
            const user = { 
                username: this.state.userName,
                password: this.state.password
            }
            // ajax get check if user exits. 
            $.get("api/users", (data) => {
                $.each(data, (key, value) => {
                    if(value.username === this.state.username && value.password === this.state.password) {
                        this.props.history.push({
                            pathname: '/account/announcements', 
                            state: {activeuser: value}
                        })
                    } else {
                        showError();
                    }
                });
            });
        } else {
            showError();
        }
    }

    toSignup = () => {
        this.props.history.push({
            pathname: '/signup'
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Banner history={this.props.history}/>
                <div className="signup-popup-container">
                    <Popup id="success" msg="Sign up successful!"></Popup>
                    <Popup id="error" msg="User does not exist"></Popup>
                </div>

                <div className="login-container"> 
                    <div className="login-form-container">
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label className="login-label" htmlFor="username">Username</label>
                            <input 
                                className="fullwidth-input" 
                                type="text" 
                                id="username"
                                placeholder="johndoe"
                                name="username"
                                onChange={this.handleChange}/> 
                            {this.state.formErrors.userName.length > 0 && (
                                <span className="error-msg">{this.state.formErrors.userName}</span>
                            )}
                            <label className="login-label" htmlFor="password">Password</label>
                            <input 
                                className="fullwidth-input" 
                                type="text" 
                                id="password"
                                placeholder="johndoe123"
                                name="password"
                                onChange={this.handleChange}/>
                            {this.state.formErrors.password.length > 0 && (
                                <span className="error-msg">{this.state.formErrors.password}</span>
                            )}

                            <input id="submit-btn" type="submit" value="LOGIN" />
                            <input id="submit-btn" type="button" value="SIGN UP" onClick={this.toSignup} style={{'marginTop': '10px'}} />

                        </form> 
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}
 
export default Login;