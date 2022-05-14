const { test, expect } = require('@playwright/test');
const { ElectronApplication, BrowserContext, _electron, Page  } = require('playwright');

// import path from 'path';
// import { ElectronApplication, BrowserContext, _electron, Page } from 'playwright';
// import { test, expect } from '@playwright/test';
// import { playwrightTrace } from './utils/Utils';
// import { IndexPage } from './pages/index-page';

let page

test.describe.serial('Index Page (Main App) Test', () => {
  let electronApp
  let context

  test.beforeAll(async() => {
    electronApp = await _electron.launch({ args: ['./src/main/main.ts'] });
    context = electronApp.context();

    await context.tracing.start({ screenshots: true, snapshots: true });
    page = await electronApp.firstWindow();
  });

  test.afterAll(async() => {
    await context.tracing.stop({ path: playwrightTrace(path.basename(__filename)) });
    await electronApp.close();
  });

  // test('should open main app window', async() => {
  //   await expect(electronApp.windows().length).toHaveLength(1);
  // });

  test('should start index page', async() => {
    const indexPage = new IndexPage(page);
    await expect(indexPage.page.title()).toContain('Hello Electron React!');
  });

});
