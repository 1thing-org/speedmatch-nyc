export interface MatchCandidate {
    name: string;
    photoUrl: string;
    website: string; //candidate's website
    matchLabel: string; //top match, 2nd match, etc
    party: string;
    alignedIssues: string[]; // "* policies" or "policies"
}
