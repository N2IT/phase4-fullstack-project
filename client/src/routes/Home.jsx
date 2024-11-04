import LoginForm from '../components/forms/LoginForm';
import { Link, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AgentContext } from '../AgentProvider';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import AdminHome from '../components/AdminHome';
import LoadingPage from '../components/LoadingPage';

const Home = () => {
  const { agent, isLoading, navigate } = useContext(AgentContext);

  const accountId = localStorage.getItem('account.id');

  // Show loading screen while the app is checking the session state
  if (isLoading) {
    return <LoadingPage />;
  }

  if (agent) {
    if (agent.role_id === 1) {
      return (
        <div className="account-details">
          <AdminHome />
        </div>
      );
    }
  }

  if (accountId) {
    navigate(`/accounts/${accountId}`);
  }

  return (
    <>
      <div className="account-details">
        <Container className='form-width'>
          <div>
            <h2>Quote Pro</h2>
            <LoginForm />
            <h3>OR<br /><br />Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
