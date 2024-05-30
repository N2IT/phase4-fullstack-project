import App from './App'
import Home from './Home';
import SignUp from './SignUp';
import ErrorPage from './ErrorPage';
import Accounts from './Accounts';
import Users from './Users';
import Quotes from './Quotes';
import NewQuote from './NewQuote';
import Support from './Support';
import AccountById from './AccountById';
import UserById from './UserById';
import Unathorized from './Unathorized';

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
            },
            {
                path: 'accounts',
                element: <Accounts />
            },
            {
                path: 'accounts/:id',
                element: <AccountById />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'users/:id',
                element: <UserById />
            },
            {
                path: 'quotes',
                element: <Quotes />
            },
            {
                path: 'new-quote',
                element: <NewQuote />
            },
            {
                path: 'support',
                element: <Support />
            }
        ]

    }
]

export default routes