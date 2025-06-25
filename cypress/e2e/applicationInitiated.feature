Feature: Application Initiated Candidate Status

  Scenario: Add candidate and verify status is "Application Initiated"
    Given User navigates to Add Candidate page
    When User fills in the candidate form
    And Clicks the Save button
    Then User Should Navigate To Recruitment Page
    And The Candidate should Move to the "Application Initiated" Status
    And The User "Should" See the Following Buttons:
      | buttonName |
      | Shortlist  |
      | Reject     |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
