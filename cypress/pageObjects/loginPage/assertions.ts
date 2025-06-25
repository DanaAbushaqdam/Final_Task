export function verifyDashboardIsVisible() {
  cy.url().should("include", "/dashboard");
  cy.get("h6").contains("Dashboard").should("be.visible");
}
