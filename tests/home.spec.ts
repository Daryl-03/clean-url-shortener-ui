import { test, expect } from '@playwright/test';

test('home page has heading', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('home contains login link', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await expect(page.getByRole('link', { name: 'Log In' })).toBeVisible();
});

test('home contains signup link', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
});

test('login link navigates to login page', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByRole('link', { name: 'Log In' }).click();
	await expect(page).toHaveURL(/.*kinde\.com\/auth.*/);
});

test('signup link navigates to signup page', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByRole('link', { name: 'Sign Up' }).click();
	await expect(page).toHaveURL(/.*kinde\.com\/auth.*/);
});