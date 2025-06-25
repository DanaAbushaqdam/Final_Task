import moment from "moment";
import { NewCandidate } from "./createDataTypes";

export const getCandidate = (): NewCandidate => {
  const timestamp = Date.now();
  return {
    firstName: "TestFirst" + timestamp,
    lastName: "TestLast" + timestamp,
    email: `test${timestamp}@test.com`,
    dateOfApplication: moment().format("YYYY-MM-DD"),
    consentToKeepData: false,
    vacancyId: 1,
  };
};

