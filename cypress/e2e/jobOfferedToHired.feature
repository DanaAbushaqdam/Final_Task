Feature: Hired Candidate

  Scenario: Change status from Job Offered to Hired
    Given A candidate is in Job Offered status
    When The user clicks the "Hire" button
    Then The candidate status should be "Hired"
    And The following buttons should NOT be visible:
      | buttonName            |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
      | Reject                |
      | Schedule Interview    |
