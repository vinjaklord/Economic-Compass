/* eslint-disable no-undef */
describe('News Feed Integration', () => {
  beforeEach(() => {
    // Bypass login for news tests to keep them fast
    // We just visit the page
    cy.visit('/news');
  });

  it('displays news items from the backend database', () => {
    // Check if the table exists (News.jsx)
    cy.get('table.news-table').should('be.visible');

    // Check if at least one news item is loaded
    // Your backend 'news' route returns data[0].feed
    cy.get('table.news-table tbody tr').should('have.length.at.least', 1);

    // Verify a news item has a clickable link
    cy.get('table.news-table tbody tr')
      .first()
      .find('a')
      .should('have.attr', 'href')
      .and('include', 'http');
  });

  it('handles API errors gracefully', () => {
    // 1. Be specific: match the API URL (usually port 3000), not the frontend (port 5173)
    cy.intercept('GET', 'http://localhost:3000/news', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('newsError');

    // 2. Visit the frontend page
    cy.visit('/news');

    // 3. Wait for the API call to fail
    cy.wait('@newsError');

    // 4. Verify the UI handles it
    cy.contains('Failed to fetch news. Please try again later.').should(
      'be.visible',
    );
  });
});
