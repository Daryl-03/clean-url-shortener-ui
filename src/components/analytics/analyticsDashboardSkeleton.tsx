import { Skeleton } from "../ui/skeleton";

export default function AnalyticsDashboardSkeleton() {
	return (
		        <main className="flex-1 px-5 md:px-24 pt-10 pb-10 md:pt-10 md:pb-0 flex flex-col gap-10 relative">
            {/* Placeholder for Title */}
            <Skeleton className="h-9 w-64 bg-gray-200" />

            {/* Placeholder for Select dropdown */}
            <section className="container flex justify-end">
                <Skeleton className="h-10 w-[160px] rounded-lg bg-gray-200" />
            </section>

            {/* Placeholder for Total Clicks card and ClickChart */}
            <section className="container grid grid-cols-5 gap-10">
                <Skeleton className="col-span-1 h-[160px] rounded-xl bg-gray-200" />
                <Skeleton className="col-span-4 h-[320px] rounded-xl bg-gray-200" />
            </section>

            {/* Placeholder for BrowserPieChart and CountryTable */}
            <section className="container grid grid-cols-2 gap-10">
                <Skeleton className="col-span-1 h-[350px] rounded-xl bg-gray-200" />
                <Skeleton className="col-span-1 h-[350px] rounded-xl bg-gray-200" />
            </section>
        </main>
	);
}