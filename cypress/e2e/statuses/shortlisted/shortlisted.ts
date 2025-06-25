import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

import CandidatePageActions from "@pageObjects/candidatePage/actions";
import CandidatePageAssertions from "@pageObjects/candidatePage/assertions";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import RecruitmentPageAssertions from "@pageObjects/recruitmentPage/assertions";
import { getCandidate } from "@support/candidatePage/dataFakers";
//import { NewCandidate } from "@support/candidatePage/createDataTypes";




const candidatePageActions = new CandidatePageActions();
const candidatePageAssertions = new CandidatePageAssertions();
const recruitmentPageActions = new RecruitmentPageActions();
const recruitmentPageAssertions = new RecruitmentPageAssertions();

const candidate = getCandidate();

Given("A candidate is in Application Initiated status", () => {
  candidatePageActions.openAddCandidatePage();
  candidatePageActions.fillCandidateForm({
    firstName: candidate.firstName,
    middleName: candidate.middleName || "QA",
    lastName: candidate.lastName,
    email: candidate.email,
    contactNumber: candidate.contactNumber || "1234567890",
    keywords: "QA, Automation",
    dateOfApplication: candidate.dateOfApplication,
    notes: "Candidate for shortlist",
    consent: true,
    resumePath: "cypress/fixtures/test_resume.pdf",
    vacancyName: "Payroll Admin"

  });
  candidatePageActions.clickOnSaveButton();
  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Application Initiated");
});

// When("The user clicks the \"Shortlist\" button", () => {
//   recruitmentPageActions.clickOnButtonStatus("Shortlist");
//   cy.wait(1000);
//   recruitmentPageActions.clickOnSaveButtonOnStatusPage();
// });

// When("The user clicks the {string} button", (buttonName: string) => {
//   recruitmentPageActions.clickOnButtonStatus(buttonName);
//     cy.wait(1000);
//     recruitmentPageActions.clickOnSaveButtonOnStatusPage();
// });


// Then("The candidate status should be {string}", (status: string) => {
//   recruitmentPageAssertions.checkCandidateStatus(status);
// });


// Then("The following buttons should be visible:", (table: DataTable) => {
//   table.hashes().forEach((row) => {
//     recruitmentPageAssertions.checkStatusButtonIsExist(true, row.buttonName);
//   });
// });

// Then("The following buttons should NOT be visible:", (table: DataTable) => {
//   table.hashes().forEach((row) => {
//     recruitmentPageAssertions.checkStatusButtonIsExist(false, row.buttonName);
//   });
// });
