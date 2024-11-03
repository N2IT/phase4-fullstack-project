import LoginForm from '../components/forms/LoginForm'
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AgentContext } from '../AgentProvider';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import AdminHome from '../components/AdminHome';
import LoadingPage from '../components/LoadingPage';

// import { useEffect } from 'react';

const Home = () => {

  const { agent, isLoading } = useContext(AgentContext);

  if (isLoading) {
    return <LoadingPage />
  }

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  }

  return (
    <>
      <div className="account-details">
        {agent ?
          <AdminHome />
          :
          <Container className='form-width'>
            <div>
              <h2>Quote Pro</h2>
              <LoginForm />
              <h3>OR<br /><br />Get Started Here:</h3>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          </Container>
        }
      </div>
    </>
  );
}

export default Home;

