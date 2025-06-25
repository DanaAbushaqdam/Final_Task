Feature: Mark Interview as Passed

  Scenario: Change status from Interview Scheduled to Interview Passed
    Given A candidate is in Interview Scheduled status
    When The user clicks the "Mark Interview Passed" button
    Then The candidate status should be "Interview Passed"
    And The following buttons should be visible:
      | buttonName  |
      | Offer Job   |
      | Reject      |
    And The following buttons should NOT be visible:
      | buttonName            |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Hire                  |
      | Offer Declined        |
