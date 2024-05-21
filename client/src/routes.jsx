import App from './App'
import Home from './Home';
import SignUp from './SignUp';
import ErrorPage from "./ErrroPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            }
        ]

    }
]

export default routes