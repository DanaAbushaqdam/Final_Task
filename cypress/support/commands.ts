Cypress.Commands.add("login", (username?: string, password?: string) => {
  const user = username ?? "Admin";
  const pass = password ?? "admin123";

  cy.visit("/");

  cy.get('[name="username"]').type(user);
  cy.get('[name="password"]').type(pass);
  cy.contains(" Login ").click();

  cy.intercept("/web/index.php/api/v2/dashboard/employees/time-at-work**").as("time-at-work");
  cy.intercept("/web/index.php/api/v2/dashboard/employees/action-summary").as("action-summary");
  cy.intercept("/web/index.php/api/v2/dashboard/shortcuts").as("shortcuts");
  cy.intercept("/web/index.php/api/v2/buzz/**").as("feed-limit");
  cy.intercept("/web/index.php/api/v2/dashboard/employees/leaves**").as("leavesDate");

  cy.wait([
    "@time-at-work",
    "@action-summary",
    "@shortcuts",
    "@feed-limit",
    "@leavesDate",
  ]);
});
