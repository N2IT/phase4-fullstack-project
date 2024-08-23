import LoginForm from '../components/forms/LoginForm'
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AgentContext } from '../AgentProvider';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

// import { useEffect } from 'react';

const Home = () => {

  const { agent, isLoading } = useContext(AgentContext);

  if (isLoading) {
    return <div> Loading ... </div>
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
        {agent ? (
          <>
            <h2 className="text-3xl font-bold underline">Welcome {agent.username}!</h2>
            <Container>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Container>

          </>
        ) :
          <div>
            <h2>Quote Pro</h2>
            <LoginForm />
            <h3>OR<br /><br />Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        }
      </div>
    </>
  );
}

export default Home;

