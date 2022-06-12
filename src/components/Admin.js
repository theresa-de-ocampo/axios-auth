import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <section>
            <h1>Admin Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}
