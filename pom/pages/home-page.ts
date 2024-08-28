import {Page,Locator} from '@playwright/test'

export class HomePage{
  
    page:Page;
    startShippingCube: Locator;
    ratingCube:Locator;
    fromShippingAddress:Locator;
    toShippingAddress:Locator;
    packagingDropdown:Locator;
    packageWeightInput:Locator;
    showRatesButton:Locator;
    shippingRate:Locator;
    shipNowButton:Locator;
    
    constructor(page:Page){
        this.page=page;
        this.startShippingCube = page.locator('button span:has-text("SHIP")');
        this.ratingCube = page.locator('button span:has-text("RATE & TRANSIT TIMES")');
        this.fromShippingAddress=page.getByLabel('From address');
        this.toShippingAddress=page.getByLabel('To address');
        this.packagingDropdown = page.getByLabel('Select Package Type');
        this.packageWeightInput = page.getByLabel('Package weight*');
        this.showRatesButton = page.getByRole('button', { name: 'Show Rates' });
        this.shippingRate = page.locator('.magr-c-rates__price')
        this.shipNowButton = page.getByRole('button', { name: 'Ship now' });

    }

    async goto(){
        await this.page.goto('en-nl/home.html');
    }

    async fillShippingAddresses(fromAddress: string, toAddress: string){
        await this.fromShippingAddress.fill(fromAddress);
        await this.page.getByRole('option', { name: fromAddress }).click();
        await this.toShippingAddress.fill(toAddress);
        await this.page.getByRole('option', { name: toAddress}).click();

    }

    async fillShipmentPackagingDetails(packagingOption: string, packageWeight: string) {
        await this.packagingDropdown.selectOption(packagingOption);
        await this.packageWeightInput.fill(packageWeight);
        await this.showRatesButton.click();
    }
}