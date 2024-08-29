import { defineConfig, devices } from '@playwright/test';
// import path from 'path';
// import env from 'environment';
//  import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html',{open:'never'}]],
  use: {
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot:'only-on-failure',
    viewport: { width: 1440, height: 1080 },
    video: 'on-first-retry',
    headless: process.env.CI ? true : false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'fdx',
      testMatch:/fdx\/.*spec\.ts$/,
      use: { ...devices['Desktop Chrome'],
        baseURL:"http://www.fedex.com"
       },
    },
    {
      name: 'lease',
      testMatch: /lease\/.*spec\.ts$/,
      use: { ...devices['Desktop Chrome'],
            baseURL:"https://www.ayvens.com/" },
            
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
