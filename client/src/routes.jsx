import App from './App'
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import ErrorPage from './components/ErrorPage';
import Accounts from './routes/Accounts';
import Users from './routes/Users';
import Quotes from './routes/Quotes';
import AccountIdQuotes from './routes/AccountIdQuotes';
import NewQuote from './routes/NewQuote';
import Support from './routes/Support';
import AccountById2 from './routes/AccountById2';
import UserById from './routes/UserById';
import QuoteById from './routes/QuoteById';
import Configurations from './routes/Configurations';
import ConfigurationById from './routes/ConfigurationById';
import Customers from './routes/Customers';
import CustomerById from './routes/CustomerById';
import AddUsersToAccount from './routes/AddUsersToAccount';
import AccountIdAddCustomer from './routes/AccountIdAddCustomer';
import CreateNewAccountFormAdmin from './components/forms/CreateNewAccountFormAdmin';
import CustomersIdNewQuote from './routes/CustomersIdNewQuote';
import CustomersByAccountId from './routes/CustomersByAccountId';
import QuotePreviewById from './routes/QuotePreviewById';

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
                path: 'accounts',
                element: <Accounts />
            },
            {
                path: 'accounts/:id',
                element: <AccountById2 />
            },
            {
                path: 'accounts/:id/add-customer',
                element: <AccountIdAddCustomer />
            },
            {
                path: 'accounts/:id/add-user',
                element: <AddUsersToAccount />
            },
            {
                path: 'accounts/:id/customers',
                element: <CustomersByAccountId />
            },
            {
                path: 'accounts/:id/new-quote',
                element: <NewQuote />
            },
            {
                path: 'accounts/:id/quotes',
                element: <AccountIdQuotes />
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
                path: 'customers',
                element: <Customers />
            },
            {
                path: 'customers/:id',
                element: <CustomerById />
            },
            {
                path: 'customers/:id/new-quote',
                element: <CustomersIdNewQuote />
            },
            {
                path: 'create-new-account',
                element: <CreateNewAccountFormAdmin />
            },
            {
                path: 'quotes',
                element: <Quotes />
            },
            {
                path: 'quotes/:id',
                element: <QuoteById />
            },
            {
                path: 'quotes/:id/preview',
                element: <QuotePreviewById />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },            
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'users/:id',
                element: <UserById />
            },
            
        ]

    }
]

export default routes