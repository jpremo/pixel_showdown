import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {!user.id &&
          <>
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
          </NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
          </NavLink>
            </li>
          </>}

        {user.id &&
          <>
            <li>
              <NavLink to="/users" exact={true} activeClassName="active">
                Profile
          </NavLink>
            </li>
            <li>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
          </>
        }
        <li>
          <NavLink to="/sketch" exact={true} activeClassName="active">
            Sketch
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
