export interface NewCandidate {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  dateOfApplication: string;
  consentToKeepData: boolean;
  vacancyId: number;
}
