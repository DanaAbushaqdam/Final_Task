import CandidatePageActions from "@pageObjects/candidatePage/actions";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import { getCandidate } from "@support/candidatePage/dataFakers";

const candidatePageActions = new CandidatePageActions();
const recruitmentPageActions = new RecruitmentPageActions();

const candidate = getCandidate();


