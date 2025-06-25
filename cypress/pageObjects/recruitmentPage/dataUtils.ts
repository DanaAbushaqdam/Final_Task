import { NewInterview } from "@support/interviewPage/createDataTypes";
export default class RecruitmentDataUtils {
  interviewId: number | undefined;

  private setCandidateVacancyStatus(
    id: number,
    action: {
      status: string;
      process?: string;
      interviewId?: number;
    }
  ) {
    let url = `/api/v2/recruitment/candidates/${id}/${action.status}`;

    if (action.interviewId) {
      url += `/${action.interviewId}`;
    }
    if (action.process) {
      url += `/${action.process}`;
    }

    return cy.request({
      method: "PUT",
      url: url,
    });
  }

  private setCandidateVacancyScheduleStatus(
    id: number,
    interview: NewInterview
  ): Cypress.Chainable<number> {
    return cy
      .request({
        method: "POST",
        url: `/api/v2/recruitment/candidates/${id}/shedule-interview`,
        body: interview,
      })
      .then((res) => {
        return res.body.data.id;
      });
  }

  setCandidateVacancyShortlistStatus(candidateId: number): any {
    return this.setCandidateVacancyStatus(candidateId, {
      status: "shortlist",
    });
  }

  setCandidateVacancyScheduleInterviewStatus(
    candidateId: number,
    interview: NewInterview,
    empNumber: number,
    interviewNumber: string
  ) {
    return this.setCandidateVacancyShortlistStatus(candidateId).then(() => {
      return this.setCandidateVacancyScheduleStatus(candidateId, {
        ...interview,
        interviewerEmpNumbers: [empNumber],
      })
        .then((res) => {
          this.interviewId = res;
          if (interviewNumber === "second") {
            this.setCandidateVacancyStatus(candidateId, {
              status: "interviews",
              process: "pass",
              interviewId: res,
            }).then(() => {
              this.setCandidateVacancyScheduleStatus(candidateId, {
                ...interview,
                interviewerEmpNumbers: [empNumber],
              });
            });
          }
        })
        .then(() => {
          return this.interviewId;
        });
    });
  }

  setCandidateVacancyInterviewStatus(
    interviewNumber: string,
    candidateId: number,
    interview: NewInterview,
    empNumber: number,
    action: string
  ): Cypress.Chainable<number> {
    return this.setCandidateVacancyScheduleInterviewStatus(
      candidateId,
      interview,
      empNumber,
      interviewNumber
    ).then((res: number) => {
      return this.setCandidateVacancyStatus(candidateId, {
        status: "interviews",
        process: action,
        interviewId: res,
      });
    });
  }

  setCandidateVacancyJobOfferStatus(
    interviewNumber: string,
    candidateId: number,
    interview: NewInterview,
    empNumber: number
  ) {
    return this.setCandidateVacancyInterviewStatus(
      interviewNumber,
      candidateId,
      interview,
      empNumber,
      "pass"
    ).then(() => {
      this.setCandidateVacancyStatus(candidateId, {
        status: "job",
        process: "offer",
      });
    });
  }

  setCandidateVacancyDeclinedOfferStatus(
    interviewNumber: string,
    candidateId: number,
    interview: NewInterview,
    empNumber: number
  ) {
    this.setCandidateVacancyJobOfferStatus(
      interviewNumber,
      candidateId,
      interview,
      empNumber
    ).then(() => {
      this.setCandidateVacancyStatus(candidateId, {
        status: "job",
        process: "decline",
      });
    });
  }
}
