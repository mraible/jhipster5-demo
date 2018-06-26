import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TagComponentsPage, TagUpdatePage } from './tag.page-object';

describe('Tag e2e test', () => {
    let navBarPage: NavBarPage;
    let tagUpdatePage: TagUpdatePage;
    let tagComponentsPage: TagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle()).toMatch(/blogApp.tag.home.title/);
    });

    it('should load create Tag page', () => {
        tagComponentsPage.clickOnCreateButton();
        tagUpdatePage = new TagUpdatePage();
        expect(tagUpdatePage.getPageTitle()).toMatch(/blogApp.tag.home.createOrEditLabel/);
        tagUpdatePage.cancel();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagUpdatePage.setNameInput('name');
        expect(tagUpdatePage.getNameInput()).toMatch('name');
        tagUpdatePage.save();
        expect(tagUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
