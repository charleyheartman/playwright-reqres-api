import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'https://reqres.in',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'x-api-key': process.env.API_KEY || '',
    },
  },

  projects: [
    // API тесты — без браузера, один прогон
    {
        name: 'api',
        testMatch: '**/specs/**/*.spec.ts',
        testIgnore: '**/example.spec.ts',
    },
    
    // UI тесты — с браузерами
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
        testMatch: '**/example.spec.ts',
    },
    {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
        testMatch: '**/example.spec.ts',
    },
],
});