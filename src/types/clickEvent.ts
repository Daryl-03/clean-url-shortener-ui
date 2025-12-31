export interface ClickEvent {
	id: string;
	timestamp: Date,
	referer: string,
	location: GeoLocation,
	device: DeviceInfo
}

export interface GeoLocation {
	countryCode: string,
	countryName: string,
	city: string,
}

export interface DeviceInfo {
	browser: string,
    operatingSystem: string,
    deviceType: string
}

export interface ClickEventStat {
	totalClicks: number;
	browserStats: BrowserStat[];
	countryStats: CountryStat[];
	clicksPerDayPerDeviceType: ClicksPerDayPerDeviceType[];
}

export interface CountryStat {
	countryCode: string;
	countryName: string;
	count: number;
}

export interface ClicksPerDayPerDeviceType {
	date: Date;
	countsPerDeviceType: Record<string, number>;
}

export interface BrowserStat {
	browser: string;
	count: number;
}