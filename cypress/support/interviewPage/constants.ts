import { NewInterview } from "@support/interviewPage/createDataTypes";

export const createNewInterviewBody = (interview: NewInterview) => {
  return {
    ...interview,
    interviewTime: interview.interviewTime || null,
    note: interview.note || null,
  };
};
