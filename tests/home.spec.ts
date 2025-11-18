import {test, expect} from '@playwright/test';

test('home page has heading', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading')).toBeVisible();
});

test('home contains login link', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', {name: 'Login'})).toBeVisible();
});

test('home contains signup link', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', {name: 'Sign Up'})).toBeVisible();
});

// test('login link navigates to login page', async ({page}) => {
// 	  await page.goto('http://localhost:3000/');
// 	  await page.getByRole('link', {name: 'Login'}).click();
// 	  await expect(page).toHaveURL('http://localhost:3000/login');
// 	});