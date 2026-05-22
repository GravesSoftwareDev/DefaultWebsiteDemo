import { Link } from "react-router"

export default function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <p>This is where users can log in to their accounts.</p>
            <Link to="/Portal/dashboard">Go to Dashboard</Link>
        </div>
    )
}