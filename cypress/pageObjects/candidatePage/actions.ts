export default class CreateCandidateActions {
  async openAddCandidatePage() {
    cy.intercept("/web/index.php/api/v2/recruitment/vacancies**").as("vacancies");
    cy.intercept("/web/index.php/api/v2/leave/workweek**").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/holidays**").as("holidays");
    cy.visit("/web/index.php/recruitment/addCandidate");
    cy.wait(["@vacancies", "@workweek", "@holidays"]);
  }

  async fillCandidateForm(candidate: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    keywords: string;
    dateOfApplication: string;
    notes: string;
    consent: boolean;
    resumePath: string;
    vacancyName: string;
  }) {
    
    cy.get('input[name="firstName"]').type(candidate.firstName);
    cy.get('input[name="middleName"]').type(candidate.middleName);
    cy.get('input[name="lastName"]').type(candidate.lastName);

    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-dropdown").contains(candidate.vacancyName).click();

    cy.get('input[placeholder="Type here"]').eq(0).type(candidate.email);

    cy.get('input[placeholder="Type here"]').eq(1).type(candidate.contactNumber);

    cy.get('input[type="file"]').selectFile(candidate.resumePath, { force: true });

    cy.get('input[placeholder="Enter comma seperated words..."]').type(candidate.keywords);

cy.get("form").within(() => {
  cy.get("input").each(($input, index) => {
    cy.wrap($input).invoke("attr", "placeholder").then((placeholder) => {
      if (placeholder && placeholder.includes("yyyy")) {
        cy.wrap($input)
          .should("be.visible")
          .scrollIntoView()
          .then(($el) => {
            cy.wrap($el)
              .invoke("val", candidate.dateOfApplication)
              .trigger("input")
              .trigger("change");
          });
      }
    });
  });
});





    cy.get('textarea[placeholder="Type here"]').type(candidate.notes);

    if (candidate.consent) {
      cy.get('input[type="checkbox"]').check({ force: true });
    }
  }

async clickOnSaveButton() {
  cy.get('button[type="submit"]').contains("Save").click();

  cy.get(".oxd-toast").should("be.visible").and("contain.text", "Successfully Saved");
}

}
