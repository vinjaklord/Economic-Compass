/* eslint-disable no-undef */
class LoginPage {
  // Selectors (Getters)
  get usernameInput() {
    return cy.get('input[name="username"]');
  }
  get passwordInput() {
    return cy.get('input[name="password"]');
  }
  get loginButton() {
    return cy.get('button').contains('Login');
  }
  get toastAlert() {
    return cy.get('.MuiAlert-message');
  } // Assuming MUI Alert class

  // Actions
  visit() {
    cy.visit('/login');
  }

  fillUsername(name) {
    this.usernameInput.clear().type(name);
  }

  fillPassword(pass) {
    this.passwordInput.clear().type(pass);
  }

  submit() {
    this.loginButton.click();
  }

  // Workflow
  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }
}

export default new LoginPage();
