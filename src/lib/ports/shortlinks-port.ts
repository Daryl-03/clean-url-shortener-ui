import { Shortlink } from "@/types/shortlink";

export interface ShortlinkApiPort {
	createShortlink(originalUrl: string): Promise<Shortlink>;
	getAllShortlinks(): Promise<Shortlink[]>;
	deleteShortlink(id: string): Promise<void>;
}