import type { Candidate } from '../types/candidate';

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Andrew Cuomo",
    image: "/images/candidates/andrew-cuomo.webp",
    website: "https://www.andrewcuomo.com/",
    party: "Independent",
    altText: "Black and white portrait of Andrew Cuomo in a suit, hands together, serious expression."
  },
  {
    id: 2,
    name: "Irene Estrada", 
    image: "/images/candidates/irene-estrada.webp",
    website: "https://www.facebook.com/groups/ireneestrada/about",
    party: "Conservative Party",
    altText: "Black and white portrait of Irene Estrada smiling with long curly hair."
  },
    {
    id: 3,
    name: "Joseph Hernandez",
    image: "/images/candidates/joseph-hernandez.webp", 
    website: "https://www.hernandezfornyc.com/",
    party: "Independent",
    altText: "Black and white portrait of Joseph Hernandez smiling with a hat and suit."
  },
  {
    id: 4,
    name: "Zohran Mamdani",
    image: "/images/candidates/zohran-mamdani.webp",
    website: "https://www.zohranfornyc.com/",
    party: "Democrat",
    altText: "Black and white portrait of Zohran Mamdani with a beard, smiling slightly, wearing a light top."
  },
   {
    id: 5,
    name: "Curtis Sliwa",
    image: "/images/candidates/curtis-sliwa.webp",
    website: "https://www.sliwafornyc.com/",
    party: "Republican",
    altText: "Black and white portrait of Curtis Sliwa wearing a beret and checkered jacket."
  }
];

export const candidateIds = candidates.map(c => c.id);

export const candidateById = Object.fromEntries(
  candidates.map(c => [c.id, c] as const)
) as Record<Candidate['id'], Candidate>;

export function getCandidateName(id: Candidate['id']) {
  return candidateById[id]?.name ?? String(id);
}