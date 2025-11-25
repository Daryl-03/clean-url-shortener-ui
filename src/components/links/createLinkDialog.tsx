"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ShortlinkForm from "./shortlinkForm";
import { createShortlinkAction } from "@/lib/actions/shortlinks/shortlinks";

export default function CreateLinkDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const onSuccess = () => {
		setIsOpen(false);
		toast.success("Link created successfully!");
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} >
			<DialogTrigger>
				<div className="absolute bottom-5 md:bottom-10 right-5 md:right-24 bg-primary rounded-full p-4 cursor-pointer" >
					<Plus className="text-primary-foreground" />
				</div>
			</DialogTrigger>
			<DialogContent className="p-10" >
					<DialogHeader>
						<DialogTitle>
							<span className="text-2xl font-semibold">
								Create New Link
							</span>
						</DialogTitle>
						<DialogDescription>
						</DialogDescription>
					</DialogHeader>
				<ShortlinkForm onSuccess={() => setIsOpen(false)} action={createShortlinkAction} />
			</DialogContent>
		</Dialog>
	);
}
