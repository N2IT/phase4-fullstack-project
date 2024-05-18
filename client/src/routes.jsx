import App from './App'
import Home from './Home';
import CreateNewAccount from "./CreateNewAccount";
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
                path: 'create-account',
                element: <CreateNewAccount />
            }
        ]

    }
]

export default routes