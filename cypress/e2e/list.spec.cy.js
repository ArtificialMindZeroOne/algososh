import { listInputContainer, input, circle, circleConteiner, colorDefault, colorChanging, colorModified} from './constants';

describe('the queue is working correctly', function () {
    beforeEach(function () {
        cy.visit('/list');
        cy.get('[class^=list_inputs_container__]').as('containerInputs');
        cy.get(listInputContainer).first().as('containerInputValue');
        cy.get(listInputContainer).last().as('containerInputIndex');
        cy.get('@containerInputValue').find(input).as('inputValue');
        cy.get('@containerInputIndex').find(input).as('inputIndex');
        cy.get('@containerInputValue').find('#addHead').as('addHead');
        cy.get('@containerInputValue').find('#addTail').as('addTail');
        cy.get('@containerInputValue').find('#deleteHead').as('deleteHead');
        cy.get('@containerInputValue').find('#deleteTail').as('deleteTail');
        cy.get('@containerInputIndex').find('#addByIndex').as('addByIndex');
        cy.get('@containerInputIndex').find('#deleteByIndex').as('deleteByIndex');
        cy.get('ul').as('list');
        cy.get('ul>li').as('array');
    })

    it('should be an inactive button if the Inputs is empty', function () {
        cy.get('@inputValue').should('be.empty');
        cy.get('@addHead').should('be.disabled');
        cy.get('@addTail').should('be.disabled');

        cy.get('@inputIndex').should('be.empty');
        cy.get('@addByIndex').should('be.disabled');
        cy.get('@deleteByIndex').should('be.disabled');
    });

    it('should be a correct rendering of the default list', () => {
        cy.get('@array')
            .should('have.length', 4)
            .each(($li, index, list) => {
                cy.get($li).find(circleConteiner).as('circle-contaiter');
                if (index === 0) {
                    cy.get('@circle-contaiter').should('contain', 'head');
                } else {
                    cy.get('@circle-contaiter').should('not.have.contain', 'head');
                }
                if (index === (list.length - 1)) {
                    cy.get('@circle-contaiter').should('contain', 'tail');
                } else {
                    cy.get('@circle-contaiter').should('not.have.contain', 'tail');
                }
                cy.get('@circle-contaiter').find(circle).should('have.css', 'border-color', colorDefault);
            });
    });

    it('should be a valid addition adding an element to head', () => {
        cy.get('@inputValue').type('test');
        cy.get('@addHead').should('not.be.disabled').contains('Добавить в head').click();

        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle')

        //добавление в head
        cy.get('@circle').eq(0).should('contain', 'test');
        cy.get('@circle').eq(0).should('have.css', 'border-color', colorChanging);
        cy.clock();
        cy.tick(500);

        //перемещение в начало
        cy.get('@circle').eq(0).should('have.css', 'border-color', colorModified);
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border-color', colorDefault);
        cy.tick(500);
        cy.get('@circle-contaiter').eq(0).should('contain', 'head');
    });

    it('should be a valid addition adding an element to tail', () => {
        cy.get('@inputValue').type('test');
        cy.get('@addTail').should('not.be.disabled').contains('Добавить в tail').click();
        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle')

        //добавление в tail
        cy.get('@circle').eq('@list'.length - 2).should('contain', 'test');
        cy.get('@circle').eq('@list'.length - 2).should('have.css', 'border-color', colorChanging);
        cy.clock();
        cy.tick(500);

        //перемещение в конец
        cy.get('@circle').eq('@list'.length - 1).should('have.css', 'border-color', colorModified);
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border-color', colorDefault);
        cy.tick(500);
        cy.get('@circle-contaiter').eq('@list'.length - 1).should('contain', 'tail');
    });

    it('should be a correct addition adding an element by index', () => {
        cy.get('@inputValue').type('itsT');
        cy.get('@inputIndex').type('3');
        cy.get('@addByIndex').should('not.be.disabled').contains('Добавить по индексу').click();
        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle');

        cy.get('ul >li')
            .should('have.length', 4)
            .each(($li, index, list) => {
                cy.get($li).find(circle).as('circle');
                cy.get('@circle').eq(0).should('contain', 'itsT');
                if (index < 3) {
                    cy.get('@circle').eq(1).should('have.css', 'border-color', colorChanging);
                }
                if (index === (list.length - 1)) {
                    cy.get('@circle').eq(1).should('have.css', 'border-color', colorModified);
                    cy.get('@circle').eq(0).should('have.css', 'border-color', colorDefault);
                }
            });
    });

    it('should be correct removal of the element from head', () => {
        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle');

        cy.get('@deleteHead').should('not.be.disabled').contains('Удалить из head').click();

        cy.get('@circle').eq(1).should('contain.text', '0');
        cy.get('@circle').eq(1).should('have.css', 'border-color', colorChanging);
        cy.get('@circle').eq(0).should('contain.text', '34')
    });

    it('should be correct removal of the element from tail', () => {
        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle');

        cy.get('@deleteTail').should('not.be.disabled').contains('Удалить из tail').click();

        cy.get('@circle').eq('@list'.length - 1).should('contain.text', '1');
        cy.get('@circle').eq('@list'.length - 1).should('have.css', 'border-color', colorChanging);
        cy.get('@circle').eq(-1).should('contain.text', '8')
    });

    it('should be a correct removal of the element by index', () => {
        cy.get('@inputIndex').type('3');
        cy.get('@deleteByIndex').should('not.be.disabled').contains('Удалить по индексу').click();
        cy.get('@array').find(circleConteiner).as('circle-contaiter');
        cy.get('@circle-contaiter').find(circle).as('circle');

        cy.get('@array')
            .should('have.length', 4)
            .each(($li, index, list) => {
                cy.get($li).find(circle).as('circle');
                if (index < 3) {
                    cy.get('@circle').eq(0).should('have.css', 'border-color', colorChanging);
                }
                if (index === (list.length - 1)) {
                    cy.get('@circle').eq(1).should('have.css', 'border-color', colorChanging);
                    cy.get('@circle').eq(0).should('have.css', 'border-color', colorDefault);
                    cy.get(list).should('have.length', 3);
                }
            });

    });
});