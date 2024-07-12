import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_pass from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
    });      

    it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Авторизация прошла успешно');
     })

     it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_pass.email).type(data.login);
        cy.get(recovery_pass.send_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Успешно отправили пароль на e-mail');
     })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password_incorrect);
        cy.get(main_page.login_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Такого логина или пароля нет');
     })

     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login_incorrect);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Такого логина или пароля нет');
     })

     it('Логин без @ и верный пароль', function () {
        cy.get(main_page.email).type(data.login_invalid);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Нужно исправить проблему валидации');
     })

     it('Верный логин с заглавными буквами и верный пароль', function () {
        cy.get(main_page.email).type(data.login_upper_case);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.message).should('be.visible')
        .contains('Авторизация прошла успешно');
     })
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/authorization.cy.js --browser chrome