import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { setAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();

    function logOut() {
        setAuth({});
        navigate("/linkpage");
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logOut}>Sign Out</button>
            </div>
        </section>
    )
}