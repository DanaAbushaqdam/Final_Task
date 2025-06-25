
export default class CandidatePageAssertions {
  checkRedirectToCandidatesList() {
    cy.url().should("include", "/recruitment/viewCandidates");
    cy.get("h5").should("contain.text", "Candidates"); 
  }

checkAddCandidatePageIsOpen() {

  cy.url().should("include", "/recruitment/viewCandidates");
  cy.get("h5").should("contain.text", "Candidates");
}
checkCandidateDetailsPageIsOpenWithStatus(status: string) {
  cy.url().should("include", "/recruitment/addCandidate/");
  cy.get(".orangehrm-recruitment-status").should("contain.text", status);
}

}
