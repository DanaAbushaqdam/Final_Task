Feature: Reject Candidate

  Scenario: Change status from Job Offered to Rejected
    Given A candidate is in Job Offered status
    When The user clicks the "Reject" button
    Then The candidate status should be "Rejected"
    And The following buttons should NOT be visible:
      | buttonName            |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
      | Reject                |
      | Schedule Interview    |
