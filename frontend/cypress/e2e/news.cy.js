/* eslint-disable no-undef */
describe('News Feed Integration', () => {
  beforeEach(() => {
    // Bypass login for news tests to keep them fast
    // We just visit the page
    cy.visit('/news');
  });

  it('displays news items from the backend database', () => {

    cy.get('table.news-table').should('be.visible');



    cy.get('table.news-table tbody tr').should('have.length.at.least', 1);


    cy.get('table.news-table tbody tr')
      .first()
      .find('a')
      .should('have.attr', 'href')
      .and('include', 'http');
  });

  it('handles API errors gracefully', () => {

    cy.intercept('GET', 'http://localhost:3000/news', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('newsError');

    cy.visit('/news');

    cy.wait('@newsError');

    cy.contains('Failed to fetch news. Please try again later.').should(
      'be.visible',
    );
  });
});
