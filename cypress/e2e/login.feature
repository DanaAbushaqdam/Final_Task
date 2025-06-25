Feature: Login to OrangeHRM system

  Scenario: Admin logs in successfully
    Given I visit the OrangeHRM login page
    When I enter valid credentials
    Then I should be redirected to the dashboard
