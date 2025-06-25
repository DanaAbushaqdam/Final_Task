import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

import CandidatePageActions from "@pageObjects/candidatePage/actions";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import RecruitmentPageAssertions from "@pageObjects/recruitmentPage/assertions";
import { getCandidate } from "@support/candidatePage/dataFakers";

const candidatePageActions = new CandidatePageActions();
const recruitmentPageActions = new RecruitmentPageActions();
const recruitmentPageAssertions = new RecruitmentPageAssertions();

// Given("A candidate is in Job Offered status", () => {
//   const candidate = getCandidate();

//   // 1. Add candidate
//   candidatePageActions.openAddCandidatePage();
//   candidatePageActions.fillCandidateForm({
//     firstName: candidate.firstName,
//     middleName: candidate.middleName || "QA",
//     lastName: candidate.lastName,
//     email: candidate.email,
//     contactNumber: candidate.contactNumber || "1234567890",
//     keywords: "QA, Automation",
//     dateOfApplication: candidate.dateOfApplication,
//     notes: "Offer Declined test",
//     consent: true,
//     resumePath: "cypress/fixtures/test_resume.pdf",
//     vacancyName: "Payroll Admin",
//   });
//   candidatePageActions.clickOnSaveButton();
//   cy.get(".orangehrm-recruitment-status").should("contain.text", "Application Initiated");

//   // 2. Go to Shortlisted
//   recruitmentPageActions.clickOnButtonStatus("Shortlist");
//   recruitmentPageActions.clickOnSaveButtonOnStatusPage();
//   cy.get(".orangehrm-recruitment-status").should("contain.text", "Shortlisted");

//   // 3. Schedule Interview
//   recruitmentPageActions.clickOnButtonStatus("Schedule Interview");
//   cy.get("label").contains("Interview Title")
//     .parents(".oxd-input-group")
//     .find("input")
//     .type("Initial Interview");

//   cy.get('input[placeholder="Type for hints..."]').type("Rahul Das");
//   cy.contains("Rahul Das").click();

//   cy.get("label").contains("Date")
//     .parents(".oxd-input-group")
//     .find("input")
//     .type(candidate.dateOfApplication)
//     .blur();

//   cy.get("textarea[placeholder='Type here']").type("Interview notes");
//   cy.get("button").contains("Save").click();
//   cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Scheduled");

//   // 4. Mark Interview Passed
//   recruitmentPageActions.clickOnButtonStatus("Mark Interview Passed");
//   recruitmentPageActions.clickOnSaveButtonOnStatusPage();
//   cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Passed");

//   // 5. Offer Job
//   recruitmentPageActions.clickOnButtonStatus("Offer Job");
//   recruitmentPageActions.clickOnSaveButtonOnStatusPage();
//   cy.get(".orangehrm-recruitment-status").should("contain.text", "Job Offered");
// });

// When("The user clicks the {string} button", (buttonName: string) => {
//   recruitmentPageActions.clickOnButtonStatus(buttonName);
//   recruitmentPageActions.clickOnSaveButtonOnStatusPage();
// });

// Then("The candidate status should be {string}", (expectedStatus: string) => {
//   recruitmentPageAssertions.checkCandidateStatus(expectedStatus);
// });

// Then("The following buttons should be visible:", (table: DataTable) => {
//   table.hashes().forEach(({ buttonName }) => {
//     recruitmentPageAssertions.checkStatusButtonIsExist(true, buttonName);
//   });
// });

// Then("The following buttons should NOT be visible:", (table: DataTable) => {
//   table.hashes().forEach(({ buttonName }) => {
//     recruitmentPageAssertions.checkStatusButtonIsExist(false, buttonName);
//   });
// });
