import { Link } from "react-router-dom"

export default function Missing() {
    return (
        <article style={{padding: "100px"}}>
            <h1>Oops!</h1>
            <p>Page Not Found!</p>
            <div className="flexGrow">
                <Link to="/">Visit our Homepage</Link>
            </div>
        </article>
    )
}
