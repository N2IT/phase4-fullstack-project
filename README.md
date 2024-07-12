# Quote Pro Application

Welcome to the quote pro application. Sign up to use this application to demo CRUD permissions by role.  There are three roles to choose from, each of which authorize access to certain resources.  As an admin you have total access to create, read, update, and delete any resource.  Sign up to be a Manager to oversee users, quotes, customers, and configurations specific to your account. Add users to your team to focus on reaching out and managing customers and generating new quotes.  Or join as a User to focus on managing customers, quotes, and configurations for you account.

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
</table>



## Getting Started

To begin using the FITNESS CLI, simply clone this repository to your local machine. Follow the setup instructions detailed below to install any necessary dependencies and start tailoring your fitness routine today!

## Installation

```bash
# Clone the repository
git clone [p3-cli-project]

# Navigate to the program directory
cd p3-cli-project

# Install dependencies
Ensure you have Python installed on your system. This application is developed with Python 3. Ensure your Python version is compatible by checking with python --version or python3 --version.

# Seed the database (optional)
python lib/seed_data.py

# Run the application
python lib/cli.py
```
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
