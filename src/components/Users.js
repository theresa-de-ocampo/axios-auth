import React from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Users() {
    const [users, setUsers] = React.useState();
    const refresh = useRefreshToken();

    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        // We want to be able to cancel any pending request that is still out there,
        // if the component unmounts.
        async function getUsers() {
            try {
                const response = await axios.get("/users", {signal: controller.signal});
                console.log(response.data);
                isMounted && setUsers(response.data);
            }
            catch (error) {
                console.error(error);
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
                        {users.map(user => <li key={user.id}>user.username</li>)}
                    </ul>
                ) :
                <p>No users to display.</p>
            }
            <button onClick={() => refresh()}>Refresh</button>
            <br />
        </article>
    )
}
