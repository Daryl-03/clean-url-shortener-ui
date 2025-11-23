
"use server";

import { shortlinkApi } from "@/lib/dependencies";
import { Shortlink } from "@/types/shortlink";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createShortlinkSchema = z.object({
	originalUrl: z.url({
		message: "Invalid URL format",
	})
})

export interface CreateShortlinkActionResponse {
	success: boolean;
	data?: Shortlink;
	error?: string;
}

export async function createShortlinkAction(
	prevState: any,
	formData: FormData
): Promise<CreateShortlinkActionResponse> {
	const originalUrl = formData.get("link") as string;
	
	
	const validation = createShortlinkSchema.safeParse({ originalUrl });
	if (!validation.success) {

		return {
			success: false,
			error: validation.error.issues[0].message
		};
	}

	try {
		const shortlink = await shortlinkApi.createShortlink(originalUrl);
		revalidatePath("/");
		return {
			success: true,
			data: shortlink
		};

	} catch (error: any) {
		console.log(error);
		
		return {
			success: false,
			error: error.message || 'An unexpected error occurred'
		};
	}
}