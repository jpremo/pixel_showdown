import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage"
import Sketch from './components/Sketch'
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";
import RulesetForm from "./components/forms/RulesetForm";
import CompetitionPage from './components/CompetitionPage'
import Entry from './components/Entry'
import Profile from './components/Profile'
import SplashPage from "./components/SplashPage";
import Footer from './components/Footer/Footer'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  //Sets user session information on page load
  useEffect(() => {
    (async () => {
      const user = await dispatch(restoreUser())
      if (user.id) setAuthenticated(true);
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
      <div className='page-wrapper'>
        <Switch>
          <Route path="/" exact={true} authenticated={authenticated}>
            <SplashPage setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/" exact={false}>

            <NavBar setAuthenticated={setAuthenticated} />
          </Route>
        </Switch>
        <Switch>

          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path={"/sketch"} exact={true}>
            <Sketch />
          </Route>
          <Route path={"/sketch/:id"} exact={true}>
            <Sketch />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/users/:userId" exact={true} authenticated={authenticated}>
            <Profile />
          </Route>
          <Route path="/competitions/:postId" exact={true} authenticated={authenticated}>
            <CompetitionPage />
          </Route>
          <Route path="/competitions/:postId/entry/:id" exact={true}>
            <Entry />
          </Route>
          <Route path="/rulesets/create" exact={true} authenticated={authenticated}>
            <RulesetForm />
          </Route>
          <Route path="/home" exact={true} authenticated={authenticated}>
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
