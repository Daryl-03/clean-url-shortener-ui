"use client";

import AnalyticsDashboardSkeleton from "@/components/analytics/analyticsDashboardSkeleton";
import BrowserPieChart from "@/components/analytics/browserChart";
import { ClickChart } from "@/components/analytics/clickChart";
import CountryTable from "@/components/analytics/countryTable";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCuratedClickEventsAction } from "@/lib/actions/analytics/analytics";
import { getShortlinkByCodeAction } from "@/lib/actions/shortlinks/shortlinks";
import { ClickEventStat } from "@/types/clickEvent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { CalendarIcon, MousePointerClick } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { ca, da } from "date-fns/locale";


interface PageProps {
	params: {
		slug: string;
	};
}

export default function AnalyticsPage({ params }: PageProps) {
	const [timeRange, setTimeRange] = useState("30d");
	const [clickData, setData] = useState<ClickEventStat | null>(null);
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState<DateRange | undefined>();

	async function fetchData() {
		setLoading(true);
		const { slug } = await params;
		const shortlink = await getShortlinkByCodeAction(slug);

		if (!shortlink) {
			setLoading(false);
			return;
		}
		const dateRange = formatDateRange(timeRange);
		console.log("Fetching analytics data from " + dateRange.startDate.toDateString() + " to " + dateRange.endDate.toDateString());
		const clicks = await getCuratedClickEventsAction(
			shortlink.id,
			dateRange.startDate,
			dateRange.endDate
		);
		console.log(clicks);
		setData(clicks);
		setLoading(false);
	}
	useEffect(() => {

		fetchData();
	}, [timeRange, params]);


	if (loading) {
		return <>
			<AnalyticsDashboardSkeleton></AnalyticsDashboardSkeleton>
		</>;
	}

	if (!clickData || clickData === null) {
		return <>
			<main className="flex-1 px-5 md:px-24 pt-10 pb-10 md:pt-10 md:pb-0 flex flex-col gap-10 relative">
				<h1 className="md:hidden" >Link Analytics</h1>
				<h2 className="hidden md:block" >Link Analytics</h2>
				<p className="text-card-foreground" >
					The requested shortlink does not exist.
				</p>
			</main>
		</>
	}

	function formatDateRange(range: string): { startDate: Date; endDate: Date } {
		let endDate = new Date();
		let startDate = new Date();
		switch (range) {
			case "1d":
				startDate.setDate(endDate.getDate() - 1);
				break;
			case "7d":
				startDate.setDate(endDate.getDate() - 7);
				break;
			case "30d":
				startDate.setDate(endDate.getDate() - 30);
				break;
			case "90d":
				startDate.setDate(endDate.getDate() - 90);
				break;
			case "custom":
				if (date && date.from) {
					startDate = date.from;
				}
				if (date && date.to) {
					endDate = date.to;
					endDate.setHours(23, 59, 59, 999);
				}
				break;
			default:
				startDate.setDate(endDate.getDate() - 30);
		}
		return { startDate, endDate };
	}

	return (
		<main className="flex-1 px-5 md:px-24 pt-10 pb-10 md:pt-10 md:pb-0 flex flex-col gap-10 relative">
			<h1 className="md:hidden" >Link Analytics</h1>
			<h2 className="hidden md:block" >Link Analytics</h2>

			<section className="container flex justify-end gap-6" >
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={"outline"}
							className={cn(
								"w-60 justify-start text-left font-normal bg-white! rounded-lg",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, "LLL dd, y")} -{" "}
										{format(date.to, "LLL dd, y")}
									</>
								) : (
									format(date.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-2" align="end">
						<Calendar
							autoFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={(newDate) => {
								setDate(newDate);
							}}
							numberOfMonths={1}
						/>
						<Button className="w-full" onClick={()=>{
							setTimeRange("custom")
							fetchData();
						}} >
							Apply
						</Button>
					</PopoverContent>
				</Popover>
				<Select value={timeRange} onValueChange={(value) => {
                    if (value !== "custom") {
                        setTimeRange(value);
                        setDate(undefined);
                    }
                }} >
					<SelectTrigger
						className="rounded-lg sm:ml-auto sm:flex w-50 bg-white! ml-0!"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
						<SelectItem value="1d" className="rounded-lg">
							Today
						</SelectItem>
					</SelectContent>
				</Select>
			</section>
			<section className="container grid grid-cols-7 gap-10" >
				<Card className=" col-span-2 h-fit shadow-md border-0" >
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MousePointerClick className="" />
							<span className="text-card-foreground text-lg" >
								Total Clicks
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-card-foreground text-start font-bold text-5xl" >
							{clickData?.totalClicks}
						</p>
					</CardContent>
					<CardFooter>
					</CardFooter>
				</Card>
				<div className="col-span-5" >
					<ClickChart data={clickData!.clicksPerDayPerDeviceType} />
				</div>

			</section>

			<section className="container grid grid-cols-2 gap-10">
				<BrowserPieChart data={clickData!.browserStats} />
				<CountryTable data={clickData!.countryStats} />
			</section>
		</main>
	);
}