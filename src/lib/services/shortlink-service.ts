import { ShortlinkApiPort } from '@/lib/ports/shortlinks-port';
import { Shortlink } from '@/types/shortlink';
import { error } from 'console';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { ca } from 'zod/v4/locales';
const {getAccessToken, getAccessTokenRaw} = getKindeServerSession();


export class RestShortlinkApi implements ShortlinkApiPort {
	private backendUrl = process.env.NEXT_BACKEND_URL || '';
	async createShortlink(originalUrl: string): Promise<Shortlink> {
		const rawAccessToken = await getAccessTokenRaw();
		
		const response = await fetch(`${this.backendUrl}/api/shortlinks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${rawAccessToken}`
			},
			body: JSON.stringify({ url: originalUrl })
		});
		
		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.message || 'Failed to create shortlink');
		}
		
		const result = await response.json();
		
		return {
			...result
		};
	}
	
	async getAllShortlinks(): Promise<Shortlink[]> {
		const rawAccessToken = await getAccessTokenRaw();
		
		try {
			
			const response = await fetch(`${this.backendUrl}/api/shortlinks`, {
			method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${rawAccessToken}`
				}
			});
			
			const result = await response.json();
			return result;
		} catch (e) {
			console.error("Error fetching shortlinks:", e);
			throw e;
		}
	}

	async deleteShortlink(id: string): Promise<void> {
		const rawAccessToken = await getAccessTokenRaw();

		const response = await fetch(`${this.backendUrl}/api/shortlinks/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${rawAccessToken}`
			}
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.message || 'Failed to delete shortlink');
		}
	}

	async updateShortlink(id: string, originalUrl: string): Promise<Shortlink> {
		const rawAccessToken = await getAccessTokenRaw();

		const response = await fetch(`${this.backendUrl}/api/shortlinks`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${rawAccessToken}`
			},
			body: JSON.stringify({ id: id, url: originalUrl })
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			error(errorResponse)
			throw new Error(errorResponse.message || 'Failed to update shortlink');
		}

		const result = await response.json();
		return {
			...result
		};
	}
}

export class InMemoryShortlinkApi implements ShortlinkApiPort {
	private shortlinks: Shortlink[] = [];
	async createShortlink(originalUrl: string): Promise<Shortlink> {
		const newShortlink: Shortlink = {
			id: (this.shortlinks.length + 1).toString(),
			originalUrl,
			shortCode: Math.random().toString(36).substring(2, 8),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.shortlinks.push(newShortlink);
		return newShortlink;
	}

	async getAllShortlinks(): Promise<Shortlink[]> {
		return this.shortlinks;
	}

	async deleteShortlink(id: string): Promise<void> {
		this.shortlinks = this.shortlinks.filter(link => link.id !== id);
	}

	async updateShortlink(id: string, originalUrl: string): Promise<Shortlink> {
		const index = this.shortlinks.findIndex(link => link.id === id);
		if (index === -1) {
			throw new Error('Shortlink not found');
		}
		const updatedShortlink: Shortlink = {
			...this.shortlinks[index],
			originalUrl,
			updatedAt: new Date(),
		};
		this.shortlinks[index] = updatedShortlink;
		return updatedShortlink;
	}

}