"use client"

import { Globe, TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { BrowserStat } from "@/types/clickEvent"

export const description = "A pie chart with a label list"

export interface BrowserPieChartProps {
	data: BrowserStat[]
}

export default function BrowserPieChart({ data }: BrowserPieChartProps) {

	const themeColors = [
		"var(--chart-1)",
		"var(--chart-2)",
		"var(--chart-3)",
		"var(--chart-4)",
		"var(--chart-5)",
	];

	const { chartData, chartConfig } = useMemo(() => {
		if (!data || data.length === 0) {
			return { chartData: [], chartConfig: {} }
		}

		const newChartConfig: ChartConfig = {
			visitors: {
				label: "Visitors",
			},
		}
		const newChartData = data.map((item, index) => {
			let color: string;
			if (index < themeColors.length) {
				color = themeColors[index];
			} else {
				// Générer une couleur aléatoire en évitant les teintes rouges (généralement de 0 à 30 et de 330 à 360 degrés)
				const hue = Math.floor(Math.random() * 300) + 30; // Teinte entre 30 et 330
				color = `hsl(${hue}, 70%, 50%)`;
			}
			newChartConfig[item.browser] = {
				label: item.browser.charAt(0).toUpperCase() + item.browser.slice(1),
				color: color,
			}
			return {
				...item,
				fill: color,
			}
		})
		return { chartData: newChartData, chartConfig: newChartConfig }
	}, [data])

	return (
		<Card className="flex flex-col border-0 shadow-md">
			<CardHeader className="items-center pb-0">
				<CardTitle className="flex items-center gap-2">
					<Globe className="h-5 w-5 text-muted-foreground" />
					<span>Browsers used</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				{chartData.length > 0 && <ChartContainer
					config={chartConfig}
					className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="visitors" hideLabel />}
						/>
						<Pie data={chartData} dataKey="count">
							<LabelList
								dataKey="browser"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartConfig) =>
									chartConfig[value]?.label
								}
							/>
						</Pie>
						<ChartLegend
							content={<ChartLegendContent nameKey="browser" />}
						/>
					</PieChart>
				</ChartContainer>}
				{chartData.length === 0 && <div className="flex flex-1 items-center justify-center h-full w-full py-20">
					<span className="text-lg text-muted-foreground">No data available</span>
				</div>}
			</CardContent>
		</Card>
	)
}
