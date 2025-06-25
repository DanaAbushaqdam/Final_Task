export function visitLoginPage() {
  cy.visit("/web/index.php/auth/login");
}

export function login(username: string, password: string) {
  cy.login(username, password); 
}
