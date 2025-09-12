export const PRIORITIES = [
  { id: 'economy',        label: 'Economy' },
  { id: 'accountability', label: 'Government Accountability' },
  { id: 'safety',         label: 'Safety' },
  { id: 'housing',        label: 'Affordable Housing' },
  { id: 'education',      label: 'Education' },
  { id: 'childcare',      label: 'Childcare' },
  { id: 'transport',      label: 'Public Transportation' },
  { id: 'rights',         label: 'Human Rights' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'prek',           label: 'Pre-K' },
] as const;

export type PriorityId = typeof PRIORITIES[number]['id'];

export const PRIORITY_LABEL_BY_ID: Record<PriorityId, string> = Object.freeze(
  Object.fromEntries(PRIORITIES.map(p => [p.id, p.label])) as Record<PriorityId, string>
); 