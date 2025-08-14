// Types
export type { 
  OMRGradingResult, 
  OMRResult, 
  OMRGradingInput, 
  OMRProcessingResult 
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
  createTestResultData 
} from './model/omrProcessor';

// Hooks
export { useOMRGrading } from './hooks/useOMRGrading';

// UI Components
export { OmrGradingForm, OmrResDisplay, OmrGradingSummaryModal, OmrProcessingProgressModal } from './ui';
