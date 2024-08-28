import {Page,Locator} from '@playwright/test'

export class GeoModal{
    page:Page
    modal:Locator
    englishLanguageButton:Locator
    englishLanguageUSButton:Locator

    constructor(page: Page){
        this.page=page;
        this.modal=page.locator('div.fxg-geo-locator')
        this.englishLanguageButton = page.locator('ul').filter({
            hasText:'Nederlands English'
        }).getByLabel('English');
        this.englishLanguageUSButton = page
        .locator('ul')
        .filter({ hasText: 'English Español' })
        .getByLabel('English');
    }

    async acceptGeoLocation() {
        await this.page.addLocatorHandler(this.modal, async () => {
          await this.englishLanguageButton.click();
        });
      }

      async acceptGeoLocationUS() {
        await this.page.addLocatorHandler(this.modal, async () => {
          await this.englishLanguageUSButton.click();
        });
      }
}