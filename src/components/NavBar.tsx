import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

type NavBarProps = {
    isLoggedIn: boolean,
    onLogout: () => void
}

export default function NavBar({ isLoggedIn, onLogout }: NavBarProps) {
    return (
        <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Quiz Up API</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id="nav-collapse">
                    <Nav className='me-auto'>
                        { isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to='/' onClick={onLogout}>Log Out</Nav.Link>
                                <Nav.Link as={Link} to='/quiz'>Quiz</Nav.Link>
                                <Nav.Link as={Link} to='/userquestions'>My Questions</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}