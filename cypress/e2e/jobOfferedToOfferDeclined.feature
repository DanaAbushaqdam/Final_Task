Feature: Offer Declined Candidate

  Scenario: Change status from Job Offered to Offer Declined
    Given A candidate is in Job Offered status
    When The user clicks the "Offer Declined" button
    Then The candidate status should be "Offer Declined"
    And The following buttons should be visible:
      | buttonName |
      | Reject     |
    And The following buttons should NOT be visible:
      | buttonName            |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
      | Schedule Interview    |
