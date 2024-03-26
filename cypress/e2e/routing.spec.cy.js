describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    })

    it('should open a page default', function () {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('should open a page with a string algorithm', function () {
        cy.get(`[href="/recursion"]`).click();
        cy.location('pathname').should('eq', '/recursion');
        cy.contains("Строка");
    });

    it('should open a page with the algorithm Fibonacci sequence', function () {
        cy.get(`[href="/fibonacci"]`).click();
        cy.location('pathname').should('eq', '/fibonacci')
        cy.contains("Последовательность Фибоначчи");
    });

    it('should open a page with sorting algorithms', function () {
        cy.get(`[href="/sorting"]`).click();
        cy.location('pathname').should('eq', '/sorting');
        cy.contains("Сортировка массива");
    });

    it('should open a page with a stack algorithm', function () {
        cy.get(`[href="/stack"]`).click();
        cy.location('pathname').should('eq', '/stack');
        cy.contains("Стек");
    });

    it('should open a page with a queue algorithm', function () {
        cy.get(`[href="/queue"]`).click();
        cy.location('pathname').should('eq', '/queue');
        cy.contains("Очередь");
    });

    it('should open a page with a list algorithm', function () {
        cy.get(`[href="/list"]`).click();
        cy.location('pathname').should('eq', '/list');
        cy.contains("Связный список");
    });
}); 