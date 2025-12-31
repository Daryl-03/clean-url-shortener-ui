import { ClickEvent, ClickEventStat } from "@/types/clickEvent";
import { Shortlink } from "@/types/shortlink";

export interface AnalyticsApiPort {
	getRangeOfClickEvents(shortlinkId: string, startDate: Date, endDate: Date): Promise<ClickEvent[]>;
	getCuratedClickEvents(shortlinkId: string, startDate: Date, endDate: Date): Promise<ClickEventStat>;
}