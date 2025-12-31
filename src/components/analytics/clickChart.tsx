"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ClicksPerDayPerDeviceType } from "@/types/clickEvent"
import { TrendingUp } from "lucide-react"

export const description = "An interactive area chart"

const chartConfig = {
	others: {
		label: "others",
	},
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig


export interface ClickChartProps {
	data?: ClicksPerDayPerDeviceType[]
}

export function ClickChart({ data }: ClickChartProps) {


	return (
		<Card className="pt-0 border-0 shadow-md">
			<CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>
						<TrendingUp className="inline-block mr-2" />
						Clicks progression
					</CardTitle>

				</div>

			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 ">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full "
				>
					<AreaChart data={data}>
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value)
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										})
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="countsPerDeviceType.mobile"
							name="Mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="countsPerDeviceType.desktop"
							name="Desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-desktop)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
