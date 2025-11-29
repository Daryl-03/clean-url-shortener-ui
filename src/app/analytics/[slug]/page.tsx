import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRangeOfClickEventsAction } from "@/lib/actions/analytics/analytics";
import { getShortlinkByCodeAction } from "@/lib/actions/shortlinks/shortlinks";


interface PageProps {
	params: {
		slug: string;
	};
}

export default async function AnalyticsPage({ params }: PageProps) {

	const { slug } = await params;
	const shortlink = await getShortlinkByCodeAction(slug);
	 if (!shortlink) {
		return null;
	}
	const clicks = await getRangeOfClickEventsAction(
		shortlink.id,
		new Date(new Date().setDate(new Date().getDate() - 30)),
		new Date()
	);

	return (
		<main className="flex-1 px-5 md:px-24 pt-10 pb-10 md:pt-10 md:pb-0 flex flex-col gap-10 relative">
			<h1 className="md:hidden" >Link Analytics</h1>
			<h2 className="hidden md:block" >Link Analytics</h2>

			<Card className="md:w-[20%]" >
				<CardHeader>
					<CardTitle>
						<span className="text-card-foreground text-lg" >
							Clicks
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-card-foreground font-bold text-5xl" >
						{clicks.length}
					</p>
				</CardContent>
				<CardFooter>
				</CardFooter>
			</Card>
			<Card className="md:w-[20%]" >
				<CardHeader>
					<CardTitle className="flex flex-col" >
						<span className="text-card-foreground text-lg" >
							app type : {clicks[0]?.device.deviceType}
						</span>
						<span className="text-card-foreground text-lg" >
							browser : {clicks[0]?.device.browser}
						</span>
						<span className="text-card-foreground text-lg" >
							os : {clicks[0]?.device.operatingSystem}
						</span>
						
						<span className="text-card-foreground text-lg" >
							ctname : {clicks[0]?.location?.countryName}
						</span>

					</CardTitle>
				</CardHeader>
				<CardFooter>
				</CardFooter>
			</Card>
		</main>
	);
}