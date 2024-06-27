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
import QuoteById from './routes/QuoteById';
import Configurations from './routes/Configurations';
import ConfigurationById from './routes/ConfigurationById';
import Customers from './routes/Customers';
import CustomerById from './routes/CustomerById';
import CreateNewUserForm from './components/CreateNewUserForm';
import CreateNewCustomerForm from './components/CreateNewCustomerForm';
import CreateNewAccount from './components/CreateNewAccount';
import CreateNewConfiguration from './components/CreateNewConfiguration';

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
                path: 'quotes/:id',
                element: <QuoteById />
            },
            {
                path: 'customers',
                element: <Customers />
            },
            {
                path: 'customers/:id',
                element: <CustomerById />
            },
            {
                path: 'configurations',
                element: <Configurations />
            },
            {
                path:'configurations/:id',
                element: <ConfigurationById />
            },
            {
                path: 'add-user',
                element: <CreateNewUserForm />
            },
            {
                path: 'create-new-account',
                element: <CreateNewAccount />
            },
            {
                path: 'add-customer',
                element: <CreateNewCustomerForm />
            },
            {
                path: 'customers/:id/new-quote',
                element: <CreateNewConfiguration />
            },
            {
                path: 'support',
                element: <Support />
            }
        ]

    }
]

export default routes