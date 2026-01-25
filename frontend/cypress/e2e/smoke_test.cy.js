/* eslint-disable no-undef */
describe('Smoke Tests - Navigation', () => {
  const pages = [
    { name: 'Dashboard', path: '/', text: 'Top News' },
    {
      name: 'Calculator',
      path: '/calculator',
      text: 'Position Size Calculator',
    },
    { name: 'News', path: '/news', text: 'Top News' },
  ];

  pages.forEach((page) => {
    it(`should load the ${page.name} page without crashing`, () => {
      cy.visit(page.path);
      cy.contains(page.text).should('be.visible');
    });
  });
});
