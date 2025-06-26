import { NewCandidate } from "@support/candidatePage/createDataTypes";
import { CandidateResponseData } from "@support/candidatePage/types";
import CreateCandidateActions from "@pageObjects/candidatePage/actions";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import { getCandidate } from "@support/candidatePage/dataFakers"; 

export default class CandidateDataUtils {
  private candidateActions = new CreateCandidateActions();
  private recruitmentActions = new RecruitmentPageActions();

  createNewCandidate(candidate: NewCandidate, vacancyId: number): Cypress.Chainable<number> {
    return this.getCandidateByCandidateFirstName(candidate.firstName)
      .then((data) => {
        if (data) {
          this.deleteCandidateByCandidateFirstName(data.firstName);
        }
        return cy.request({
          method: "POST",
          url: "/api/v2/recruitment/candidates",
          body: { ...candidate, vacancyId: vacancyId },
        });
      })
      .then((res) => res.body.data.id);
  }

  getCandidateByCandidateFirstName(name: string): Cypress.Chainable<CandidateResponseData> {
    return cy
      .request(`/api/v2/recruitment/candidates?candidateName=${name}`)
      .then((res) => res.body.data);
  }

  deleteCandidateByCandidateFirstName(name: string) {
    this.getCandidateByCandidateFirstName(name).then((res) => {
      if (Array.isArray(res) && res.length !== 0) {
        cy.request({
          method: "DELETE",
          url: "/api/v2/recruitment/candidates",
          body: { ids: [res[0].id] },
        });
      }
    });
  }


  prepareCandidateInInterviewPassed(): void {
    const candidate = getCandidate();

    this.candidateActions.openAddCandidatePage();
    this.candidateActions.fillCandidateForm({
      firstName: candidate.firstName,
      middleName: candidate.middleName || "QA",
      lastName: candidate.lastName,
      email: candidate.email,
      contactNumber: candidate.contactNumber || "1234567890",
      keywords: "QA, Automation",
      dateOfApplication: candidate.dateOfApplication,
      notes: "Candidate for interview",
      consent: true,
      resumePath: "cypress/fixtures/test_resume.pdf",
      vacancyName: "Payroll Admin"
    });
    this.candidateActions.clickOnSaveButton();

    cy.get(".orangehrm-recruitment-status").should("contain.text", "Application Initiated");

    this.recruitmentActions.clickOnButtonStatus("Shortlist");
    this.recruitmentActions.clickOnSaveButtonOnStatusPage();
    cy.get(".orangehrm-recruitment-status").should("contain.text", "Shortlisted");

    this.recruitmentActions.clickOnButtonStatus("Schedule Interview");

    cy.get("label").contains("Interview Title")
      .parents(".oxd-input-group")
      .find("input")
      .type("Initial Interview");

    cy.get('input[placeholder="Type for hints..."]').type("Rahul Das");
    cy.contains("Rahul Das").click();

    cy.get("label").contains("Date")
      .parents(".oxd-input-group")
      .find("input")
      .type(candidate.dateOfApplication)
      .blur();

    cy.get("textarea[placeholder='Type here']").type("Interview scheduled notes");
    cy.get("button").contains("Save").click();

    cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Scheduled");

    this.recruitmentActions.clickOnButtonStatus("Mark Interview Passed");
    this.recruitmentActions.clickOnSaveButtonOnStatusPage();

    cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Passed");
  }
}
