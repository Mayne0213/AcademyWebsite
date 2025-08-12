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

// UI Components
export { OMRGradingForm, OMRResultDisplay } from './ui';
