# Quote Pro Application

Unlock the full potential of your sales and management efforts with the Quote Pro application. Designed to help streamline your customer and quote management processes, my application empowers your team with targeted functionalities designed for each role. Sign up today to take command of your business operations!

## Roles and Permissions:
<ul>
    <li>Administrator: Gain comprehensive control with the ability to create, update, read, and delete any resource in the database.</li>
    <li>Manager: Oversee users, quotes, customers, and configurations. Add new leads, manage customer information, and initiate quotes, enhancing oversight and efficiency.</li>
    <li>Sales: Concentrate on lead generation and quote management. Perfect for roles focused on expanding customer reach and securing new business.</li>
</ul>

Start with Quote Pro now and explore how our tailored roles can enhance your business's efficiency and productivity. Each role is designed to fit seamlessly into your workflow, ensuring you and your team can achieve more, faster.</li>


## Key Features

- Resources include Account, User, Customer, Quotes, & Configurations

- As an Aministrator you have full CRUD permissions: Create, Read, Update, or Delete all resources within the application.

- As a Manager you have more limited CRUD permissions by resource: Create, Read, Update, or Delete any resource except for Account.

- As a Sales role your permissions are further restricted so you focus more on customer acquisition and quote management.

## Permissions by Role

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

### BackendDependencies
The backend uses Flask along with several extensions, which are automatically installed via Pipenv:

- **Flask**: A lightweight WSGI web application framework.
- **Flask-SQLAlchemy**: Adds SQLAlchemy support to your Flask application.
- **SQLAlchemy-Serializer**: Provides serialization and deserialization of SQLAlchemy models.
- **Flask-CORS**: Handles Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- **Flask-RESTful**: Simplifies the creation of REST APIs with Flask.
- **Flask-Migrate**: Handles SQLAlchemy database migrations for Flask applications using Alembic.
- **Flask-Bcrypt**: Provides bcrypt hashing utilities for your application.
- **python-dotenv**: Reads key-value pairs from a .env file and sets them as environment variables.


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

### Frontend Dependencies

After running `npm install`, the following main dependencies will be installed:
- **React** (`react`, `react-dom`): A JavaScript library for building user interfaces.
- **React Router** (`react-router-dom`): Declarative routing for React apps.
- **Formik** and **Yup**: Handling forms and validation.

Development dependencies include:
- **Vite**: Next generation frontend tooling.
- **ESLint**: For linting and maintaining code quality.
- **@vitejs/plugin-react**: Enables React fast refresh and other optimizations in Vite.

These dependencies are critical for the development and functioning of the frontend application. They are automatically managed through `npm`.


## Accessing the Application

Once both servers are running, you can access the application by navigating to 'http://localhost:5173/' for the frontend and 'http://127.0.0.1:5555/' for the backend in your web browser.


# Usage

Once you have access to the application in your web browser, follow the Signup link to create your account and user profile.  When creating your user profile you will be asked to select a role. As stated above, each role offers specific capabilities to use throughout the application.  Try each role to get an idea of how each one differs by resource! Take total control with the Admin role. Or be a Manager and build out your team of users to manage your customer database and quote activity.


# Contribution

Repo origingally cloned from https://github.com/Enoch2k2/flatiron-flask-project-generator. Configured for Flask and React frontend and used to assist with the creation of this phase 4 project for Flatiron School - Software Engineering program.

All other code contributed by [me](https://github.com/N2IT). 

I welcome contributions from the community! If you have suggestions for improvements or bug fixes, please feel free to fork the repository and submit a pull request.