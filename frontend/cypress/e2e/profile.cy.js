/* eslint-disable no-undef */
describe('User Profile & Preferences', () => {
  const testUser = {
    username: `tester_${Date.now()}`,
    password: 'Password123!',
    email: `test_${Date.now()}@example.com`,
    firstName: 'Cypress',
    lastName: 'Tester',
  };

  before(() => {
    cy.request('DELETE', 'http://localhost:3000/test/cleanup');

    cy.request('POST', `${Cypress.env('apiUrl')}/signup`, {
      ...testUser,
      confirmPassword: testUser.password,
    });
  });

  beforeEach(() => {

    cy.visit('/login');
    cy.get('input[name="username"]').type(testUser.username);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').contains('Login').click();

    cy.expandSidebar();

    cy.get('[data-testid="nav-link-Edit Profile & Preferences"]')
      .contains('Edit Profile & Preferences')
      .click();
  });

  it('updates personal information and reflects changes in the UI', () => {
    const newName = 'UpdatedName';


    cy.get('input[name="firstName"]').clear().type(newName);
    cy.get('button').contains('Save Changes').click();


    cy.reload();
    cy.get('input[name="firstName"]').should('have.value', newName);
  });

  it('saves multiple checkbox selections for Impact Levels', () => {


    cy.get('input[type="checkbox"][value="High"]').check().should('be.checked');
    cy.get('input[type="checkbox"][value="Holiday"]')
      .check()
      .should('be.checked');

    cy.get('button').contains('Save Changes').click();


    cy.intercept('PATCH', '**/members/*').as('updateProfile');
    cy.get('button').contains('Save Changes').click();

    cy.wait('@updateProfile').then((xhr) => {

      expect(xhr.request.body.impact).to.contain('High');
      expect(xhr.request.body.impact).to.contain('Holiday');
    });
  });
});
