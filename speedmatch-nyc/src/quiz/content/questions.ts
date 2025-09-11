import type { CandidateId } from '../scoring/candidates';

export const FixedQuestions = [
  {
    id: 'Q1',
    title: 'Government Accountability',
    prompt: 'How Should NYC Improve Government Accountability?',
    options: [
      { id: '1', label: 'xx', candidateIds: [1, 3] as CandidateId[] },
      { id: '2', label: 'xxxx',         candidateIds: [2] },
    ],
  },
  {
    id: 'Q2',
    title: 'Public Safety',
    prompt: 'How Should NYC Improve Public Safety?',
    options: [
      { id: '1', label: 'Focused on stopping drug trafficking and helping people recover rather than traditional policing.', candidateIds: [] },
      { id: '2', label: 'Hire 5,000+ NYPD Officers + Pinpoint high-crime locations and repeat offenders', candidateIds: [] },
      { id: '3', label: 'Reform NYPD to focus on gun violence/hate crimes', candidateIds: [] },
      { id: '4', label: 'Hire and deploy 7,000 NYPD officers to subways + Install emergency call boxes in all 472 stations + Harsher penalties for repeat offenders', candidateIds: [] },
      { id: '5', label: 'Hire 3,000 officers + Deploy one on every subway train', candidateIds: [] },
      { id: '6', label: 'Skip this question (No impact on scores)', candidateIds: [] },
    ],
  },
] as const;

export type FixedQuestion = typeof FixedQuestions[number];
export type QuestionId = FixedQuestion['id'];
export type QuestionOption = FixedQuestion['options'][number];
export type OptionId = QuestionOption['id']; 