import { ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { parseISO, getMonth } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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