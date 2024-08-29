import {Page,Locator} from '@playwright/test'

export class CookieConsentModal{
page:Page;
rejectAllCookiesButton:Locator;

constructor(page:Page){
    this.page=page;
    this.rejectAllCookiesButton=page.getByRole('button', {
        name: 'Weiger Alle Cookies',
      });
}
}