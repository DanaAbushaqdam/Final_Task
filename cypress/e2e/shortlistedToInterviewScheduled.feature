Feature: Move from Shortlisted to Interview Scheduled

  Scenario: Transition candidate from Shortlisted to Interview Scheduled
    Given A candidate is in Shortlisted status
    When The user clicks the "Schedule Interview" button
    Then The candidate status should be "Interview Scheduled"
    And The following buttons should be visible:
      | buttonName         |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Reject             |
    And The following buttons should NOT be visible:
      | buttonName |
      | Shortlist  |
      | Offer Job  |
      | Hire       |
