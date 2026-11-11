/**
 * LS OPEN API TRADING CHALLENGE - Data Models
 * 수익금 중심 평가 및 OPEN API 전략 우수사례 별도 프로그램 운영
 */

export type LeagueId = 'rookie' | 'challenger' | 'master';

export interface LeagueInfo {
  id: LeagueId;
  name: string;
  nameEn: string;
  minAsset: number;
  maxAsset: number | null;
  minAssetLabel: string;
  themeColor: string;
  accentHex: string;
  badgeBg: string;
  description: string;
  participantCount: number;
  totalTradingVolume: string;
}

export interface Participant {
  rank: number;
  prevRank: number;
  maskedId: string;
  nickname: string;
  leagueId: LeagueId;
  netProfit: number; // 메인 평가 기준: 대회 기간 누적 순수익금 (원)
  isCurrentUser?: boolean;
  isNewApiUser?: boolean; // 대회 이전 OPEN API 체결 이력 없는 신규 고객 (루키 스타상 대상)
  weeklyProfits: [number, number, number, number]; // 1주, 2주, 3주, 4주차 순수익금(원)
  positiveWeeksCount: number; // 주간 순수익금 플러스(+) 주간 수 (꾸준한 수익상 1차 기준)
  minWeeklyProfit: number; // 가장 낮은 주간 순수익금 (꾸준한 수익상 2차 기준)
  firstHalfProfit: number; // 전반부 (1~2주차) 누적 순수익금
  secondHalfProfit: number; // 후반부 (3~4주차) 누적 순수익금
  isSecondHalfImproved: boolean; // 후반부 순수익금이 전반부보다 증가했는지 여부 (후반 역전상 조건)
  mdd: number; // 최대 낙폭 제어 참고 지표 %
  tradesCount: number;
  lastUpdated: string;
}

// 수익금 경쟁 4개 부문 (알고리즘 전략상은 별도 프로그램으로 분리)
export type AwardId = 'profit_champion' | 'steady_profit' | 'rookie_star' | 'reversal';

export interface AwardInfo {
  id: AwardId;
  name: string;
  nameEn: string;
  badge: string;
  summary: string;
  criteria: string;
  budget: string;
  winnerCount: string;
  priorityOrder: number;
  currentLeader: string;
  myStatus: string;
  top3?: {
    rank: number;
    id: string;
    val: string;
    league: string;
    detail?: string;
  }[];
}

// OPEN API 전략 우수사례 프로그램 모델
export interface StrategyCaseSubmission {
  id: string;
  title: string;
  author: string;
  league: string;
  submittedAt: string;
  summary: string;
  apiFeatures: string[];
  executionMethod: string;
  riskManagement: string;
  documentType: '소개서(PDF)' | '영상(3분 이내)';
  status: '접수완료' | '심사중' | '우수사례선정';
  score?: {
    apiUtilization: number; // 35점 만점
    strategyClarity: number; // 25점 만점
    creativity: number; // 20점 만점
    riskControl: number; // 15점 만점
    presentation: number; // 5점 만점
    total: number; // 100점 만점
  };
}

export interface EvaluationCriterion {
  category: string;
  points: number;
  title: string;
  description: string;
}
