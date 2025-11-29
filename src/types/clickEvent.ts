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