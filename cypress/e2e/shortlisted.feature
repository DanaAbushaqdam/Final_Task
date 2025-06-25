Feature: Shortlist Candidate

  Scenario: Change status from Application Initiated to Shortlisted
    Given A candidate is in Application Initiated status
    When The user clicks the "Shortlist" button
    Then The candidate status should be "Shortlisted"
    And The following buttons should be visible:
      | buttonName         |
      | Reject             |
      | Schedule Interview |
    And The following buttons should NOT be visible:
      | buttonName            |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
