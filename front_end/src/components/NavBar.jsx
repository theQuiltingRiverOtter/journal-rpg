import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { api } from "../utilities"
import Button from 'react-bootstrap/Button';


function NavBar({ user, signedIn, setUser, setSignedIn }) {



    const navigate = useNavigate()
    const logout = async (e) => {
        try {
            const response = await api.post("users/logout/");
            if (response.status === 204) {
                localStorage.removeItem("token");
                delete api.defaults.headers.common["Authorization"];
                setUser("")
                setSignedIn(false)
                navigate("/")

            }
        } catch (err) {
            console.log("something went wrong", err)
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-custom">
            <Container>
                <Navbar.Brand as={Link} to="/">QuillQuest</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="All Games" id="collapsible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="alone/">Alone Among the Stars</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="thyme/">One Day at a Thyme</NavDropdown.Item>
                        </NavDropdown>
                        {signedIn && <Nav.Link as={Link} to="mygames/">My Games</Nav.Link>}
                    </Nav>
                    {!signedIn ?
                        <Nav>
                            <Nav.Link as={Link} to="login/">Login</Nav.Link>
                            <Nav.Link as={Link} to="signup/">Sign Up</Nav.Link>
                        </Nav> :
                        <Nav>
                            <Nav.Link as={Link} to="aboutme/">{user}</Nav.Link>
                            <Nav.Link as={Button} onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;