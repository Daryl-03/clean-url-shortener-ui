import { Shortlink } from "@/types/shortlink";

export interface ShortlinkApiPort {
	createShortlink(originalUrl: string): Promise<Shortlink>;
	getAllShortlinks(): Promise<Shortlink[]>;
	deleteShortlink(id: string): Promise<void>;
	updateShortlink(id: string, originalUrl: string): Promise<Shortlink>;
}