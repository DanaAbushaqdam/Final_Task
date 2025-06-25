Feature: Move candidate from Interview Passed to Job Offered

  Scenario: Change status from Interview Passed to Job Offered
    Given A candidate is in Interview Passed status
    When The user clicks the "Offer Job" button
    Then The candidate status should be "Job Offered"
    And The following buttons should be visible:
      | buttonName     |
      | Reject         |
      | Hire           |
      | Offer Declined |
    And The following buttons should NOT be visible:
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |