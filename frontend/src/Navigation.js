import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
            
        </>
    )
    // log out function
 function logout() {
    localStorage.clear();
    window.location.href ="/";

 }
    if (currentUser) {
        loginActions = (
            // adding onclick action to the logout function
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName} <a href = '#' onClick={() => logout()}>Log Out</a>
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/places")}>
                        Places
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/places/new")}>
                        Add Place
                    </a>
                </li>
                {/* <li style={{ float: 'right' }}>
                <button href="#" onClick={() => history.push("/")}>
                    Log Out
                </button>
            </li> */}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;