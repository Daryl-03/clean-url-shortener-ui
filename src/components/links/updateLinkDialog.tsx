"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ShortlinkForm from "./shortlinkForm";
import { Button } from "../ui/button";
import { link } from "fs";
import { Shortlink } from "@/types/shortlink";
import { updateShortlinkAction } from "@/lib/actions/shortlinks/shortlinks";

export default function UpdateLinkDialog({ link }: { link: Shortlink }) {
	const [isOpen, setIsOpen] = useState(false);

	const onSuccess = () => {
		setIsOpen(false);
		toast.success("Link updated successfully!");
	};
	const updateActionWithId = updateShortlinkAction.bind(null, link.id);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} >
			<DialogTrigger asChild>
				<Button variant={"outline"} size={"icon"} className="font-semibold cursor-pointer size-5" asChild>
						<Edit className="text-foreground/70 hover:text-foreground" size={16} />
					</Button>
			</DialogTrigger>
			<DialogContent className="p-10" >
					<DialogHeader>
						<DialogTitle>
							<span className="text-2xl font-semibold">
								Update Link
							</span>
						</DialogTitle>
						<DialogDescription>
						</DialogDescription>
					</DialogHeader>
				<ShortlinkForm onSuccess={() => setIsOpen(false)} action={updateActionWithId} initialData={link} />
			</DialogContent>
		</Dialog>
	);
}
