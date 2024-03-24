import { input, circle, colorDefault, colorChanging, colorModified } from './constants';
const testArr = ['o', 'l', 'l', 'e', 'H'];

describe('the line works correctly', function () {
    beforeEach(function () {
        cy.visit('/recursion');
        cy.get('[class^=string_input_container__]').as('container');
        cy.get('@container').find(input).as('input');
    })

    it('should be an inactive button if the Input is empty', function () {
        cy.get('@container').find('button').as('button');

        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled');
    });

    it('should be the correct string reversal', function () {
        cy.get('@input').type('Hello');
        cy.get('@container').find('button').should('not.be.disabled').contains('Развернуть').click();

        cy.get('ul>li').as('array');

        //проверка перебором на дефолтное состояние
        cy.get('@array')
            .should('have.length', 5)
            .each(($li) => {
                cy.get($li).find(circle).as('circle');
                cy.get('@circle').should('have.css', 'border-color', colorDefault);
            });

        //проверка перебором первого и последнего элементов на изменение
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find(circle).as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', colorChanging);
                }
            });
        //следующий шаг изменения цвета
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find(circle).as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', colorModified);
                }
                if (index === 1 || index === (list.length - 2)) {
                    cy.get('@circle').should('have.css', 'border-color', colorChanging);
                }
            });
        //следующий шаг изменения цвета
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find(circle).as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', colorModified);
                }
                if (index === 1 || index === (list.length - 2)) {
                    cy.get('@circle').should('have.css', 'border-color', colorChanging);
                }
            });

        //финальный шаг
        cy.get('@array')
            .should('have.length', 5)
            .each(($li) => {
                cy.get($li).find(circle).as('circle');
                cy.get('@circle').should('have.css', 'border-color', colorModified);
            });

        //проверка корректного переворота строки
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index) => {
                cy.get($li).find(circle).as('circle');
                cy.get('@circle').should('contain.text', testArr[index]);
            });
    });

})