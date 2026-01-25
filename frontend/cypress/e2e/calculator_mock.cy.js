/* eslint-disable no-undef */
describe('Calculator (Mocked Backend)', () => {
  beforeEach(() => {
    // We fake the user login so we don't need to hit the database
    cy.fixture('user.json').then((user) => {
      window.localStorage.setItem('lh_member', JSON.stringify(user));
    });

    // We INTERCEPT the request to your backend.
    // Even though your backend exists, we stop the request at the browser
    // and return an instant answer.
    cy.intercept('POST', '**/position-size', {
      statusCode: 200,
      body: { lotSize: 2.55 }, // Deterministic result
    }).as('calcRequest');

    cy.visit('/calculator/position-size');
  });

  it('should calculate swiftly without waiting for external APIs', () => {
    cy.get('input[name="accountSize"]').type('10000');
    cy.get('input[name="riskRatio"]').type('2');
    cy.get('input[name="stopLoss"]').type('50');

    cy.get('button').contains('Calculate').click();

    cy.wait('@calcRequest');
    cy.contains('2.55').should('be.visible');
  });
});
