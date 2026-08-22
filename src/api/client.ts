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

let mockKeywords: Keyword[] = [
  {
    _id: 'kw-1',
    keyword: 'final expense leads',
    cron: '0 */2 * * *',
    enabled: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    _id: 'kw-2',
    keyword: 'FMO switching',
    cron: '0 8 * * *',
    enabled: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    _id: 'kw-3',
    keyword: 'insurance lead vendor',
    cron: '0 */6 * * *',
    enabled: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

export async function getLeads(): Promise<Lead[]> {
  await delay(300);
  return mockLeads.map((lead) => ({ ...lead }));
}

export async function getKeywords(): Promise<Keyword[]> {
  await delay(300);
  return mockKeywords.map((keyword) => ({ ...keyword }));
}

export async function addKeyword(input: { keyword: string; cron: string }): Promise<Keyword> {
  await delay(300);
  const keyword: Keyword = {
    _id: `kw-${crypto.randomUUID()}`,
    keyword: input.keyword,
    cron: input.cron,
    enabled: true,
    createdAt: new Date().toISOString(),
  };
  mockKeywords = [keyword, ...mockKeywords];
  return { ...keyword };
}

export async function setKeywordEnabled(id: string, enabled: boolean): Promise<Keyword> {
  await delay(300);
  const existing = mockKeywords.find((keyword) => keyword._id === id);
  if (!existing) throw new Error(`Keyword ${id} not found`);
  existing.enabled = enabled;
  return { ...existing };
}
