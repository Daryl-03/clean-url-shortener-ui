"use client";

import { useState } from "react";
import { Shortlink } from "@/types/shortlink";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteShortlinkAction } from "@/lib/actions/shortlinks/shortlinks";
import ConfirmDialogError from "../shared/confirmDialog";
import UpdateLinkDialog from "./updateLinkDialog";

export interface LinkListLineProps {
	link: Shortlink;
}

export default function LinkListLine({ link }: LinkListLineProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const handleDelete = async (id: string) => {
		const result = await deleteShortlinkAction(id);
		if (result.success) {
			toast.success("Link deleted successfully.");
			
		} else {
			toast.error("Could not delete link. Please try again later.");
			
		}
	}

	return (
		<TableRow key={link.id} className="border-0" >
			<TableCell className="">
				<div
					className={`font-medium max-w-lg py-6 pl-2 align-middle cursor-pointer ${isExpanded ? "break-all whitespace-normal" : "truncate"}`}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{link.originalUrl}
				</div>
			</TableCell>
			<TableCell >
				<div className="flex pl-2 items-center group">
					<Link
						href={process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode}
						className="text-primary hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						{process.env.NEXT_PUBLIC_REDIRECT_BASE_URL + link.shortCode}
					</Link>
					<Copy
						className="md:hidden group-hover:inline-block ml-2 cursor-pointer text-foreground/70 hover:text-foreground"
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

				<div className="text-start py-6 pl-2 align-middle">
					{new Date(link.createdAt).toLocaleString().split(' ')[0]}
				</div>
			</TableCell>
			<TableCell className="" >
				<div className="text-center flex gap-4 py-6 pl-2 items-center">
					<UpdateLinkDialog link={link} />
					<ConfirmDialogError onConfirm={() => handleDelete(link.id)}>
						<Button variant={"ghost"} size={"icon"} className="font-semibold cursor-pointer size-5" asChild>
							<Trash className="text-destructive/70 hover:text-destructive" size={16} />
						</Button>
					</ConfirmDialogError>
				</div>
			</TableCell>
		</TableRow>
	);
}