"use client";

import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { parseISO, getMonth } from "date-fns";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Function to generate chart data by grouping by month
const generateChartData = (dataArray, label) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthCounts = Array(12).fill(0); // Initialize counts for 12 months

    dataArray.forEach((item) => {
        const monthIndex = getMonth(parseISO(item.created_at)); // Get month index (0-11)
        monthCounts[monthIndex] += 1; // Increment the corresponding month count
    });

    return monthNames.map((month, index) => ({
        month,
        [label]: monthCounts[index],
    }));
};

const chartConfig = {
    customers: {
        label: "Customers",
        color: "hsl(var(--chart-1))",
    },
    quotes: {
        label: "Quotes",
        color: "hsl(var(--chart-2))",
    },
    orders: {
        label: "Orders",
        color: "hsl(var(--chart-3))",
    },
    accounts: {
        label: "Accounts",
        color: "hsl(var(--chart-4))",
    },
};

const colorConfig = Object.entries(chartConfig || {}).filter(
    ([_, configItem]) => configItem?.theme || configItem?.color
);

// Custom BarChart component
export function CustomBarChart({ data, label }) {
    return (
        <ResponsiveContainer width="100%" height="100%"> {/* Responsive container */}
            <BarChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey={label} fill="var(--color-desktop)" radius={8} />
            </BarChart>
        </ResponsiveContainer>
    );
}

// Main component rendering the chart
export function Component({ accounts, dataType }) {

    const dataMapping = {
        customers: accounts.flatMap((account) => account.customers),
        quotes: accounts.flatMap((account) => account.quotes),
        orders: accounts.flatMap((account) => account.orders),
        accounts: accounts
    };

    const selectedData = dataMapping[dataType] || [];
    const chartData = generateChartData(selectedData, dataType);

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{capitalizeFirstLetter(dataType)}</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig[dataType]}>
                    <CustomBarChart data={chartData} label={dataType} />
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total {dataType} for the year 2024
                </div>
            </CardFooter> */}
        </Card>
    );
}
