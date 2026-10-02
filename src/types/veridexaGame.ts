export type VerificationGameStatus =
  | 'INTRO'
  | 'INVESTIGATING'
  | 'CONFLICT_CONFIRMED'
  | 'WRONG_DECISION'
  | 'SUCCESS'
  | 'COMPLETE';

export type FieldVerificationStatus =
  | 'UNEXTRACTED'
  | 'UNVERIFIED'
  | 'VERIFIED'
  | 'CONFLICT'
  | 'FLAGGED';

export interface DocumentSpecificationField {
  id: string;
  name: string;
  category: 'ELECTRICAL' | 'MECHANICAL' | 'ENVIRONMENTAL' | 'MATERIAL';
  documentValue: string;
  normalizedValue: string;
  pageCoordinate: {
    page: number;
    box: string;
  };
  hasConflict: boolean;
  evidenceSource: {
    id: string;
    sourceName: string;
    sourceType: string;
    evidenceValue: string;
    simulatedConfidence: number;
    discrepancyNote: string;
    resolutionExplanation: string;
  };
  status: FieldVerificationStatus;
}

export interface DocumentScenario {
  id: string;
  docCode: string;
  title: string;
  productModel: string;
  revision: string;
  category: string;
  summary: string;
  fields: DocumentSpecificationField[];
}
