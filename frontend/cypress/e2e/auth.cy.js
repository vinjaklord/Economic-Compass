/* eslint-disable no-undef */
import { Login } from '../support/pages/Login'; // Assuming you set up the Page Object from my previous message

describe('Real Backend Authentication', () => {
  // We create a unique user for every test run
  const timestamp = Date.now();
  const testUser = {
    username: `user_${timestamp}`,
    email: `test_${timestamp}@example.com`,
    password: 'password123',
    confirmPassword: 'password123',
    firstName: 'Cypress',
    lastName: 'RealTest',
  };

  it('should create a new user via API and then login via UI', () => {
    
    cy.request('POST', `${Cypress.env('apiUrl')}/signup`, testUser).then(
      (response) => {
        expect(response.status).to.eq(200); // Verify Backend is alive
      },
    );


    cy.visit('/login');

    cy.get('input[name="username"]').type(testUser.username);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').contains('Login').click();


    cy.url().should('eq', Cypress.config('baseUrl') + '/');
    cy.expandSidebar();


    cy.get('[data-testid="nav-link-Log Out"]')
      .contains('Log Out')
      .should('be.visible');
  });
});
