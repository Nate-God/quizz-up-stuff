import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Quiz from './views/Quiz';
import { UserType } from './types';
import UserQuestions from './views/UserQuestion';
import EditQuestions from './views/EditQuestions';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);


    const logUserIn = (user: UserType) => {
        setIsLoggedIn(true);
        setLoggedInUser(user)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        alert("You have logged out");
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogout={logUserOut} />
            <Container>
                <Routes>
                    <Route path='/' element={<Home isAuthenticated={isLoggedIn} currentUser={loggedInUser} />} />
                    <Route path='/login' element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} />} />
                    <Route path='/signup' element={<SignUp/>} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='/userquestions' element={<UserQuestions currentUser={loggedInUser} />} />
                    <Route path='/editquestions/:questionId' element={<EditQuestions currentUser={loggedInUser} />} />
                </Routes>

            </Container>
        </div>
    )
}