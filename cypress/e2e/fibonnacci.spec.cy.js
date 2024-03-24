import { input, circle } from './constants';

const testArr = [1,1,2,3,5,8,13,21];
describe('fibonacci array works correctly', function () {
    beforeEach(function () {
        cy.visit('/fibonacci');
        cy.get('[class^=fibonacci_input_container__]').as('container');
    })

    it('should be an inactive button if the Input is empty', function () {
        cy.get('@container').find(input).as('input');
        cy.get('@container').find('button').as('button');

        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled');
    });

    it('should be correct number generation', function () {
        cy.get('input').type('7');
        cy.get('@container').find('button').should('not.be.disabled').contains('Рассчитать').click();

        cy.get('ul>li').as('array');
        //проверка корректную генерацию чисел
        cy.get('@array')
            .should('have.length', 7)
            .each(($li, index) => {
                cy.get($li).find(circle).as('circle');
                cy.get('@circle').should('contain.text', testArr[index]);
            });
    });
});