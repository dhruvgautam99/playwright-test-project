import {Page,Locator} from '@playwright/test'

export class GdprConsentModal{
    page:Page;
    rejectAllCookiesButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.rejectAllCookiesButton = page.getByRole('button', {
            name: 'REJECT ALL COOKIES',
          });
    }
}