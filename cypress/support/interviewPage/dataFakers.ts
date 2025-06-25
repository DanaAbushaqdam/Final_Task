import { getPrefix } from "@support/shared/utils";
import { NewInterview } from "@support/interviewPage/createDataTypes";
import moment from "moment";

export const getInterview = (prefix: string = getPrefix()): NewInterview => {
  return {
    interviewName: `Cypress Interview ${prefix}`,
    interviewDate: moment().add(7, "days").format("YYYY-MM-DD"),
    interviewerEmpNumbers: [0],
  };
};
