import { Table, TableHeader, TableCaption, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { Plus, Copy, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shortlink } from "@/types/shortlink";


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
							<TableRow key={link.id} className="border-0" >
								<TableCell className="">
									<div className="font-medium max-w-lg py-6 pl-4 align-middle break-all whitespace-normal" >
										{link.originalUrl}
									</div>
								</TableCell>
								<TableCell className="">
									<div className="flex items-center group">
										<Link
											href="#"
											className="text-primary hover:underline"
										>
											{ process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode}
										</Link>
										<Copy className="hidden group-hover:inline-block ml-2 cursor-pointer text-foreground/70 hover:text-foreground" size={16} aria-label="Copy short URL" role="button" />
									</div>
								</TableCell>
								<TableCell className="" ><div className="text-start py-6 pl-4 align-middle">{link.createdAt.toDateString()}</div></TableCell>
								<TableCell className="" >
									<div className="text-center flex gap-4 py-6 pl-4 items-center">
										<Button variant={"outline"} size={"icon"} className="font-semibold cursor-pointer size-5" asChild>
											<Edit className="text-foreground/70 hover:text-foreground" size={16} />
										</Button>
										<Button variant={"ghost"} size={"icon"} className="font-semibold cursor-pointer size-5" asChild>
											<Trash className="text-destructive/70 hover:text-destructive" size={16} />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
	);
}