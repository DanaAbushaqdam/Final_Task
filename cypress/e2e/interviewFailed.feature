Feature: Mark Interview as Failed

  Scenario: Change status from Interview Scheduled to Interview Failed
    Given A candidate is in Interview Scheduled status
    When The user clicks the "Mark Interview Failed" button
    Then The candidate status should be "Interview Failed"
    And The following buttons should be visible:
      | buttonName  |
      | Reject      |
    And The following buttons should NOT be visible:
      | buttonName  |
      | Shortlist   |
      | Schedule Interview |
      | Offer Job   |
      | Hire        |
      | Offer Declined |
