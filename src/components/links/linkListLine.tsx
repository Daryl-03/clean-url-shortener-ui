"use client";

import { Shortlink } from "@/types/shortlink";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

export interface LinkListLineProps {
	link: Shortlink;
}

export default function LinkListLine({ link }: LinkListLineProps) {
	return (
		<TableRow key={link.id} className="border-0" >
						<TableCell className="">
							<div className="font-medium max-w-lg py-6 pl-4 align-middle break-all whitespace-normal" >
								{link.originalUrl}
							</div>
						</TableCell>
						<TableCell className="">
							<div className="flex items-center group">
								<Link
									href={process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode}
									className="text-primary hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									{process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode}
								</Link>
								<Copy 
								className="hidden group-hover:inline-block ml-2 cursor-pointer text-foreground/70 hover:text-foreground" 
								size={16} 
								aria-label="Copy short URL" 
								role="button" 
								onClick={() => {
									navigator.clipboard.writeText(process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode);
									toast("Short URL copied to clipboard!");
								}}
								/>
							</div>
						</TableCell>
						<TableCell className="" >
							
							<div className="text-start py-6 pl-4 align-middle">
								{link.createdAt.toString()}
							</div>
						</TableCell>
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
	);
}