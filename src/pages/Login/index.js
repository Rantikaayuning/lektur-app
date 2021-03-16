import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { NotificationContainer } from "react-notifications";
import { postLogin, getUserProfile } from "../../redux/actions/UserAction";

function Login() {
  const { email, password, isUserLoading } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("token")) {
      history.push("/");
    }
  }, [history]);

  const [userLogin, setUserLogin] = useState({
    email: email,
    password: password,
  });

  const handleLogin = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const body = {
      email: userLogin.email,
      password: userLogin.password,
    };
    dispatch(postLogin(body))
      .then((token) => dispatch(getUserProfile(token)))
      .then(() => window.location.reload());
  };

  return (
    <>
      {isUserLoading ? (
        <div id="loader"></div>
      ) : (
        <Jumbotron className="jumbotron">
          <div className="login-page">
            <div className="login-form">
              <div className="login-header">
                <div className="login-welcome">Welcome Back!</div>
                <div className="login-yourAccount">Login to your account</div>
              </div>
              <br />
              <br />
              <form onSubmit={submitLogin}>
                <p className="email">
                  Email<span>*</span>
                </p>
                <div className="email-password-field">
                  <input
                    type="email"
                    placeholder="john@doe.com"
                    name="email"
                    className="login-email"
                    onChange={(e) => handleLogin(e)}
                  />
                </div>
                <br />
                <p className="password">
                  Password<span>*</span>
                </p>
                <div className="email-password-field">
                  <input
                    type="password"
                    placeholder="********"
                    name="password"
                    className="login-password"
                    onChange={(e) => handleLogin(e)}
                  />
                </div>
                <div className="forget-pass">Forgot Password</div>
                <div className="btn-login">
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </div>
                <div className="register-redirect">
                  New user?{" "}
                  <Link to="/register">
                    <span>Create an account</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Jumbotron>
      )}
      <NotificationContainer />
    </>
  );
}

export default Login;
