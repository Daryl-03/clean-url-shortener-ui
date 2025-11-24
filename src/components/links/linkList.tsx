import { Table, TableHeader, TableCaption, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Shortlink } from "@/types/shortlink";
import LinkListLine from "./linkListLine";


export interface LinkListProps {
	links?: Shortlink[];
}

export default function LinkList({ links }: LinkListProps) {
	return (
		<Table>
			<TableHeader className="uppercase" >
				<TableRow className=" font-bold border-2 border-border" >
					<TableHead className="pl-4 py-2 w-1/2 rounded-tl-md">Original url</TableHead>
					<TableHead className="pl-4 py-2 w-1/5" >Short url</TableHead>
					<TableHead className="pl-4 py-2 w-1/5" >Date created</TableHead>
					<TableHead className="pl-4 py-2 w-2/5  rounded-tr-md" ></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="bg-card text-card-foreground " >
				{links?.map((link) => (
					<LinkListLine link={link} key={link.id} ></LinkListLine>
				))}
			</TableBody>
		</Table>
	);
}