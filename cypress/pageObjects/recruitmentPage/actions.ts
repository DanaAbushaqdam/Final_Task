import { NewInterview } from "@support/interviewPage/createDataTypes";

export default class RecruitmentPageActions {
  openApplicationStagePage(id: number) {
    cy.intercept("/web/index.php/api/v2/recruitment/vacancies***").as(
      "vacancies"
    );
    cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
    cy.visit(`/recruitment/addCandidate/${id}`);
    cy.wait(["@vacancies", "@workweek", "@holidays"]);
  }

clickOnButtonStatus(buttonName: string) {
  cy.get(".orangehrm-card-container")
    .find("button")
    .contains(buttonName)
    .should("be.visible") 
    .click({ force: true });
}


scheduleInterview(interviewData: NewInterview) {
  cy.get('input[placeholder="Type here"]').eq(2).type(interviewData.interviewName);
  cy.get('input[placeholder="yyyy-dd-mm"]').type(interviewData.interviewDate);
  cy.get('input[placeholder="hh:mm"]').type(interviewData.interviewTime || "10:00");
  cy.get('textarea[placeholder="Type here"]').type(interviewData.note || "Interview note");
  cy.get('button[type="submit"]').contains("Save").click();
}

filterByStatus(status: string): void {
  cy.get(".oxd-table-filter-area").within(() => {
    cy.get("label").contains("Status")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();

    cy.get(".oxd-select-dropdown")
      .contains(status)
      .should("be.visible")
      .click();
  });

  cy.get("button").contains("Search").click();
}
openCandidateDetailsByName(name: string): void {
  cy.get(".oxd-table-body", { timeout: 10000 }).should("be.visible");

  cy.get(".oxd-table-body .oxd-table-row").contains(name)
    .parents(".oxd-table-row")
    .within(() => {
      cy.get(".bi-eye-fill").click();
    });
}


  getInputByIndex(index: number) {
    return cy
      .get(".orangehrm-card-container")
      .find("form")
      .children()
      .eq(1)
      .find("input")
      .eq(index);
  }

  typeInInterviewTitleInputField(title: string) {
    this.getInputByIndex(0).type(title, { force: true });
    return this;
  }

  typeInInterviewerNameInputField(name: string) {
    this.getInputByIndex(1)
      .type(name, { force: true })
      .get("[role='listbox']")
      .contains(name)
      .click({ force: true });
    return this;
  }

  typeInInterviewDateInputField(date: string) {
    this.getInputByIndex(2).type(date, { force: true });
    return this;
  }
clickOnSaveButtonOnStatusPage() {
  cy.get('button[type="submit"]').contains("Save").click();

  cy.get("body").then(($body) => {
    if ($body.find(".oxd-toast").length > 0) {
      cy.get(".oxd-toast")
        .should("be.visible")
        .and("contain.text", "Successfully Updated");
    }
  });
}



}
