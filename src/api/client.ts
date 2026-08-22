import type { Keyword, Lead, StatusResponse } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function getStatus(): Promise<StatusResponse> {
  const res = await fetch('/status');
  if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
  return res.json();
}



const mockLeads: Lead[] = [
  {
    _id: 'lead-1',
    platform: 'facebook',
    profileId: 'fb-jane-doe',
    profileUrl: 'https://facebook.com/jane.doe.insurance',
    fullName: 'Jane Doe',
    jobTitle: 'Insurance Agent',
    companyName: 'Doe Insurance Group',
    location: 'Tampa, FL',
    email: 'jane.doe@example.com',
    phone: '813-555-0142',
    triggerContext:
      '"Anyone have a reliable vendor for final expense leads? Looking to scale past referrals."',
    sourceUrl: 'https://facebook.com/groups/insuranceagents/posts/9821',
    intentScore: 82,
    intentReasoning: 'Actively asking about final expense lead vendors — high buying intent.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    _id: 'lead-2',
    platform: 'facebook',
    profileId: 'fb-john-smith-cpa',
    profileUrl: 'https://facebook.com/john.smith.cpa',
    fullName: 'John Smith',
    jobTitle: 'CPA',
    companyName: undefined,
    location: 'Austin, TX',
    email: undefined,
    phone: undefined,
    triggerContext: '"I\'m a CPA and mostly just lurk here, but great group."',
    sourceUrl: 'https://facebook.com/groups/insuranceagents/posts/9755',
    intentScore: 12,
    intentReasoning: 'Mentioned CPA in passing while introducing themselves — no buying signal.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    _id: 'lead-3',
    platform: 'facebook',
    profileId: 'fb-maria-lopez',
    profileUrl: 'https://facebook.com/maria.lopez.agent',
    fullName: 'Maria Lopez',
    jobTitle: 'Independent Agent',
    companyName: 'Lopez Financial Services',
    location: 'Phoenix, AZ',
    email: 'maria@lopezfinancial.com',
    phone: '602-555-0198',
    triggerContext:
      '"Switching FMOs this quarter — current one has terrible final expense lead quality. DM me recommendations."',
    sourceUrl: 'https://facebook.com/groups/fmoagents/posts/4471',
    intentScore: 91,
    intentReasoning: 'Explicitly dissatisfied with current lead source and requesting alternatives.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    _id: 'lead-4',
    platform: 'facebook',
    profileId: 'fb-derek-owens',
    profileUrl: 'https://facebook.com/derek.owens.99',
    fullName: 'Derek Owens',
    jobTitle: undefined,
    companyName: undefined,
    location: undefined,
    email: undefined,
    phone: undefined,
    triggerContext: '"Final expense... isn\'t that the same as burial insurance?"',
    sourceUrl: 'https://facebook.com/groups/insuranceagents/posts/9601',
    intentScore: 28,
    intentReasoning: 'Asking a definitional question, not shopping for leads or a vendor.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
];

export async function getLeads(): Promise<Lead[]> {
  await delay(300);
  return mockLeads.map((lead) => ({ ...lead }));
}

// Wired to the real GET/POST /keywords routes.
export async function getKeywords(): Promise<Keyword[]> {
  const res = await fetch('/keywords');
  if (!res.ok) throw new Error(`Failed to load keywords: ${res.status}`);
  return res.json();
}

export async function addKeyword(input: { keyword: string; cron: string }): Promise<Keyword> {
  const res = await fetch('/keywords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to add keyword: ${res.status}`);
  return res.json();
}

// No PATCH /keywords/:id route on the backend yet.
export async function setKeywordEnabled(id: string, enabled: boolean): Promise<Keyword> {
  throw new Error(
    `Enabling/disabling keywords is not supported by the backend yet (tried to set "${id}" to ${enabled})`,
  );
}
