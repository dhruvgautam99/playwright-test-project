import {Page,Locator} from '@playwright/test'

export class HomePage{
    page:Page;
    privateLeaseButton: Locator;

    constructor(page:Page){
        this.page=page;
        this.privateLeaseButton=page.getByTestId('scope-toggle-btn-for-privatelease');
    }

    async goto(){
        await this.page.goto('nl-nl');
    }
}