import { test, expect } from '@playwright/test';

import {HomePage} from '../../pom/pages/fdx/home-page';
import {GeoModal} from '../../pom/commons/fdx/geo-modal';
import {GdprConsentModal} from '../../pom/commons/fdx/gdpr-consent-modal'

// import AxeBuilder from '@axe-core/playwright';

//Fixtures example below 

// const test = base.extend<{ gdprConsentModal: GdprConsentModal }>({
//     gdprConsentModal: async ({ page }, use) => {
//       const gdprConsentModal = new GdprConsentModal(page);
//        gdprConsentModal.rejectAllCookiesButton.click;
//     },
//   });


test.beforeEach('Given User open en-nl fedex homepage',async({page,request})=>{
const homePage= new HomePage(page);
const geoModal= new GeoModal(page);
const gdprConsentModal= new GdprConsentModal(page);

console.log(`Running ${test.info().title}`);
homePage.goto();
geoModal.acceptGeoLocation();
await gdprConsentModal.rejectAllCookiesButton.click();
});

test.describe('User is able to navigate to Rating widget from the home page and see rates of the shipment',() =>{
test('User can navigate to Rating page for Shipping from the home page by clicking Cube for Rate and Transit Times', async ({page})=>{
    const homePage= new HomePage(page);

    // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    // expect(accessibilityScanResults.violations).toEqual([]); // 5

    await test.step('When I click on the Rate and Transit Times Cube link', async () => {
        await homePage.ratingCube.click();
    });

    await test.step('And I fill the From and To Address and package weight for shipping to calculate the shipping rates', async () => {
        await homePage.fromShippingAddress.fill('Bijlmerdreef 1005C, Amsterdam');
        await homePage.toShippingAddress.fill('Memphis, TN 38103, United States');
        await homePage.fillShippingAddresses('Bijlmerdreef 1005C, Amsterdam','Memphis, TN 38103, United States')
        await homePage.fillShipmentPackagingDetails('YOUR_PACKAGING','2')
    });
    await test.step('And I should see the shipping rates displayed on page ', async () => {
        expect(homePage.shippingRate.isVisible);
    });

    await test.step('And I click on the Ship Now button on the Rating page', async () => {
        await homePage.shipNowButton.click();
    });

    await test.step('Then I should see the Ship with Account Login page displayed', async () => {
        await expect(page).toHaveURL('https://www.fedex.com/secure-login/en-nl/#/login-credentials?redirectUrl=https%3A%2F%2Fwww.fedex.com%2Fshipping%2FshipEntryAction.do%3Fmethod%3DdoEntry%26link%3D1%26locale%3Den_NL%26urlparams%3Dnl_english%26sType%3DF');
        await expect(page).toHaveTitle(/Login/);
    });

});
});