# Quote Pro Application

Welcome to the quote pro application where you have total control over your customer base and quote management specific to your business. Sign up to use this application and demo CRUD permissions by each role.  There are three roles to choose from, each of which authorize access and capabilities within each resource.  As an admininstrator you take total control over the application as you can create, update, read, or delete any resource within the database.  Or sign up to be a Manager to oversee users, quotes, customers, and configurations specific to your business.  Add new leads to the customers table, then initiate new quotes for those new (or returning) customers. Need a sales rep to soley focus on customer acquisition and generating new quotes? Add a new user to your team and provide them restricted access so they focus on lead generation and converting quotes.


## Key Features

- Resources include Account, User, Customer, Quotes, & Configurations

- As an Aministrator you have full CRUD permissions: Create, Read, Update, or Delete all resources within the application.

- As a Manager you have more limited CRUD permissions by resource: Create, Read, Update, or Delete any resource except for Account.

- As a Sales role your permissions are further restricted so you focus more on customer acquisition and quote management.

## Table Highlighting Permissions by Role

<table>
    <tr>
        <th>Permissions</th>
        <th>Admin</th>
        <th>Manager</th>
        <th>Sales</th>
    </tr>
    <tr>
        <td>Create Account</td>
        <td>X</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Read Account</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Update Account</td>
        <td>X</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Delete Account</td>
        <td>X</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Create User</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
    <tr>
        <td>Read User</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Update User</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
    <tr>
        <td>Delete User</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
    <tr>
        <td>Create Quote</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Read Quote</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Update Quote</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Delete Quote</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
    <tr>
        <td>Create Configuration</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Read Configuration</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Update Configuration</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Delete Configuration</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
    <tr>
        <td>Create Customer</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Read Customer</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Update Customer</td>
        <td>X</td>
        <td>X</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Delete Customer</td>
        <td>X</td>
        <td>X</td>
        <td></td>
    </tr>
</table>


# Installation Guide

## Prerequisites

- npm (Node package manager)
- Python
- pip and pipenv for managing Python packages

## Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone [p4-fullstack-project]
cd p4-fullstack-project
```
## Setting up the backend

Navigate to the backend directory and setup the python environment:
```bash
pipenv install
pipenv shell
cd server
```

Run the following command to setup the database and populate it with initial data:
```bash
python seed.py
```

Run the backend server using:
```bash
python app.py
```

## Setting up the frontend

Open a new terminal window and navigate to the frontend directory:
```bash
npm install
cd client
```

Start the frontend development server
```bash
npm run dev
```

## Accessing the Application

Once both servers are running, you can access the application by navigating to 'http://localhost:5173/' for the frontend and 'http://127.0.0.1:5555/' for the backend in your web browser.



# USAGE

seeding the app will create you as the primary admin where you will have full access.
Logout to test usecase as potential new user / account
new users can create accounts but will need admin approval before gaining additional features and access
- account id will be assigned, but no discount - pending admin approval
- initially have 'sales' access which includes:
Read Account,
Read User,
Create Quote,
Read Quote,
Update Quote (associated to their user account)

Admin - full access

Manager - same as admin access EXCEPT:
Cannot Create new account on behalf of new user
Cannot update account details without admin permissions
Cannot delete account

# Simple Flask Project Generator for Flatiron School

This script is for generating a barebone phase 4 project that's already configured for Flask with a React frontend.

### The project generator will:
* Create your pipenv virtual environment
* Create and configure a barebone flask application
* Install all needed packages for your flask application
* Initializes your sqlalchemy database, so no need to flask db init or create your base revision
* Create a React application with Vite
* Install all needed base packages (react router dom, formik, yup) for your react application
* Configure your React's proxy
* Create a README
* Make your initial commit for you
 
### The project generator will not:
* Connect your project to github, you will still need to create a new repository in github
* Fill out your README.md for you, you will still need to fill this out
* Add any additional packages you want to add for both React or Flask. You will do that as normal
* Automatically put you into your pipenv shell, you will need to run that command in order to be in your virtual environment

### How to use

* Create a directory for your project and cd into your project
* open up the terminal in your project directory (make sure your terminal shows the project directory)
* run in the terminal:
```
 curl -s https://raw.githubusercontent.com/Enoch2k2/flatiron-flask-project-generator/main/script.sh | bash
```
* Grab some popcorn

### Note while the project is being created

There may be points during project generation that you get prompted to input either a yes or no into the terminal. Or to install something (like vite). Follow the prompts closely (basically say yes to everything and it should be fine!). You will only need to do the prompts once.

### What now that it's done running?

You're Flask project is ready to go! Create models / routes / etc... You will not have to worry about initializing your database with flask db init, flask db revision -m 'initial db', flask db upgrade head. That is already done for you! You will however need to use `pipenv shell` in order to go into your virtual environment.

You also now have a client folder which is your React application. You can definitely use it if you want (if it this is your project, you will want to use this). This includes react-router-dom, formik, and yup automatic installations.

`npm run dev` To run the react server

### Note on the proxy in client/vite.config.js ###
You will need to add `/api` in front of all the `fetch` requests in order for the `proxy` to kick in, which is needed for authentication (cookies to be transmitted).

If your backend prefixes `/api` to all of your routes, for example: `http://localhost:5555/api/check_session` and you have `api.add_resource(CheckSession, "/api/check_session")`, you can remove the `rewrite` line which removes the `/api` from the route so you can use `/api` in your backend routes.

### If you run into issue with flask-bcrypt installing because of a rust issue

Run this command:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then delete everything in your folder and run `rm -rf .git`. Then redo the installation instructions!# phase4-fullstack-project
# Project Name Here
Fill out your project details here in your README.md
