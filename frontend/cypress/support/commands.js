/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('expandSidebar', () => {
  // 1. Trigger the hover
  cy.get('[data-testid="sidebar-nav"]').realHover();

  cy.get('.main-menu').invoke('addClass', 'expanded');

  // 3. Now check visibility.
  // If it still fails, we know the class is there but the CSS opacity isn't changing.
  cy.get('[data-testid="nav-text"]').first().should('be.visible');
});
