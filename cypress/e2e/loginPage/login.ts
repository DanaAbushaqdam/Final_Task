import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { login, visitLoginPage } from "../../pageObjects/loginPage/actions";
import { verifyDashboardIsVisible } from "../../pageObjects/loginPage/assertions";

Given("I visit the OrangeHRM login page", () => {
  visitLoginPage();
});

When("I enter valid credentials", () => {
  login("Admin", "admin123");
});

Then("I should be redirected to the dashboard", () => {
  verifyDashboardIsVisible();
});
