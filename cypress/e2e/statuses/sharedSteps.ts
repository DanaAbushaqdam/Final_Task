import { When, Given } from "@badeball/cypress-cucumber-preprocessor";
import { Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import RecruitmentPageAssertions from "@pageObjects/recruitmentPage/assertions";
import { getCandidate } from "@support/candidatePage/dataFakers";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import CandidatePageActions from "@pageObjects/candidatePage/actions";


const recruitmentPageActions = new RecruitmentPageActions();
const recruitmentPageAssertions = new RecruitmentPageAssertions();
const candidatePageActions = new CandidatePageActions();

When("The user clicks the {string} button", (buttonName: string) => {
  if (buttonName === "Schedule Interview") {
    const { getInterview } = require("@support/interviewPage/dataFakers");
    const interview = getInterview();

    cy.contains("button", "Schedule Interview").click();

    // Interview Title
    cy.get("label").contains("Interview Title")
      .parents(".oxd-input-group")
      .find("input")
      .should("be.visible")
      .type(interview.interviewName);

    // Interviewer
    cy.get('input[placeholder="Type for hints..."]').type("Ratul");
    cy.contains("Ratul").click();

    // Date
    cy.get("label").contains("Date")
      .parents(".oxd-input-group")
      .find("input")
      .type(interview.interviewDate)
      .blur();

    // Notes
    cy.get("textarea[placeholder='Type here']").type("Schedule interview notes");

    // Save
    cy.get("button").contains("Save").click();

    cy.get(".orangehrm-recruitment-status", { timeout: 10000 })
      .should("contain.text", "Interview Scheduled");
  } else {
    recruitmentPageActions.clickOnButtonStatus(buttonName);
    cy.wait(1000);
    recruitmentPageActions.clickOnSaveButtonOnStatusPage();
  }
});

Given("A candidate is in Job Offered status", () => {
  const candidate = getCandidate();

  // 1. فتح صفحة إضافة المرشح
  candidatePageActions.openAddCandidatePage();

  // 2. تعبئة بيانات المرشح
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

  // 3. حفظ المرشح
  candidatePageActions.clickOnSaveButton();

  // 4. التحقق من Application Initiated
  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Application Initiated");

  // 5. Shortlist
  recruitmentPageActions.clickOnButtonStatus("Shortlist");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();
  cy.get(".orangehrm-recruitment-status")
    .should("contain.text", "Shortlisted");

  // 6. Schedule Interview
  recruitmentPageActions.clickOnButtonStatus("Schedule Interview");
  cy.get("label").contains("Interview Title")
    .parents(".oxd-input-group")
    .find("input")
    .type("First Interview");

  cy.get('input[placeholder="Type for hints..."]').type("Ratul");
  cy.contains("Ratul").click();

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
  cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Passed");

  // 7. Offer Job
  recruitmentPageActions.clickOnButtonStatus("Offer Job");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();
  cy.get(".orangehrm-recruitment-status").should("contain.text", "Job Offered");

});

Given("A candidate is in Interview Scheduled status", () => {
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
  cy.get(".orangehrm-recruitment-status").should("contain.text", "Application Initiated");

  recruitmentPageActions.clickOnButtonStatus("Shortlist");
  recruitmentPageActions.clickOnSaveButtonOnStatusPage();
  cy.get(".orangehrm-recruitment-status").should("contain.text", "Shortlisted");

  recruitmentPageActions.clickOnButtonStatus("Schedule Interview");

  cy.get("label").contains("Interview Title")
    .parents(".oxd-input-group")
    .find("input")
    .type("Scheduled Interview");

  cy.get('input[placeholder="Type for hints..."]').type("Ratul");
  cy.contains("Ratul").click();

  cy.get("label").contains("Date")
    .parents(".oxd-input-group")
    .find("input")
    .type(candidate.dateOfApplication)
    .blur();

  cy.get("textarea[placeholder='Type here']").type("Interview scheduled notes");
  cy.get("button").contains("Save").click();

  cy.get(".orangehrm-recruitment-status").should("contain.text", "Interview Scheduled");
});


Then("The candidate status should be {string}", (status: string) => {
  recruitmentPageAssertions.checkCandidateStatus(status);
});


Then("The following buttons should be visible:", (table: DataTable) => {
  table.hashes().forEach((row) => {
    recruitmentPageAssertions.checkStatusButtonIsExist(true, row.buttonName);
  });
});

Then("The following buttons should NOT be visible:", (table: DataTable) => {
  table.hashes().forEach((row) => {
    recruitmentPageAssertions.checkStatusButtonIsExist(false, row.buttonName);
  });
});
