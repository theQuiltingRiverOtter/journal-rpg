import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { api } from "../utilities"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, setUser } = useOutletContext();
    const { signedIn, setSignedIn } = useOutletContext();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data =
        {
            email,
            password
        }
        try {
            const response = await api.post("users/login/", data)
            let token = response.data.token;
            let user = response.data.user;
            localStorage.setItem("token", token)
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            setUser(user);
            setSignedIn(true)
            navigate("/")

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginPage;