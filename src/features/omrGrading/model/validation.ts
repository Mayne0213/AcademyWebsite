import { z } from 'zod';

export const omrGradingInputSchema = z.object({
  imageFile: z.instanceof(File, { message: '이미지 파일이 필요합니다' }),
  correctAnswers: z.record(z.number(), z.string().regex(/^[1-5]$/, '정답은 1~5 중 하나여야 합니다')),
  questionScores: z.record(z.number(), z.number().min(0, '배점은 0 이상이어야 합니다')),
  questionTypes: z.record(z.number(), z.string().min(1, '문제 유형은 필수입니다'))
});

export type OMRGradingInputValidated = z.infer<typeof omrGradingInputSchema>;

export const validateOMRInput = (input: any): OMRGradingInputValidated => {
  return omrGradingInputSchema.parse(input);
};
