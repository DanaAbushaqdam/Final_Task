export default class RecruitmentPageAssertions {
  checkCandidateStatus(status: string) {
    cy.get(".orangehrm-recruitment-status").should("contain", status);
  }

  checkStatusButtonIsExist(isExist: boolean, buttonName: string) {
    cy.contains("button", buttonName).should(isExist ? "exist" : "not.exist");
  }

  checkStatusPageIsOpen(text: string, isExist = true) {
    cy.contains(".orangehrm-card-container", text).should(
      isExist ? "exist" : "not.exist"
    );
  }
}

