import React from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const LOGIN_URL = "/auth/local";
    const userRef = React.useRef();
    const errorRef = React.useRef();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        userRef.current.focus();
    }, []);

    React.useEffect(() => {
        setErrorMessage("");
    }, [username, password]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                {
                    identifier: username,
                    password: password
                }
            );
            console.log(JSON.stringify(response));
            const jwt = response.data.jwt
            setAuth({username, password, jwt});
            setUsername("");
            setPassword("");
            console.log(from);
            navigate(from, {replace: true});
        }
        catch (error) {
            console.log("im at catch");
            if (!error?.response)
                setErrorMessage("No Server Response");
            else if (error.response?.status === 400)
                setErrorMessage("Missing Username or Password");
            else if (error.response?.status === 401)
                setErrorMessage("Unauthorized");
            else
                setErrorMessage("Login Failed");
            errorRef.current.focus();
        }
    }

    return (
        <section>
            <p
                ref={errorRef}
                className={errorMessage ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errorMessage}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username" type="text" ref={userRef} autoComplete="off" required
                    onChange={e => setUsername(e.target.value)} value={username}
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password" type="password" required
                    onChange={e => setPassword(e.target.value)} value={password}
                />
                <button>Sign In</button><br />
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <a href="/register">Sign Up</a>
                    </span>
                </p>
            </form>
        </section>
    )
}