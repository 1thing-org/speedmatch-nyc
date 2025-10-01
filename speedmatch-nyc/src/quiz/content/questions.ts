export const fixedQuestions = [
  {
    id: 'Q1',
    title: 'Affordability',
    priorityId: 'affordability',
    prompt: 'How can NYC protect affordability in both housing and everyday living costs?',
    options: [
      { id: '1', label: 'Build more housing across all income levels. Leverage public land for housing development. Improve the quality of life in NYCHA Housing. Protect renters and keep families in their homes.', candidateId: 1 },
      { id: '2', label: 'Boost NYC’s housing supply by adding 132,000 units in two years through unlocking vacant rent-stabilized apartments, converting unused offices into affordable housing, and expediting new construction to raise vacancy rates and reduce rents.', candidateId: 3 },
      { id: '3', label: 'Freeze rents, expand affordable union-built housing, crack down on negligent landlords, protect homeowners from deed theft and unfair taxes, create city-owned nonprofit grocery stores to lower food costs, and fund these measures by taxing corporations and the wealthy while reforming procurement and strengthening tax enforcement.', candidateId: 4 },
      { id: '4', label: 'Prioritize affordable housing and fairness by restoring vacant units, expanding options for seniors and families, reform property taxes, convert commercial spaces, curb luxury displacement, and give communities more control over zoning.', candidateId: 5 },
    ],
  },
  {
    id: 'Q2',
    title: 'Economic Development',
    priorityId: 'economic',
    prompt: 'Which strategy should New York prioritize to strengthen its economy?',
    options: [
      { id: '1', label: 'Boost incomes and economic growth by cutting taxes for working families, creating jobs with training and protections, supporting at-risk young men, investing in infrastructure, and making NYC a leader in AI through its hospitals and tech sector.', candidateId: 1 },
      { id: '2', label: 'Protect working-class New Yorkers by banning corporate abuses, raise the minimum wage to $30/hour with cost-of-living increases, strengthen protections for delivery workers, and help small businesses thrive through reduced fines, streamlined permits, expanded support, and a dedicated Mom-and-Pop Czar.', candidateId: 4 },
      { id: '3', label: 'Cut corporate taxes, reduce fees and red tape, and redirect incentives to small businesses while revitalizing outer-borough districts with cultural and commercial investment to spread opportunity citywide.', candidateId: 5 },
    ],
  },

  {
    id: 'Q3',
    title: 'Public Safety',
    priorityId: 'safety',
    prompt: 'Which approach do you believe would make New York City safer?',
    options: [
      { id: '1', label: 'Increase the size of the NYPD, Offer bonuses and incentives to active and recently retired police officers, Deploy police officers based on data, Crack down on nuisance and quality of life crimes, Increase accountability for e-bike and moped violations.', candidateId: 1 },
      { id: '2', label: 'Boost safety with 10,000 new officers, federal crime-fighting partnerships, AI-driven 911 tech, and a citywide platform to cut crime and response times.', candidateId: 3 },
      { id: '3', label: 'Establish a Department of Community Safety to shift from over-reliance on police toward preventive measures, expand mental health and crisis response services, gun violence prevention, and hate violence prevention programs to ensure safer streets, subways, and communities.', candidateId: 4 },
      { id: '4', label: 'Strengthen the NYPD with more officers, fair pay, and restored proactive units, fix broken laws and oversight, support prosecutors, and crack down on gangs, drugs, theft, and scams to restore safety citywide. Keep Rikers Island Jail open, restore order, protect officers, and improve jail safety.', candidateId: 5 },
    ],
  },

  {
    id: 'Q4',
    title: 'Health & Well-Being',
    priorityId: 'health',
    prompt: 'What do you think is the most effective way to improve health and well-being?',
    options: [
      { id: '1', label: 'Expand access to physical, behavioral, and specialty care, strengthen safety-net hospitals, reduce disparities, restructure psychiatric capacity with enforced commitment laws, and improve public health and homelessness outcomes through community partnerships, school and housing-based services, and stronger pandemic preparedness.', candidateId: 1 },
      { id: '2', label: 'Create compassionate, recovery-focused mental health care by building transitional units with housing pathways, expanding long-term care partnerships, and prioritizing community support over incarceration.', candidateId: 3 },
      { id: '3', label: 'Create outreach workers to help New Yorkers navigate insurance and reproductive care, increase funding for public hospitals to prevent closures, strengthen preparedness for future health emergencies, and partner with unions to reject privatized Medicare schemes and lower costs across the system.', candidateId: 4 },
    ],
  },

  {
    id: 'Q5',
    title: 'Public Transportation',
    priorityId: 'transport',
    prompt: 'What’s the best way to improve public transportation?',
    options: [
      { id: '1', label: 'Expand discounted access to buses and significantly increase Fair Fares programs for which they are eligible. Increase permanent presence of NYPD and MTA officers. Prevent unlawful entry through better infrastructure.', candidateId: 1 },
      { id: '2', label: 'Ease traffic congestion by 25% and improve traffic flow through data-driven traffic management and smart infrastructure monitoring.', candidateId: 3 },
      { id: '3', label: 'Make all city buses free and faster by expanding priority lanes, bus signals, and loading zones, building on his successful fare-free pilot to ensure reliable, safe, and accessible transit for all New Yorkers.', candidateId: 4 },
      { id: '4', label: 'End the subway homeless and crime crisis by expanding mental health outreach, reinstating NYPD homeless units, strengthening transit policing with patrols and a crime task force, enforcing fare laws, improving station safety and surveillance, and auditing nonprofits to ensure effective care and accountability.', candidateId: 5 },
    ],
  },

   {
    id: 'Q6',
    title: 'Education & Childcare',
    priorityId: 'education',
    prompt: 'Which investment would most improve opportunities for children and families?',
    options: [
      { id: '1', label: 'Reduce class sizes, expand 3-K and after-school programs, strengthen career and technical education (CTE), address chronic absenteeism. Expand access to affordable healthcare. Assist New Yorkers who are denied coverage by their insurance plan. Guarantee universal 3-K and increase childcare options.', candidateId: 1 },
      { id: '2', label: 'Reform education by boosting teacher pay, cutting bureaucracy, expanding school choice, ensuring educator quality, and integrating AI to modernize learning and job readiness.', candidateId: 3 },
      { id: '3', label: 'Provide free childcare for all children under 5, baby baskets with essential supplies for every newborn, fully funded and equitable K-12 schools with safer streets and strong supports, and major investment in CUNY to make it tuition-free and accessible.', candidateId: 4 },
      { id: '4', label: 'Reform NYC schools by cutting waste, raising standards, expanding choice, improving special education, and funding classrooms directly, while creating university-employer pipelines and offering tax credits to companies that hire and retain local graduates.', candidateId: 5 },
    ],
  },

  {
    id: 'Q7',
    title: 'Environment & Infrastructure',
    priorityId: 'environment',
    prompt: 'How should New York best prepare for the future?',
    options: [
      { id: '1', label: 'End open air drug markets and use. Curb the overuse of scaffolding. Improve curbside composting. Reform the outdoor dining permit process.', candidateId: 1 },
      { id: '2', label: 'Improve trash collection and neighborhood cleanliness by using real-time data to optimize collection routes and resource allocation in every borough.', candidateId: 3 },
      { id: '3', label: 'Modernize 500 schools with renewable energy, turn 500 asphalt yards into green spaces, create 15,000 union jobs, build 50 resilience hubs to boost climate readiness and community safety, and guarantee 0.5% of NYC’s budget for libraries to end cuts and ensure thriving, well-staffed community hubs.', candidateId: 4 },
      { id: '4', label: 'Improve livability by investing in sanitation, public spaces, arts, nightlife, transit, parks, and broadband while tackling cleanliness through faster 311 response, rat control, expanded street cleaning, and beautification.', candidateId: 5 },
    ],
  },

  {
    id: 'Q8',
    title: 'Others',
    prompt: 'Some candidates also pledged to focus on Equity, Antisemitism, and Government Accountability. Which should New York prioritize?',
    kind: 'special',
    options: [
      { id: '1', label: 'Ensure that those who threaten, harass, or destroy property in the name of antisemitism are held accountable. Adopt the International Holocaust Remembrance Association (IHRA) definition of antisemitism.', candidateId: 1, priorityId: 'antisemitism' },
      { id: '2', label: 'Strengthen sanctuary city policies to defend immigrants, safeguard reproductive and worker rights, and ensure full protections for LGBTQIA+ New Yorkers by expanding gender-affirming care, creating an Office of LGBTQIA+ Affairs, and combating discrimination.', candidateId: 4, priorityId: 'equity' },
      { id: '3', label: 'Overhaul city government by cutting waste, ending corruption, auditing agencies, and modernizing operations with tech-savvy, data-driven, transparent, and efficient services.', candidateId: 5, priorityId: 'efficiency' },
    ],
  },

  
] as const;

export type FixedQuestion = typeof fixedQuestions[number];
export type QuestionId = FixedQuestion['id'];
export type QuestionOption = FixedQuestion['options'][number];
export type OptionId = QuestionOption['id']; 