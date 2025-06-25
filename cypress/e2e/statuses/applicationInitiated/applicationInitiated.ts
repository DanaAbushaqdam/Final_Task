import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import CandidatePageActions from "@pageObjects/candidatePage/actions";
import CandidatePageAssertions from "@pageObjects/candidatePage/assertions";
import RecruitmentPageAssertions from "@pageObjects/recruitmentPage/assertions";
import { getCandidate } from "@support/candidatePage/dataFakers";

const candidatePageActions = new CandidatePageActions();
const candidatePageAssertions = new CandidatePageAssertions();
const recruitmentPageAssertions = new RecruitmentPageAssertions();
const candidate = getCandidate();

before(() => {
  cy.login(); // تسجيل الدخول مرة واحدة قبل السيناريوهات
});

Given("User navigates to Add Candidate page", () => {
  candidatePageActions.openAddCandidatePage();
});

When("User fills in the candidate form", () => {
  candidatePageActions.fillCandidateForm({
    firstName: candidate.firstName,
    middleName: candidate.middleName || "TestMiddle",
    lastName: candidate.lastName,
    email: candidate.email,
    contactNumber: candidate.contactNumber || "1234567890",
    keywords: "Cypress, Automation",
    dateOfApplication: candidate.dateOfApplication,
    notes: "Candidate added for testing status flow.",
    consent: true,
    resumePath: "cypress/fixtures/test_resume.pdf",
    vacancyName: "Payroll Administrator",
  });
});

When("Clicks the Save button", () => {
  candidatePageActions.clickOnSaveButton();
});

Then("User Should Navigate To Recruitment Page", () => {
  candidatePageAssertions.checkCandidateDetailsPageIsOpenWithStatus("Application Initiated");
});


Then("The Candidate should Move to the {string} Status", (status: string) => {
  recruitmentPageAssertions.checkCandidateStatus(status);
});

Then(
  "The User {string} See the Following Buttons:",
  (shouldOrNot: string, table: DataTable) => {
    const expected = shouldOrNot === "Should";
    table.hashes().forEach((row) => {
      recruitmentPageAssertions.checkStatusButtonIsExist(expected, row.buttonName);
    });
  }
);
