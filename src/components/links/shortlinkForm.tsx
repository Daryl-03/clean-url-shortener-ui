"use client";

import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { use, useActionState, useEffect } from "react";
import { createShortlinkAction, CreateShortlinkActionResponse } from "@/lib/actions/shortlinks/shortlinks";
import { Spinner } from "../ui/spinner";
import { Shortlink } from "@/types/shortlink";

export interface ShortlinkFormProps {
	onSuccess: () => void;
	initialData?: Shortlink;
	action: (prevStave: any, formData: FormData) => Promise<any>;
}

export default function ShortlinkForm({ onSuccess, initialData, action }: ShortlinkFormProps) {
	const initialState: CreateShortlinkActionResponse = {
		success: false,
	};
	const [state, dispatch, isPending] = useActionState(action, initialState);

	useEffect(() => {
		if (state.success) {
			onSuccess();
		}
	}, [state.success, onSuccess]);

	return (
		<form action={dispatch} >
			<div className="grid gap-4">
				<div className="grid gap-3">
					<Label htmlFor="link" className="font-semibold" >Link</Label>
					<Input id="link" name="link" placeholder="Enter your link here" defaultValue={initialData?.originalUrl} />
					{
						state.success === false && state.error && (
							<p className="text-destructive text-sm mt-1" >
								{state.error}
							</p>
						)
					}
				</div>


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
						type="submit"
						variant={"default"}
						disabled={isPending}
					>
						{
							isPending && <Spinner />
						}	
						Confirm
					</Button>
				</div>
			</div>
		</form>
	);
}
