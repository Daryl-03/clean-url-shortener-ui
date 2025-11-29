import { ParamsOf } from './../../../.next/types/routes.d';
import { AnalyticsApiPort } from "@/lib/ports/analytics-port";
import { ClickEvent } from "@/types/clickEvent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getAccessTokenRaw } = getKindeServerSession();

export class RestAnalyticsApi implements AnalyticsApiPort {
	private backendUrl = process.env.NEXT_BACKEND_URL || "";

	async getRangeOfClickEvents(shortlinkId: string, startDate: Date, endDate: Date): Promise<ClickEvent[]> {
		const rawAccessToken = await getAccessTokenRaw();
		const response = await fetch(`${this.backendUrl}/api/analytics/${shortlinkId}/ranged?from=${startDate.toISOString()}&to=${endDate.toISOString()}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${rawAccessToken}`,
				"Content-Type": "application/json"
			},
		});
		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.message || "Failed to fetch analytics");
		}
		return await response.json();
	}
}
