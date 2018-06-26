import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BlogComponentsPage, BlogUpdatePage } from './blog.page-object';

describe('Blog e2e test', () => {
    let navBarPage: NavBarPage;
    let blogUpdatePage: BlogUpdatePage;
    let blogComponentsPage: BlogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Blogs', () => {
        navBarPage.goToEntity('blog');
        blogComponentsPage = new BlogComponentsPage();
        expect(blogComponentsPage.getTitle()).toMatch(/blogApp.blog.home.title/);
    });

    it('should load create Blog page', () => {
        blogComponentsPage.clickOnCreateButton();
        blogUpdatePage = new BlogUpdatePage();
        expect(blogUpdatePage.getPageTitle()).toMatch(/blogApp.blog.home.createOrEditLabel/);
        blogUpdatePage.cancel();
    });

    it('should create and save Blogs', () => {
        blogComponentsPage.clickOnCreateButton();
        blogUpdatePage.setNameInput('name');
        expect(blogUpdatePage.getNameInput()).toMatch('name');
        blogUpdatePage.setHandleInput('handle');
        expect(blogUpdatePage.getHandleInput()).toMatch('handle');
        blogUpdatePage.userSelectLastOption();
        blogUpdatePage.save();
        expect(blogUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
