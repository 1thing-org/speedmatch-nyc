export const PRIORITIES = [
  { id: 'affordability',        label: 'Affordability' },
  { id: 'efficiency', label: 'Government Efficiency' },
  { id: 'equity',         label: 'Equity' },
  { id: 'economic',        label: 'Economic Development' },
  { id: 'health',      label: 'Health & Well-Being' },
  { id: 'antisemitism',      label: 'Antisemitism' },
  { id: 'transport',      label: 'Public Transportation' },
  { id: 'safety',         label: 'Public Safety' },
  { id: 'environment', label: 'Environment & Infrastructure' },
  { id: 'education',      label: 'Education & Childcare' },
] as const;

export type PriorityId = typeof PRIORITIES[number]['id'];

export const PRIORITY_LABEL_BY_ID: Record<PriorityId, string> = Object.freeze(
  Object.fromEntries(PRIORITIES.map(p => [p.id, p.label])) as Record<PriorityId, string>
); 