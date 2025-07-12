import { Home } from '../pages/Home';
import { CreateArticle } from '../pages/CreateArticle';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Navigate } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';

export const routes = (isAuth, user, handleLogout, handleLogin) => [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/create-article',
        element: isAuth ? <CreateArticle /> : <Navigate to="/login" />,
    },
    {
        path: '/profile',
        element: isAuth ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />,
    },
    {
        path: '/login',
        element: isAuth ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />,
    },
    {
        path: '*',
        element: <ErrorPage />, // Теперь ErrorPage определён
    },
];