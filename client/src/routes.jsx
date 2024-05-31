import App from './App'
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import ErrorPage from './components/ErrorPage';
import Accounts from './routes/Accounts';
import Users from './routes/Users';
import Quotes from './routes/Quotes';
import NewQuote from './routes/NewQuote';
import Support from './routes/Support';
import AccountById from './routes/AccountById';
import UserById from './routes/UserById';

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