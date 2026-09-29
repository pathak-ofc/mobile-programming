/** Realistic hard-coded mock data. UI only — nothing persists. */

export type RankTier =
  | 'Immortal 3'
  | 'Immortal 2'
  | 'Immortal 1'
  | 'Ascendant 3'
  | 'Ascendant 2'
  | 'Diamond 3';

export interface RosterPlayer {
  id: string;
  riotId: string;
  rank: RankTier;
  role: 'Duelist' | 'Controller' | 'Initiator' | 'Sentinel' | 'Flex';
  isCaptain: boolean;
  online: boolean;
}

export interface ActionItem {
  id: string;
  kind: 'scrim-request' | 'result-confirm' | 'team-invite' | 'dispute';
  title: string;
  detail: string;
  time: string;
}

export interface BoardRequest {
  id: string;
  team: string;
  rating: number;
  rankBand: string;
  time: string;
  format: string;
  region: string;
  hot?: boolean;
  locked?: boolean;
}

export interface RecentMatch {
  id: string;
  opponent: string;
  score: string;
  delta: number;
  status: 'confirmed' | 'pending' | 'disputed';
  map: string;
}

export interface LfgPost {
  id: string;
  riotId: string;
  rank: RankTier;
  role: string;
  region: string;
  mic: boolean;
  availability: string;
  note: string;
}

export const user = {
  riotId: 'RAVEN#052',
  rank: 'Immortal 3' as RankTier,
  verified: true,
  team: 'FRAGILE FIVE',
  unread: 3,
};

export const team = {
  name: 'FRAGILE FIVE',
  tag: 'FF',
  rating: 1842,
  provisional: false,
  lastFive: ['W', 'W', 'L', 'W', 'W'] as const,
  winRate: 68,
  trend: '+36 this week',
  reputation: 96,
  rankSynced: '2h ago from Riot',
};

export const roster: RosterPlayer[] = [
  { id: 'p1', riotId: 'RAVEN#052', rank: 'Immortal 3', role: 'Duelist', isCaptain: true, online: true },
  { id: 'p2', riotId: 'AXIOM#921', rank: 'Immortal 2', role: 'Controller', isCaptain: false, online: true },
  { id: 'p3', riotId: 'NYX#404', rank: 'Immortal 1', role: 'Initiator', isCaptain: false, online: true },
  { id: 'p4', riotId: 'KAI#110', rank: 'Ascendant 3', role: 'Sentinel', isCaptain: false, online: false },
  { id: 'p5', riotId: 'JUNO#77', rank: 'Ascendant 2', role: 'Flex', isCaptain: false, online: true },
];

export const actionNeeded: ActionItem[] = [
  {
    id: 'a1',
    kind: 'scrim-request',
    title: 'Scrim request from RE//ACT',
    detail: 'Immortal 2 · 1817 rating · Tonight 8:30 PM · BO3',
    time: '12m ago',
  },
  {
    id: 'a2',
    kind: 'result-confirm',
    title: 'Confirm result vs NOVA//5',
    detail: 'You reported 13–9. Waiting on your tap to lock +24.',
    time: '1h ago',
  },
  {
    id: 'a3',
    kind: 'team-invite',
    title: 'JUNO#77 wants a trial',
    detail: 'Ascendant 2 Flex · mic yes · evenings',
    time: '3h ago',
  },
  {
    id: 'a4',
    kind: 'dispute',
    title: 'Dispute vs BYTE//KINGS needs proof',
    detail: 'Score mismatch 13–11 vs 13–9. Upload screenshot.',
    time: '5h ago',
  },
];

const inTwoHours = Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000;

export const nextMatch = {
  opponent: 'RE//ACT',
  opponentTag: 'RX',
  opponentRating: 1817,
  opponentRank: 'Immortal 2',
  startsAt: inTwoHours,
  dateLabel: 'Tonight · 8:30 PM',
  maps: ['Ascent', 'Lotus', 'Sunset'],
  format: '5v5 · BO3',
  server: 'Mumbai · 28ms',
};

export const boardPreview: BoardRequest[] = [
  { id: 'b1', team: 'NOVA//5', rating: 1829, rankBand: 'Imm 3', time: 'Tonight 9 PM', format: 'BO3', region: 'South Asia', hot: true },
  { id: 'b2', team: 'BYTE//KINGS', rating: 1801, rankBand: 'Imm 2', time: 'Tonight 10 PM', format: 'BO1', region: 'South Asia' },
  { id: 'b3', team: 'LOWKEY//GG', rating: 1866, rankBand: 'Imm 3', time: 'Tomorrow 7 PM', format: 'BO3', region: 'South Asia' },
  { id: 'b4', team: 'VANTA//BLACK', rating: 1794, rankBand: 'Imm 1', time: 'Tomorrow 8 PM', format: 'BO3', region: 'South Asia', locked: true },
];

export const recentMatches: RecentMatch[] = [
  { id: 'm1', opponent: 'NOVA//5', score: '13–9', delta: 24, status: 'pending', map: 'Lotus' },
  { id: 'm2', opponent: 'BYTE//KINGS', score: '13–11', delta: -12, status: 'disputed', map: 'Ascent' },
  { id: 'm3', opponent: 'LOWKEY//GG', score: '13–7', delta: 18, status: 'confirmed', map: 'Sunset' },
];

export const lfgPosts: LfgPost[] = [
  { id: 'l1', riotId: 'AXIOM#921', rank: 'Ascendant 2', role: 'Controller', region: 'South Asia', mic: true, availability: 'Evenings', note: 'Calm comms, anchor.' },
  { id: 'l2', riotId: 'NYX#404', rank: 'Immortal 1', role: 'Initiator', region: 'South Asia', mic: true, availability: 'Now', note: 'Sova / Fade.' },
  { id: 'l3', riotId: 'KAI#110', rank: 'Ascendant 3', role: 'Duelist', region: 'South Asia', mic: false, availability: 'Weekends', note: 'Entry / Operator.' },
];

export const chatRooms = [
  { id: 'c1', name: 'South Asia LFG', members: 1240, unread: 3 },
  { id: 'c2', name: 'FF team chat', members: 5, unread: 0 },
  { id: 'c3', name: 'Scrim vs RE//ACT', members: 4, unread: 1 },
];
