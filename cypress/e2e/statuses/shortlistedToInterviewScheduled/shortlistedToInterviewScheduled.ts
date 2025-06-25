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
import { getInterview } from "@support/interviewPage/dataFakers";

const candidatePageActions = new CandidatePageActions();
const candidatePageAssertions = new CandidatePageAssertions();
const recruitmentPageActions = new RecruitmentPageActions();
const recruitmentPageAssertions = new RecruitmentPageAssertions();

const candidate = getCandidate();
const interview = getInterview();

Given("A candidate is in Shortlisted status", () => {
  candidatePageActions.openAddCandidatePage();
  candidatePageActions.fillCandidateForm({
    firstName: candidate.firstName,
    middleName: candidate.middleName || "QA",
    lastName: candidate.lastName,
    email: candidate.email,
    contactNumber: candidate.contactNumber || "1234567890",
    keywords: "QA, Automation",
    dateOfApplication: candidate.dateOfApplication,
    notes: "Candidate to be interviewed",
    consent: true,
    resumePath: "cypress/fixtures/test_resume.pdf",
    vacancyName: "Payroll Admin"
  });
  candidatePageActions.clickOnSaveButton();

  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Application Initiated");

  recruitmentPageActions.clickOnButtonStatus("Shortlist");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();

  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Shortlisted");
});

