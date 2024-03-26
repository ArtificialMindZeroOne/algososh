import { input, circle, circleConteiner, colorDefault, colorChanging} from './constants';

const testArr = ['test', 'test', 'test', 'test'];

describe('stack works correctly', function () {
    beforeEach(function () {
        cy.visit('/stack');
        cy.get('[class^=stack_input_container__]').as('container');
        cy.get('@container').find(input).as('input');
        cy.get('@container').find('#addButton').as('addButton');
        cy.get('@container').find('#deleteButton').as('deleteButton');
        cy.get('@container').find('#clearButton').as('clearButton');
        cy.get('ul').as('list');
    })

    it('this should be a check of the correct operation of the add and remove buttons', function () {
        cy.get('@input').should('be.empty');
        cy.get('@addButton').should('be.disabled');
        cy.get('@deleteButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');

        //перебором заполнение массива и проверка анимации, через each не получилось, слишком много условий
        for (let i = 0; i < testArr.length; i++) {
            cy.get('@input').type('test');
            cy.get('@addButton').should('not.be.disabled').contains('Добавить').click();

            cy.get('@list').find((circleConteiner)).as('circle-contaiter');
            cy.get('@circle-contaiter').contains('top');
            cy.get('@circle-contaiter').find(circle).eq(i).should('have.css', 'border-color', colorChanging);
            cy.get('@circle-contaiter').should('contain', i);
            cy.get('@circle-contaiter').find(circle).eq(i).should('have.css', 'border-color', colorDefault);
        }
        //проверка полученного массива на соответствие содержимого
        cy.get('ul >li')
            .should('have.length', 4)
            .each(($li, index) => {
                cy.get($li).should('contain.text', testArr[index]);
            });

        //удаление элементов
        cy.clock()
        for (let i = testArr.length - 1; i > 0; i--) {
            cy.get('@deleteButton').should('not.be.disabled').click();
            cy.tick(500);
            cy.get('@list').find(circleConteiner).as('circle-contaiter');
            cy.get('@circle-contaiter').find(circle).eq(i).should('have.css', 'border-color', colorChanging);
            cy.tick(500);
        }
    });

    it('should be a check of the correct operation of the "clear" button', () => {
        cy.clock()
        for (let i = 0; i < 2; i++) {
            cy.get('@input').type('test');
            cy.get('@addButton').should('not.be.disabled').contains('Добавить').click();
            cy.tick(500);
        }
        cy.get('@clearButton').should('not.be.disabled').click();
        cy.get('@list').should('contain.text', '');
    })

});
