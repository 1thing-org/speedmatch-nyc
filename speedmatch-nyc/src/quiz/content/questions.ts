export const fixedQuestions = [
  {
    id: 'Q1',
    title: 'Affordability',
    priorityId: 'affordability',
    prompt: 'How can NYC protect affordability in both housing and everyday living costs?',
    options: [
      { id: '1', label: 'Build more housing for all income levels', body: 'Speed up construction, use public land, and boost overall supply to lower rents.', candidateId: 1 },
      { id: '2', label: 'Unlock and repurpose existing spaces.', body: 'Turn vacant apartments and offices into affordable homes and streamline building approvals.', candidateId: 3 },
      { id: '3', label: 'Freeze rents and tax big corporations.', body: 'Protect tenants, fund affordable housing and grocery access by raising taxes on the wealthy.', candidateId: 4 },
      { id: '4', label: 'Empower communities and reform zoning.', body: 'Restore vacant units, ensure fairness in property taxes, and give neighborhoods more say in development.', candidateId: 5 },
    ],
  },
  {
    id: 'Q2',
    title: 'Economic Development',
    priorityId: 'economic',
    prompt: 'Which strategy should New York prioritize to strengthen its economy?',
    options: [
      { id: '1', label: 'Invest in innovation and jobs.',  body: 'Invest in AI, jobs, and workforce development.', candidateId: 1 },
      { id: '2', label: 'Put workers first.', body: 'Raise wages, crack down on corporate abuse, protect workers.', candidateId: 4 },
      { id: '3', label: 'Support small business and local growth.', body: 'Cut corporate taxes, reduce red tape, support small biz and neighborhoods.', candidateId: 5 },
    ],
  },

  {
    id: 'Q3',
    title: 'Public Safety',
    priorityId: 'safety',
    prompt: 'Which approach do you believe would make New York City safer?',
    options: [
      { id: '1', label: 'Strengthen neighborhood policing.', body: 'Hire more officers, focus on quality-of-life issues, and improve enforcement on everyday safety concerns.', candidateId: 1 },
      { id: '2', label: 'Use technology and coordination.', body: 'Expand the force, partner with federal agencies, and use AI-driven tools to reduce crime and response times.', candidateId: 3 },
      { id: '3', label: 'Invest in prevention and community safety.', body: 'Create mental health and crisis response teams, violence prevention programs, and alternatives to over-policing.', candidateId: 4 },
      { id: '4', label: 'Take a tough-on-crime approach.', body: 'Restore proactive policing units, support prosecutors, tackle gangs and theft, and keep Rikers open to ensure accountability.', candidateId: 5 },
    ],
  },

  {
    id: 'Q4',
    title: 'Health & Well-Being',
    priorityId: 'health',
    prompt: 'What do you think is the most effective way to improve health and well-being?',
    options: [
      {
      id: '1',
      label: 'Expand access and strengthen care systems.',
      body: 'Improve hospitals, mental health services, and public health readiness through stronger partnerships and reforms.',
      candidateId: 1,
    },
    {
      id: '2',
      label: 'Prioritize mental health and recovery.',
      body: 'Focus on treatment, housing, and community support instead of incarceration.',
      candidateId: 3,
    },
    {
      id: '3',
      label: 'Protect public healthcare and equity.',
      body: 'Fund public hospitals, improve reproductive care access, and lower costs by keeping healthcare public.',
      candidateId: 4,
    },
    ],
  },

  {
    id: 'Q5',
    title: 'Public Transportation',
    priorityId: 'transport',
    prompt: 'What’s the best way to improve public transportation?',
    options: [
      {
      id: '1',
      label: 'Make transit more affordable and secure.',
      body: 'Expand discounted fares, add more officers, and improve infrastructure to prevent fare evasion.',
      candidateId: 1,
    },
    {
      id: '2',
      label: 'Use smart technology to ease congestion.',
      body: 'Cut traffic by managing flow with data and modern infrastructure tools.',
      candidateId: 3,
    },
    {
      id: '3',
      label: 'Make buses free and faster.',
      body: 'Expand bus lanes and priority signals to create reliable, fare-free transit for everyone.',
      candidateId: 4,
    },
    {
      id: '4',
      label: 'Restore safety and order in the system.',
      body: 'Expand mental health outreach, strengthen transit policing, and improve station security and oversight.',
      candidateId: 5,
    },
    ],
  },

   {
    id: 'Q6',
    title: 'Education & Childcare',
    priorityId: 'education',
    prompt: 'Which investment would most improve opportunities for children and families?',
    options: [
      {
      id: '1',
      label: 'Expand early education and child care.',
      body: 'Guarantee universal 3-K, smaller classes, and more affordable options for working families.',
      candidateId: 1,
    },
    {
      id: '2',
      label: 'Modernize and innovate schools.',
      body: 'Raise teacher pay, cut red tape, and use technology and AI to prepare students for future jobs.',
      candidateId: 3,
    },
    {
      id: '3',
      label: 'Invest in universal access and equity.',
      body: 'Make childcare and CUNY free, fully fund K-12 schools, and support families from birth onward.',
      candidateId: 4,
    },
    {
      id: '4',
      label: 'Raise standards and improve efficiency.',
      body: 'Expand school choice, reform special education, and link universities with local employers.',
      candidateId: 5,
    },
    ],
  },

  {
    id: 'Q7',
    title: 'Environment & Infrastructure',
    priorityId: 'environment',
    prompt: 'How should New York best prepare for the future?',
    options: [
      {
      id: '1',
      label: 'Clean up and streamline city life.',
      body: 'Reduce open-air drug use, remove excess scaffolding, improve composting, and reform outdoor dining rules.',
      candidateId: 1,
    },
    {
      id: '2',
      label: 'Use data to improve cleanliness.',
      body: 'Optimize trash collection and resource use across all boroughs for a cleaner, more efficient city.',
      candidateId: 3,
    },
    {
      id: '3',
      label: 'Invest in green infrastructure and climate jobs.',
      body: 'Modernize schools with renewable energy, add green spaces, and build climate-ready community hubs.',
      candidateId: 4,
    },
    {
      id: '4',
      label: 'Enhance livability and public spaces.',
      body: 'Improve sanitation, parks, arts, and transit while tackling cleanliness and street maintenance.',
      candidateId: 5,
    },
    ],
  },

  {
    id: 'Q8',
    title: 'Others',
    prompt: 'Some candidates also pledged to focus on Equity, Antisemitism, and Government Accountability. Which should New York prioritize?',
    kind: 'special',
    options: [
      {
      id: '1',
      label: 'Combat antisemitism and hate.',
      body: 'Hold offenders accountable and adopt clear definitions to strengthen citywide protections.',
      candidateId: 1,
      priorityId: 'antisemitism',
    },
    {
      id: '2',
      label: 'Advance equity and inclusion.',
      body: 'Defend immigrant, reproductive, and LGBTQIA+ rights through stronger protections and expanded services.',
      candidateId: 4,
      priorityId: 'equity',
    },
    {
      id: '3',
      label: 'Reform city government.',
      body: 'Cut waste, fight corruption, and make city services more transparent, data-driven, and efficient.',
      candidateId: 5,
      priorityId: 'efficiency',
    },
    ],
  },

  
] as const;

export type FixedQuestion = typeof fixedQuestions[number];
export type QuestionId = FixedQuestion['id'];
export type QuestionOption = FixedQuestion['options'][number];
export type OptionId = QuestionOption['id']; 