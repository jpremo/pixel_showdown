import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage"
import { authenticate } from "./services/auth";
import Sketch from './components/Sketch'
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async() => {
      const user = await dispatch(restoreUser())
      if(user.id) setAuthenticated(true);
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sketch" exact={true}>
          <Sketch/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </Route>
        <Route path="/" exact={true} authenticated={authenticated}>
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
