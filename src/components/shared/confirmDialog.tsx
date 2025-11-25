import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { is } from "zod/v4/locales";
import { use, useState } from "react";

export interface ConfirmDialogErrorProps {
	title?: string;
	description?: string;
	onConfirm: () => void;
	children: React.ReactNode;
}

export default function ConfirmDialogError({ onConfirm, children, title, description }: ConfirmDialogErrorProps) {
	const [isOpen, setIsOpen] = useState(false);

	const onClickedConfirm = () => {
		onConfirm();
		setIsOpen(false);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} >
			<DialogTrigger asChild >
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> { title ?? "Are you absolutely sure?"}</DialogTitle>
					<DialogDescription>
						{description ?? "This action cannot be undone."}
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-end gap-4 mt-6">
					<DialogClose asChild>
						<Button
							type="button"
							variant={"secondary"}
						>
							Cancel
						</Button>

					</DialogClose>
					<Button
						onClick={onClickedConfirm}
						variant={"default"}
						>	
						Confirm
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}