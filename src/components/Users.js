import React from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = React.useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        // We want to be able to cancel any pending request that is still out there,
        // if the component unmounts.
        async function getUsers() {
            try {
                const response = await axiosPrivate.get("/users", {signal: controller.signal});
                isMounted && setUsers(response.data);
            }
            catch (error) {
                console.error(error);
                navigate("/login", { state: { from: location }, replace: true})
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h2>User's List</h2>
            {
                users?.length ?
                (
                    <ul>
                        {users.map(user => <li key={user.id}>{user.username}</li>)}
                    </ul>
                ) :
                <p>No users to display.</p>
            }
        </article>
    )
}
