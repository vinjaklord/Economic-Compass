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
    // 1. SEEDING: Create the user directly in the backend using cy.request
    // This bypasses the UI registration form to save time and isolate the Login test.
    // We are testing the Login UI, not the Signup UI here.
    cy.request('POST', `${Cypress.env('apiUrl')}/signup`, testUser).then(
      (response) => {
        expect(response.status).to.eq(200); // Verify Backend is alive
      },
    );

    // 2. TEST: Now use the UI to log in
    cy.visit('/login');

    cy.get('input[name="username"]').type(testUser.username);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').contains('Login').click();

    // 3. ASSERT: We should actually be logged in
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
    cy.expandSidebar();

    // Check if the Sidebar shows the logout button (proof of auth)
    cy.get('[data-testid="nav-link-Log Out"]')
      .contains('Log Out')
      .should('be.visible');
  });
});
