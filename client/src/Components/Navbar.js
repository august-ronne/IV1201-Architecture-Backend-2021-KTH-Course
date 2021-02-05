import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
        AuthContext
    );

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.serverMessage.accepted) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/login">
                    <li>Login</li>
                </Link>
                <Link to="/register">
                    <li>Register</li>
                </Link>
            </>
        );
    };

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/usersonly">
                    <li>Secret page for logged in users!</li>
                </Link>
                <button
                    type="button"
                    onClick={onClickLogoutHandler}
                >
                    Logout
                </button>
            </>
        );
    };

    return (
        <nav>
            <div>
                <Link to="/">
                    <div>Home page</div>
                </Link>
                <div>
                    <ul>
                        {!isAuthenticated
                            ? unauthenticatedNavbar()
                            : authenticatedNavbar()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
