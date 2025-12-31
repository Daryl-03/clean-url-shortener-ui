
"use server";

import { analyticsApi } from "@/lib/dependencies";
import { ClickEvent } from "@/types/clickEvent";

export async function getRangeOfClickEventsAction(shortlinkId: string, startDate: Date, endDate: Date): Promise<ClickEvent[]> {
	return await analyticsApi.getRangeOfClickEvents(shortlinkId, startDate, endDate);
}

export async function getCuratedClickEventsAction(shortlinkId: string, startDate: Date, endDate: Date) {
	return await analyticsApi.getCuratedClickEvents(shortlinkId, startDate, endDate);
}