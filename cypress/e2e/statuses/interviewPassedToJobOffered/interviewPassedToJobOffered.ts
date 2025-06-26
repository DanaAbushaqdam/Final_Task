import {
  Given,
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

Given("A candidate is in Interview Passed status", () => {
  const candidate = getCandidate();

 
  candidatePageActions.openAddCandidatePage();

  candidatePageActions.fillCandidateForm({
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

  candidatePageActions.clickOnSaveButton();

  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Application Initiated");

  recruitmentPageActions.clickOnButtonStatus("Shortlist");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();
  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Shortlisted");

  recruitmentPageActions.clickOnButtonStatus("Schedule Interview");
  cy.get("label").contains("Interview Title")
    .parents(".oxd-input-group")
    .find("input")
    .type("First Interview");

  cy.get('input[placeholder="Type for hints..."]').type("Rahul Das");
  cy.contains("Rahul Das").click();

  cy.get("label").contains("Date")
    .parents(".oxd-input-group")
    .find("input")
    .type(candidate.dateOfApplication)
    .blur();

  cy.get("textarea[placeholder='Type here']")
    .type("Interview notes");

  cy.get("button").contains("Save").click();

  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Interview Scheduled");

  recruitmentPageActions.clickOnButtonStatus("Mark Interview Passed");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();

  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Interview Passed");

});

