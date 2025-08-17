// Types
export type { 
  OMRGradingResult, 
  OMRResult, 
  OMRGradingInput, 
  OMRProcessingResult,
  OMRDatabaseSaveInput,
  OMRDatabaseSaveResult
} from './model/types';

// Validation
export { 
  omrGradingInputSchema, 
  validateOMRInput,
  type OMRGradingInputValidated 
} from './model/validation';

// Processing
export { 
  processOMR, 
  createTestResultData,
  findStudentByPhone,
  saveOMRResultsToDatabase
} from './model/omrProcessor';

// Hooks
export { useOMRGrading } from './hooks/useOMRGrading';

// UI Components
export { OmrGradingForm, OmrResDisplay, OmrGradingSummaryModal, OmrProcessingProgressModal } from './ui';
