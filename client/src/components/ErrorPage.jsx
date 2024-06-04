const ErrorPage = () => {
    return (
        <div className="account-details">
            <h2>Either this page does not exist OR you do not have proper authorization.</h2>
            <p>Contact the administrator for assistance.</p>
            <a className="" href="/"><p>Click here to return to home page.</p></a>
        </div>
    );
}

export default ErrorPage