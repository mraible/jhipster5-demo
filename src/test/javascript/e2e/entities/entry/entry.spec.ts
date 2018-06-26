import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EntryComponentsPage, EntryUpdatePage } from './entry.page-object';

describe('Entry e2e test', () => {
    let navBarPage: NavBarPage;
    let entryUpdatePage: EntryUpdatePage;
    let entryComponentsPage: EntryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Entries', () => {
        navBarPage.goToEntity('entry');
        entryComponentsPage = new EntryComponentsPage();
        expect(entryComponentsPage.getTitle()).toMatch(/blogApp.entry.home.title/);
    });

    it('should load create Entry page', () => {
        entryComponentsPage.clickOnCreateButton();
        entryUpdatePage = new EntryUpdatePage();
        expect(entryUpdatePage.getPageTitle()).toMatch(/blogApp.entry.home.createOrEditLabel/);
        entryUpdatePage.cancel();
    });

    it('should create and save Entries', () => {
        entryComponentsPage.clickOnCreateButton();
        entryUpdatePage.setTitleInput('title');
        expect(entryUpdatePage.getTitleInput()).toMatch('title');
        entryUpdatePage.setContentInput('content');
        expect(entryUpdatePage.getContentInput()).toMatch('content');
        entryUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(entryUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        entryUpdatePage.blogSelectLastOption();
        // entryUpdatePage.tagSelectLastOption();
        entryUpdatePage.save();
        expect(entryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
