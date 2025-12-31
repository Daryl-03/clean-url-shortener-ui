import { CountryStat } from "@/types/clickEvent";
import { Card, CardTitle } from "../ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Map } from "lucide-react";

export interface CountryTableProps {
	data: CountryStat[]
}

export default function CountryTable({data}: CountryTableProps) {
	return <>
		<Card className="px-4 border-0 shadow-md" >
			<CardTitle className="flex items-center gap-2">
				<Map className="h-5 w-5 " />
				Click Provenance
			</CardTitle>
			<Table className="text-center" >
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">City</TableHead>
						<TableHead className="text-center">Visitors</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="overflow-y-auto" >
					{data && data.map((country, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{country.countryName}</TableCell>
							<TableCell>{country.count}</TableCell>
						</TableRow>
					))}
					{(!data || data.length === 0 ) && (
						<TableRow>
							<TableCell colSpan={2} className="text-center" >No data available</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

		</Card>
	</>
}