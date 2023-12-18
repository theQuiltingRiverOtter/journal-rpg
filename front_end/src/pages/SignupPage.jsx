import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { api } from "../utilities"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";
import "../index.css"


function SignupPage() {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const { user, setUser } = useOutletContext();
    const { signedIn, setSignedIn } = useOutletContext();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === passwordCheck) {
            const data = {
                display_name: displayName,
                email,
                age,
                password,
            }
            try {
                const response = await api.post("users/signup/", data)
                let user = response.data.user;
                let token = response.data.token;
                localStorage.setItem("token", token);
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                setUser(user);
                setSignedIn(true)
                navigate(-1)


            } catch (err) {
                console.log("something went wrong", err)
            }

        } else {
            alert("passwords don't match")
        }

    }

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" min={1} max={130} value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default SignupPage;