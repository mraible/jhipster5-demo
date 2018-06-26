import { element, by, promise, ElementFinder } from 'protractor';

export class EntryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-entry div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EntryUpdatePage {
    pageTitle = element(by.id('jhi-entry-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    contentInput = element(by.id('field_content'));
    dateInput = element(by.id('field_date'));
    blogSelect = element(by.id('field_blog'));
    tagSelect = element(by.id('field_tag'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setContentInput(content): promise.Promise<void> {
        return this.contentInput.sendKeys(content);
    }

    getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    blogSelectLastOption(): promise.Promise<void> {
        return this.blogSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    blogSelectOption(option): promise.Promise<void> {
        return this.blogSelect.sendKeys(option);
    }

    getBlogSelect(): ElementFinder {
        return this.blogSelect;
    }

    getBlogSelectedOption() {
        return this.blogSelect.element(by.css('option:checked')).getText();
    }

    tagSelectLastOption(): promise.Promise<void> {
        return this.tagSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    tagSelectOption(option): promise.Promise<void> {
        return this.tagSelect.sendKeys(option);
    }

    getTagSelect(): ElementFinder {
        return this.tagSelect;
    }

    getTagSelectedOption() {
        return this.tagSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
