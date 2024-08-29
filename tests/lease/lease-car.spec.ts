import { test, expect } from '@playwright/test';

import {HomePage} from '../../pom/pages/lease/home-page';
import {CookieConsentModal} from '../../pom/commons/lease/cookie-consent-modal';

test.beforeEach('Given User open lease homepage',async({page,request})=>{
    const homePage= new HomePage(page);
    const cookieConsentModal= new CookieConsentModal(page);
    
    console.log(`Running ${test.info().title}`);
    homePage.goto();
    await cookieConsentModal.rejectAllCookiesButton.click();
    });

    test.describe('User is able to select car for lease and see prices',() =>{
        test('User can navigate to see lease prices from home page', async ({page})=>{
            const homePage= new HomePage(page);
        
            await test.step('When I click Private Lease link', async () => {
                
                await homePage.privateLeaseButton.click();
            });
        
        });
        });