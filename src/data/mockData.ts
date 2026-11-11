import { Participant, AwardInfo, StrategyCaseSubmission, EvaluationCriterion } from '../types';

export interface SimpleBoardTile {
  id: string;
  index: number;
  type: 'start' | 'league' | 'award' | 'status';
  title: string;
  subTitle: string;
  category: string;
  iconName: string;
  accentColor: string;
  leagueId?: 'rookie' | 'challenger' | 'master';
  awardId?: string;
  isMyLeague?: boolean;
  desc: string;
  metric: string;
}

export const SIMPLE_TILES: SimpleBoardTile[] = [
  // Top Row (0 to 3)
  {
    id: 'start',
    index: 0,
    type: 'start',
    title: 'START',
    subTitle: '대회 출발점',
    category: '출발',
    iconName: 'Flag',
    accentColor: '#3b82f6',
    desc: 'OPEN API 실전 계좌 연결 및 실거래 챌린지 출발점입니다.',
    metric: '지정 계좌 등록 완료',
  },
  {
    id: 'rookie',
    index: 1,
    type: 'league',
    leagueId: 'rookie',
    title: '루키 리그',
    subTitle: '100만 ~ 1,000만',
    category: '리그',
    iconName: 'Zap',
    accentColor: '#38bdf8',
    desc: '소액 투자자 참여 확대 리그 (누적 순수익금 1~3위 시상)',
    metric: '1위: +142만원 (누적순익)',
  },
  {
    id: 'rookie_star',
    index: 2,
    type: 'award',
    awardId: 'rookie_star',
    title: '루키 스타상',
    subTitle: '신규 API 1위',
    category: '특별상',
    iconName: 'Sparkles',
    accentColor: '#38bdf8',
    desc: '대회 전 OPEN API 체결 이력이 없는 신규 고객 중 누적 순수익금 1위 (1명 / 150만원)',
    metric: '선두: LS***78 (+118만원)',
  },
  {
    id: 'challenger',
    index: 3,
    type: 'league',
    leagueId: 'challenger',
    title: '챌린저 리그',
    subTitle: '1,000만 ~ 5,000만',
    category: '리그',
    iconName: 'Shield',
    accentColor: '#a855f7',
    isMyLeague: true,
    desc: '일반 투자자 활성화 주력 리그 (내 참가 리그 / 1~3위 450만원)',
    metric: '내 순위: 12위 (+124.5만원)',
  },

  // Right Edge (4)
  {
    id: 'steady_profit',
    index: 4,
    type: 'award',
    awardId: 'steady_profit',
    title: '꾸준한 수익상',
    subTitle: '주간 플러스 지속',
    category: '특별상',
    iconName: 'TrendingUp',
    accentColor: '#10b981',
    desc: '플러스 주간 수(1차) → 최저 주간 순수익금(2차) 우선선정 (1명 / 200만원)',
    metric: '선두: 4주 올플러스 (최저 +100만)',
  },

  // Bottom Row (5 to 8, right to left)
  {
    id: 'master',
    index: 5,
    type: 'league',
    leagueId: 'master',
    title: '마스터 리그',
    subTitle: '5,000만원 이상',
    category: '리그',
    iconName: 'Crown',
    accentColor: '#fbbf24',
    desc: '고액 자산 운용 및 고액 투자자 참여 리그 (1~3위 650만원)',
    metric: '1위: +1,845만원 (누적순익)',
  },
  {
    id: 'profit_champion',
    index: 6,
    type: 'award',
    awardId: 'profit_champion',
    title: '수익금 챔피언',
    subTitle: '리그별 1~3위 (총 9명)',
    category: '메인시상',
    iconName: 'Trophy',
    accentColor: '#f59e0b',
    desc: '3개 리그별 누적 순수익금 1~3위 (총 9명 / 총 1,400만원)',
    metric: '전체 최고: +1,845만원',
  },
  {
    id: 'reversal',
    index: 7,
    type: 'award',
    awardId: 'reversal',
    title: '후반 역전상',
    subTitle: '후반부 수익금 1위',
    category: '특별상',
    iconName: 'Flame',
    accentColor: '#c084fc',
    desc: '전반부(1~2주) 대비 후반부(3~4주) 순수익금 증가자 중 후반부 순수익금 1위 (1명 / 100만원)',
    metric: '선두: 후반부 +490만원',
  },
  {
    id: 'strategy_case_tile',
    index: 8,
    type: 'award',
    awardId: 'strategy_case',
    title: '전략 우수사례',
    subTitle: '별도 공모 프로그램',
    category: '별도프로그램',
    iconName: 'Cpu',
    accentColor: '#06b6d4',
    desc: '수익금 경쟁에서 분리 운영되는 OPEN API 활용 전략 우수사례 발굴 프로그램 (100점 정량 심사)',
    metric: '우수사례 공모 접수 중',
  },

  // Left Edge (9)
  {
    id: 'my_status_tile',
    index: 9,
    type: 'status',
    title: '내 챌린지 현황',
    subTitle: '챌린저 12위',
    category: '내 현황',
    iconName: 'UserCheck',
    accentColor: '#3b82f6',
    desc: '현재 내 순위와 누적 순수익금을 확인합니다.',
    metric: '+1,245,000원 (순익)',
  },
];

// Current Logged-in User profile with pure KRW profit metrics
export const CURRENT_USER: Participant = {
  rank: 12,
  prevRank: 15,
  maskedId: 'LS***99',
  nickname: '퀀트알고리즘러',
  leagueId: 'challenger',
  netProfit: 1245000, // 누적 순수익금: 1,245,000원
  isCurrentUser: true,
  isNewApiUser: false, // 기존 API 고객
  weeklyProfits: [480000, 240000, 310000, 215000], // 1주, 2주, 3주, 4주차 순수익금
  positiveWeeksCount: 4, // 4주 모두 플러스 순수익
  minWeeklyProfit: 215000, // 최저 주간 순수익금: 21.5만원
  firstHalfProfit: 720000, // 1~2주차: 72만원
  secondHalfProfit: 525000, // 3~4주차: 52.5만원
  isSecondHalfImproved: false,
  mdd: -3.8,
  tradesCount: 42,
  lastUpdated: '2027-01-26 15:40:00 (장마감 잠정집계)',
};

// 3 Racing Leagues (누적 순수익금 순위 및 참가자)
export const LEAGUE_SUMMARY = {
  rookie: {
    name: '루키 리그',
    assetRange: '100만원 이상 ~ 1,000만원 미만',
    accent: '#38bdf8',
    colorClass: 'text-sky-400',
    borderClass: 'border-sky-500/30',
    participantCount: 842,
    prizeBudget: '300만원 (1위 150만 / 2위 100만 / 3위 50만)',
    top3: [
      { rank: 1, maskedId: 'API***21', nickname: '시그널알파', netProfit: 1420000, weeklyProfits: [400000, 350000, 320000, 350000], isNewApi: false, mdd: -4.1 },
      { rank: 2, maskedId: 'LS***78', nickname: '모멘텀봇', netProfit: 1180000, weeklyProfits: [280000, 250000, 310000, 340000], isNewApi: true, mdd: -5.2 },
      { rank: 3, maskedId: 'TR***03', nickname: '페어트레이딩', netProfit: 995000, weeklyProfits: [250000, 260000, 245000, 240000], isNewApi: false, mdd: -3.5 },
    ],
    fullRoster: [
      { rank: 1, maskedId: 'API***21', nickname: '시그널알파', netProfit: 1420000, weeklyProfits: [400000, 350000, 320000, 350000], minWeekly: 320000, posWeeks: 4, isNewApi: false, firstHalf: 750000, secondHalf: 670000, mdd: -4.1 },
      { rank: 2, maskedId: 'LS***78', nickname: '모멘텀봇', netProfit: 1180000, weeklyProfits: [280000, 250000, 310000, 340000], minWeekly: 250000, posWeeks: 4, isNewApi: true, firstHalf: 530000, secondHalf: 650000, mdd: -5.2 },
      { rank: 3, maskedId: 'TR***03', nickname: '페어트레이딩', netProfit: 995000, weeklyProfits: [250000, 260000, 245000, 240000], minWeekly: 240000, posWeeks: 4, isNewApi: false, firstHalf: 510000, secondHalf: 485000, mdd: -3.5 },
      { rank: 4, maskedId: 'DEV***55', nickname: '딥러닝호가봇', netProfit: 840000, weeklyProfits: [180000, 200000, 220000, 240000], minWeekly: 180000, posWeeks: 4, isNewApi: true, firstHalf: 380000, secondHalf: 460000, mdd: -4.8 },
      { rank: 5, maskedId: 'QT***90', nickname: '스윙마스터', netProfit: 730000, weeklyProfits: [190000, 160000, 180000, 200000], minWeekly: 160000, posWeeks: 4, isNewApi: false, firstHalf: 350000, secondHalf: 380000, mdd: -3.9 },
    ],
  },
  challenger: {
    name: '챌린저 리그',
    assetRange: '1,000만원 이상 ~ 5,000만원 미만',
    accent: '#a855f7',
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-500/30',
    participantCount: 526,
    prizeBudget: '450만원 (1위 250만 / 2위 130만 / 3위 70만)',
    top3: [
      { rank: 1, maskedId: 'KOR***88', nickname: '멀티팩터X', netProfit: 5240000, weeklyProfits: [1300000, 1250000, 1340000, 1350000], isNewApi: false, mdd: -3.1 },
      { rank: 2, maskedId: 'LS***14', nickname: '옵션합성러', netProfit: 4810000, weeklyProfits: [1100000, 1200000, 1210000, 1300000], isNewApi: false, mdd: -4.0 },
      { rank: 3, maskedId: 'ALGO***33', nickname: '볼린저아비트', netProfit: 3950000, weeklyProfits: [950000, 1000000, 980000, 1020000], isNewApi: true, mdd: -3.4 },
    ],
    fullRoster: [
      { rank: 1, maskedId: 'KOR***88', nickname: '멀티팩터X', netProfit: 5240000, weeklyProfits: [1300000, 1250000, 1340000, 1350000], minWeekly: 1250000, posWeeks: 4, isNewApi: false, firstHalf: 2550000, secondHalf: 2690000, mdd: -3.1 },
      { rank: 2, maskedId: 'LS***14', nickname: '옵션합성러', netProfit: 4810000, weeklyProfits: [1100000, 1200000, 1210000, 1300000], minWeekly: 1100000, posWeeks: 4, isNewApi: false, firstHalf: 2300000, secondHalf: 2510000, mdd: -4.0 },
      { rank: 3, maskedId: 'ALGO***33', nickname: '볼린저아비트', netProfit: 3950000, weeklyProfits: [950000, 1000000, 980000, 1020000], minWeekly: 950000, posWeeks: 4, isNewApi: true, firstHalf: 1950000, secondHalf: 2000000, mdd: -3.4 },
      { rank: 11, maskedId: 'DATA***44', nickname: '팩터스케일', netProfit: 1290000, weeklyProfits: [350000, 310000, 310000, 320000], minWeekly: 310000, posWeeks: 4, isNewApi: false, firstHalf: 660000, secondHalf: 630000, mdd: -3.9 },
      { rank: 12, maskedId: 'LS***99', nickname: '퀀트알고리즘러', netProfit: 1245000, weeklyProfits: [480000, 240000, 310000, 215000], minWeekly: 215000, posWeeks: 4, isNewApi: false, firstHalf: 720000, secondHalf: 525000, mdd: -3.8, isCurrent: true },
      { rank: 13, maskedId: 'FIN***77', nickname: '데이터마이너', netProfit: 1190000, weeklyProfits: [290000, 280000, 300000, 320000], minWeekly: 280000, posWeeks: 4, isNewApi: false, firstHalf: 570000, secondHalf: 620000, mdd: -4.2 },
    ],
    myRank: {
      rank: 12,
      prevRank: 15,
      maskedId: 'LS***99',
      nickname: '퀀트알고리즘러',
      netProfit: 1245000,
    },
  },
  master: {
    name: '마스터 리그',
    assetRange: '5,000만원 이상',
    accent: '#fbbf24',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    participantCount: 194,
    prizeBudget: '650만원 (1위 350만 / 2위 200만 / 3위 100만)',
    top3: [
      { rank: 1, maskedId: 'MST***01', nickname: '인사이트알고', netProfit: 18450000, weeklyProfits: [4500000, 4600000, 4650000, 4700000], isNewApi: false, mdd: -2.9 },
      { rank: 2, maskedId: 'GLO***50', nickname: '헤지펀드랩', netProfit: 15300000, weeklyProfits: [3800000, 3700000, 3850000, 3950000], isNewApi: false, mdd: -3.2 },
      { rank: 3, maskedId: 'LS***08', nickname: '거시계량봇', netProfit: 12700000, weeklyProfits: [3100000, 3000000, 3200000, 3400000], isNewApi: false, mdd: -3.6 },
    ],
    fullRoster: [
      { rank: 1, maskedId: 'MST***01', nickname: '인사이트알고', netProfit: 18450000, weeklyProfits: [4500000, 4600000, 4650000, 4700000], minWeekly: 4500000, posWeeks: 4, isNewApi: false, firstHalf: 9100000, secondHalf: 9350000, mdd: -2.9 },
      { rank: 2, maskedId: 'GLO***50', nickname: '헤지펀드랩', netProfit: 15300000, weeklyProfits: [3800000, 3700000, 3850000, 3950000], minWeekly: 3700000, posWeeks: 4, isNewApi: false, firstHalf: 7500000, secondHalf: 7800000, mdd: -3.2 },
      { rank: 3, maskedId: 'LS***08', nickname: '거시계량봇', netProfit: 12700000, weeklyProfits: [3100000, 3000000, 3200000, 3400000], minWeekly: 3000000, posWeeks: 4, isNewApi: false, firstHalf: 6100000, secondHalf: 6600000, mdd: -3.6 },
      { rank: 4, maskedId: 'SYS***91', nickname: '호가아비트라지', netProfit: 10800000, weeklyProfits: [2600000, 2700000, 2700000, 2800000], minWeekly: 2600000, posWeeks: 4, isNewApi: false, firstHalf: 5300000, secondHalf: 5500000, mdd: -3.1 },
    ],
  },
};

// 실전투자대회 수익금 경쟁 4대 시상 부문 (총 12명 선정, 예산 1,850만원)
export const SIMPLE_AWARDS: AwardInfo[] = [
  {
    id: 'profit_champion',
    name: '수익금 챔피언',
    nameEn: 'PROFIT CHAMPION',
    badge: '메인 시상 (총 9명)',
    summary: '각 리그(루키·챌린저·마스터) 누적 순수익금 1~3위 선정',
    criteria: '대회 기간 누적 순수익금(종료 순자산 - 시작 순자산 - 순외부유입액) 상위자 (최종 누적 순수익금 플러스 필수)',
    budget: '총 1,400만원 (루키 300만 / 챌린저 450만 / 마스터 650만)',
    winnerCount: '리그별 1~3위 (총 9명)',
    priorityOrder: 1, // 중복 수상 발생 시 1순위 우선 수상
    currentLeader: '마스터 1위 MST***01 (+1,845만원)',
    myStatus: '챌린저 리그 12위 (+124.5만원)',
    top3: [
      { rank: 1, id: 'MST***01', val: '+1,845만원', league: '마스터', detail: '누적 순익 1위' },
      { rank: 2, id: 'GLO***50', val: '+1,530만원', league: '마스터', detail: '누적 순익 2위' },
      { rank: 3, id: 'LS***08', val: '+1,270만원', league: '마스터', detail: '누적 순익 3위' },
    ],
  },
  {
    id: 'steady_profit',
    name: '꾸준한 수익상',
    nameEn: 'STEADY PROFIT AWARD',
    badge: '특별상 (전체 1명)',
    summary: '플러스 수익 주간 수(1차) → 최저 주간 순수익금(2차) 우선 선정',
    criteria: '전체 리그 참가자 대상. 1차: 주간 순수익금(+) 주 수 최다자 → 2차: 가장 낮은 주간 순수익금이 높은 고객(예: 최저 100만 > 최저 50만) → 3차: 전체 누적 순수익금 순. (최종 순수익금 플러스 필수)',
    budget: '200만원',
    winnerCount: '전체 리그 1명',
    priorityOrder: 2,
    currentLeader: 'KOR***88 (4주 올플러스, 최저 주간 +125만원)',
    myStatus: '4주 올플러스 달성 (최저 주간 +21.5만원 / 후보 5위권)',
    top3: [
      { rank: 1, id: 'KOR***88', val: '4주 (+)', league: '챌린저', detail: '최저 주간 +125만원' },
      { rank: 2, id: 'ALGO***33', val: '4주 (+)', league: '챌린저', detail: '최저 주간 +95만원' },
      { rank: 3, id: 'API***21', val: '4주 (+)', league: '루키', detail: '최저 주간 +32만원' },
    ],
  },
  {
    id: 'rookie_star',
    name: '루키 스타상',
    nameEn: 'ROOKIE STAR AWARD',
    badge: '특별상 (전체 1명)',
    summary: '대회 이전 OPEN API 체결 이력이 없는 신규 고객 중 누적 순수익금 1위',
    criteria: '자산규모 리그와 무관하게, 대회 시작 전 OPEN API 주문 체결 이력이 전무한 신규 API 이용고객 중 대회 기간 누적 순수익금 1위 (최종 순수익금 플러스 필수)',
    budget: '150만원',
    winnerCount: '신규 API 고객 1명 (전 리그 대상)',
    priorityOrder: 3,
    currentLeader: 'ALGO***33 (챌린저 신규 / 누적 +395만원)',
    myStatus: '기존 API 고객 (시상 대상 제외)',
    top3: [
      { rank: 1, id: 'ALGO***33', val: '+395만원', league: '챌린저', detail: '신규 API 계좌 1위' },
      { rank: 2, id: 'LS***78', val: '+118만원', league: '루키', detail: '신규 API 계좌 2위' },
      { rank: 3, id: 'DEV***55', val: '+84만원', league: '루키', detail: '신규 API 계좌 3위' },
    ],
  },
  {
    id: 'reversal',
    name: '후반 역전상',
    nameEn: 'REVERSAL COMEBACK AWARD',
    badge: '특별상 (전체 1명)',
    summary: '후반부(3~4주) 순수익금이 전반부보다 증가한 참가자 중 후반부 순수익금 1위',
    criteria: '전체 참가자 중 전반부(1~2주) 대비 후반부(3~4주) 순수익금이 증가한 고객을 대상으로, 단순 개선 폭이 아닌 「후반부 순수익금 금액」으로 순위 결정 (후반부 및 전체 누적 순수익금 플러스 필수)',
    budget: '100만원',
    winnerCount: '전체 리그 1명',
    priorityOrder: 4,
    currentLeader: 'GLO***50 (후반부 +780만원 / 전반 대비 +30만원 증가)',
    myStatus: '전반 72만 > 후반 52.5만 (개선 미충족)',
    top3: [
      { rank: 1, id: 'GLO***50', val: '후반 +780만원', league: '마스터', detail: '전반 750만 → 후반 780만' },
      { rank: 2, id: 'KOR***88', val: '후반 +269만원', league: '챌린저', detail: '전반 255만 → 후반 269만' },
      { rank: 3, id: 'LS***78', val: '후반 +65만원', league: '루키', detail: '전반 53만 → 후반 65만' },
    ],
  },
];

// 시상 예산안 데이터 (총 1,850만원)
export const PRIZE_BUDGET_TABLE = [
  { category: '루키 리그 (100만~1,000만)', award: '수익금 챔피언 1~3위', winners: '3명', amount: '300만원', detail: '1위 150만, 2위 100만, 3위 50만' },
  { category: '챌린저 리그 (1,000만~5,000만)', award: '수익금 챔피언 1~3위', winners: '3명', amount: '450만원', detail: '1위 250만, 2위 130만, 3위 70만' },
  { category: '마스터 리그 (5,000만 이상)', award: '수익금 챔피언 1~3위', winners: '3명', amount: '650만원', detail: '1위 350만, 2위 200만, 3위 100만' },
  { category: '전체 리그 특별상', award: '꾸준한 수익상', winners: '1명', amount: '200만원', detail: '주간 플러스 주수 → 최저 주간 순익' },
  { category: '전체 리그 특별상', award: '루키 스타상', winners: '1명', amount: '150만원', detail: '신규 API 고객 중 누적 순수익금 1위' },
  { category: '전체 리그 특별상', award: '후반 역전상', winners: '1명', amount: '100만원', detail: '후반부 개선 조건자 중 후반부 순익 1위' },
];

// 1인 1개 부문 수상 원칙 우선순위
export const DUPLICATE_AWARD_RULES = [
  { priority: 1, award: '수익금 챔피언', rule: '우선 수상 (해당 리그 본상 획득)' },
  { priority: 2, award: '꾸준한 수익상', rule: '중복 시 차순위 적격자에게 승계' },
  { priority: 3, award: '루키 스타상', rule: '중복 시 차순위 적격자에게 승계' },
  { priority: 4, award: '후반 역전상', rule: '중복 시 차순위 적격자에게 승계' },
];

// 「OPEN API 전략 우수사례」 5대 심사 평가 기준 (총 100점 만점)
export const STRATEGY_CASE_CRITERIA: EvaluationCriterion[] = [
  {
    category: 'API 활용성',
    points: 35,
    title: 'API 기능 활용 수준',
    description: 'LS OPEN API(시세 웹소켓, 실시간 체결, 계좌조회, 조건주문 등)의 다양한 기능을 목적에 맞게 안정적으로 구현·활용한 수준',
  },
  {
    category: '전략 구체성',
    points: 25,
    title: '전략 구조 및 실행 명확성',
    description: '매매 전략의 입력 데이터, 시그널 로직, 자산 배분 규칙, 주문 생성 및 전송 프로세스가 구체적이고 체계적으로 설계되었는지 여부',
  },
  {
    category: '창의성',
    points: 20,
    title: '아이디어 차별성 및 독창성',
    description: '단순 보조지표 반복이 아닌, 차별화된 팩터 결합, 호가창 마이크로 구조 활용, 멀티스레드 분산 등 신선하고 창의적인 접근 방식',
  },
  {
    category: '위험관리',
    points: 15,
    title: '오류 대응 및 리스크 제어',
    description: '통신 지연·네트워크 단절 시 자동 재접속(Reconnect), 호가 급변 시 주문 정정·취소, 최대 손실 제한(MDD 컷) 등 안전장치 구비',
  },
  {
    category: '전달력',
    points: 5,
    title: '사례 설명 완성도',
    description: '소개서(1~3페이지) 또는 영상(3분 이내)의 논리적 전개, 가독성, 타 개발자가 이해하고 벤치마킹할 수 있는 명확한 설명 완성도',
  },
];

// Mock Strategy Cases for the Separate Program
export const MOCK_STRATEGY_CASES: StrategyCaseSubmission[] = [
  {
    id: 'case-01',
    title: 'WebSocket 실시간 호가잔량 불균형 기반 초단타 분할 집행 봇',
    author: '호가스프레드러',
    league: '챌린저 리그',
    submittedAt: '2027-01-24',
    summary: 'LS OPEN API 웹소켓 호가 체결창의 매수·매도 잔량 비율(Order Book Imbalance)을 10ms 단위로 계산하여 시장가 충격을 최소화하는 TWAP 알고리즘',
    apiFeatures: ['웹소켓 실시간 호가/체결 스트리밍', '초고속 매수/매도 분할 주문 API', '잔고 실시간 정산'],
    executionMethod: 'Python asyncio + C++ 바인딩을 통한 8ms대 패킷 처리 및 자동 버퍼 큐 분할 주문',
    riskManagement: '초당 15TPS 레이트리밋 초과 방지 버퍼, 체결 슬리피지 0.3% 초과 시 즉시 주문 취소 및 세션 리셋',
    documentType: '소개서(PDF)',
    status: '우수사례선정',
    score: {
      apiUtilization: 34,
      strategyClarity: 24,
      creativity: 19,
      riskControl: 15,
      presentation: 5,
      total: 97,
    },
  },
  {
    id: 'case-02',
    title: '장 시작 직후 변동성 돌파 및 모멘텀 필터링 자동 리밸런싱 시스템',
    author: '퀀트파이써니스타',
    league: '루키 리그',
    submittedAt: '2027-01-22',
    summary: '개장 후 첫 15분간의 거래대금 상위 20종목을 API로 자동 스크리닝 후, 래리 윌리엄스 변동성 돌파 계수(k=0.45) 적용 자동 주문 시스템',
    apiFeatures: ['실시간 종목시세 조회 API', '자동 잔고조회 및 포트폴리오 산출', '장마감 동시호가 청산 API'],
    executionMethod: 'Docker 컨테이너 상에서 매일 08:50 자동 부팅 후 장마감(15:30) 자동 포지션 청산',
    riskManagement: '개별 종목 최대 손실 -2.5% 터치 시 즉시 시장가 로스컷, 전체 계좌 MDD -4% 초과 시 당일 주문 락다운',
    documentType: '영상(3분 이내)',
    status: '우수사례선정',
    score: {
      apiUtilization: 33,
      strategyClarity: 25,
      creativity: 17,
      riskControl: 14,
      presentation: 5,
      total: 94,
    },
  },
  {
    id: 'case-03',
    title: '멀티팩터(PER·PBR·체결강도) 복합 스코어링 기반 스윙 포트폴리오 봇',
    author: '계량가치투자자',
    league: '마스터 리그',
    submittedAt: '2027-01-20',
    summary: '펀더멘털 재무지표와 장중 체결강도 데이터를 일괄 수신하여 매일 14:30 최적의 5종목을 자동 선별 매수하는 하이브리드 시스템',
    apiFeatures: ['재무 데이터 조회 API', '투자자별 순매수 집계 API', '지정가 예약 주문 API'],
    executionMethod: '일일 스케줄러를 통한 배치 분석 및 API 자동 매수 주문 전송',
    riskManagement: '네트워크 단절 시 텔레그램 경보 발송 및 3회 지수 백오프 자동 재연결',
    documentType: '소개서(PDF)',
    status: '심사중',
    score: {
      apiUtilization: 31,
      strategyClarity: 23,
      creativity: 18,
      riskControl: 13,
      presentation: 4,
      total: 89,
    },
  },
];

// Execution Logs for "기록" menu
export interface ExecutionLog {
  id: string;
  timestamp: string;
  symbol: string;
  symbolName: string;
  side: '매수' | '매도';
  price: number;
  quantity: number;
  amount: number;
  latencyMs: number;
  status: '체결완료' | '주문정상';
}

export const MOCK_EXECUTION_LOGS: ExecutionLog[] = [
  {
    id: 'ORD-20270126-09412',
    timestamp: '15:28:44',
    symbol: '005930',
    symbolName: '삼성전자',
    side: '매도',
    price: 64800,
    quantity: 50,
    amount: 3240000,
    latencyMs: 14,
    status: '체결완료',
  },
  {
    id: 'ORD-20270126-09385',
    timestamp: '14:52:19',
    symbol: '000660',
    symbolName: 'SK하이닉스',
    side: '매수',
    price: 188500,
    quantity: 15,
    amount: 2827500,
    latencyMs: 12,
    status: '체결완료',
  },
  {
    id: 'ORD-20270126-09204',
    timestamp: '13:10:02',
    symbol: '035420',
    symbolName: 'NAVER',
    side: '매도',
    price: 178200,
    quantity: 20,
    amount: 3564000,
    latencyMs: 16,
    status: '체결완료',
  },
  {
    id: 'ORD-20270126-09011',
    timestamp: '10:44:33',
    symbol: '068270',
    symbolName: '셀트리온',
    side: '매수',
    price: 184000,
    quantity: 10,
    amount: 1840000,
    latencyMs: 11,
    status: '체결완료',
  },
  {
    id: 'ORD-20270126-08892',
    timestamp: '09:12:05',
    symbol: '005930',
    symbolName: '삼성전자',
    side: '매수',
    price: 64100,
    quantity: 50,
    amount: 3205000,
    latencyMs: 9,
    status: '체결완료',
  },
];

// Community Posts for "커뮤니티" menu
export interface PostComment {
  id: string;
  author: string;
  league: string;
  date: string;
  text: string;
}

export interface CommunityPost {
  id: string;
  category: '공지' | '전략토론' | 'API질답' | '알고리즘팁';
  title: string;
  author: string;
  league: string;
  date: string;
  views: number;
  likes: number;
  commentsCount: number;
  isPinned?: boolean;
  content: string;
  tags?: string[];
  comments?: PostComment[];
}

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    category: '공지',
    title: '[필독] 대회 운영원칙 안내: 수익률 전면 제외 및 누적 순수익금(원) 단일 평가 원칙',
    author: 'LS증권운영팀',
    league: '공식운영',
    date: '2027.01.18',
    views: 2180,
    likes: 84,
    commentsCount: 16,
    isPinned: true,
    content: `안녕하세요, LS증권 실전투자대회 운영팀입니다.\n\n이번 대회는 기존 수익률 중심 대회의 왜곡(소액 초고수익률 착시)을 방지하고, 투자 성과의 실질적인 결실을 객관적으로 평가하기 위해 '수익률 평가를 전면 제외'하고 오직 '원화 기준 누적 순수익금(원)'만으로 3개 리그 순위 및 수상자를 결정합니다.\n\n■ 핵심 평가 수식:\n누적 순수익금 = 종료 순자산 − 시작 순자산 − 순외부유입액(입금 − 출금)\n\n※ 거래세, 수수료 등 거래비용은 실시간 자동 차감 정산됩니다.\n※ 대회 기간 중 입출금은 순자산 보정식을 통해 공정하게 반영됩니다.\n참가자 여러분의 건전한 투자와 많은 성원을 부탁드립니다.`,
    tags: ['공식공지', '수익금평가', '운영규정', 'LS증권'],
    comments: [
      { id: 'c-1-1', author: '알고리즘새내기', league: '루키', date: '2027.01.18 10:24', text: '수익률 왜곡 없이 순수익금으로만 평가하니 훨씬 공정하고 신뢰가 갑니다!' },
      { id: 'c-1-2', author: '파이썬퀀트봇', league: '챌린저', date: '2027.01.18 11:15', text: '입출금 차감 공식이 명확해서 전략 수립하기 좋네요. 상세 공지 감사합니다.' }
    ]
  },
  {
    id: 'post-2',
    category: '공지',
    title: '[공모안내] 「OPEN API 전략 우수사례」 별도 프로그램 공모 접수 시작 (수익금·수익률 제외 100점 심사)',
    author: 'LS증권운영팀',
    league: '공식운영',
    date: '2027.01.18',
    views: 1940,
    likes: 72,
    commentsCount: 14,
    isPinned: true,
    content: `안녕하세요, LS증권 오픈플랫폼팀입니다.\n\n단순한 수익금 경쟁을 넘어 창의적이고 안정적인 시스템 트레이딩 생태계를 활성화하기 위해, 『OPEN API 전략 우수사례』 공모 프로그램을 별도 운영합니다.\n\n■ 주요 안내:\n1. 평가 기준: 실제 수익금이나 거래대금은 전면 배제하며, API 활용도(35점), 전략 논리성(25점), 독창성(20점), 리스크 관리(15점), 발표 완성도(5점) 총 100점 만점 정량 심사\n2. 제출 서류: 전략 소개서(PDF) 또는 3분 이내 시연 영상 링크\n3. 시상 혜택: 총 3명 우수사례 선정 및 LS증권 공식 개발자 기술블로그 포스팅 기회 제공\n\n'전략 우수사례' 탭에서 온라인으로 간편하게 접수하실 수 있습니다. 개발자 여러분의 많은 참여 바랍니다.`,
    tags: ['전략우수사례', '공모안내', '정량심사', 'API활용'],
    comments: [
      { id: 'c-2-1', author: '거시계량봇', league: '마스터', date: '2027.01.18 14:05', text: '수익금 경쟁과 분리되어 전략 로직과 리스크 관리 자체를 평가받을 수 있어 기대됩니다.' }
    ]
  },
  {
    id: 'post-3',
    category: 'API질답',
    title: 'Python WebSocket 실시간 체결 수신 시 재접속(Reconnection) 핑퐁 팁 공유',
    author: '파이썬퀀트봇',
    league: '챌린저',
    date: '2027.01.23',
    views: 620,
    likes: 42,
    commentsCount: 9,
    content: [
      '장중 급변하는 거래량 상황에서 파이썬 websockets 라이브러리 사용 시 간혹 Heartbeat(Ping-Pong) 타임아웃으로 세션이 끊기는 현상이 있습니다.',
      '',
      '저는 asyncio.create_task로 백그라운드 핑 루프를 30초마다 돌리고, 서버 응답이 없으면 1.5초 딜레이 후 자동 재구독(Re-subscription) 토큰을 갱신하는 방식으로 해결했습니다.',
      '',
      '```python',
      '# Ping-Pong Keepalive Pattern 예시',
      'async def keepalive(ws):',
      '    while True:',
      '        await asyncio.sleep(30)',
      "        await ws.send(json.dumps({'tr_cd': 'PING'}))",
      '```',
      '',
      '혹시 웹소켓 연결 유지 관련 추가적인 저지연 최적화 팁 있으시면 의견 부탁드립니다!'
    ].join('\n'),
    tags: ['Python', 'WebSocket', '네트워크최적화', 'PingPong'],
    comments: [
      { id: 'c-3-1', author: '시그널알파', league: '루키', date: '2027.01.23 15:40', text: '좋은 팁 감사합니다! uvloop 라이브러리를 함께 사용하시면 이벤트 루프 지연도 2~3ms 더 줄어듭니다.' },
      { id: 'c-3-2', author: '파이썬퀀트봇', league: '챌린저', date: '2027.01.23 16:10', text: '@시그널알파 님, uvloop 적용해보니 피크 타임에 확실히 안정적이네요. 꿀팁 감사합니다!' }
    ]
  },
  {
    id: 'post-4',
    category: '전략토론',
    title: '볼린저밴드와 체결강도를 결합한 5분봉 단기 모멘텀 알고리즘 백테스트 결과',
    author: '시그널알파',
    league: '루키',
    date: '2027.01.22',
    views: 940,
    likes: 58,
    commentsCount: 15,
    content: `코스피200 대형주 대상 5분봉 볼린저 밴드 상단 돌파 시 체결강도 130% 이상일 때만 분할 진입하는 전략을 6개월간 백테스트해보았습니다.\n\n■ 백테스트 조건:\n- 슬리피지: 0.15% 보수적 적용\n- 1회 진입 비중: 전체 계좌 자산의 10%\n- 익절 기준: 밴드 상단 +1.8%, 손절 기준: 중심선 이탈 시 전량 청산\n\n■ 결과:\n- 승률: 약 61.4%\n- 손익비: 1.82\n- 최대 낙폭(MDD): -4.2% 수준\n\n이번 대회가 순수익금 평가 방식이라 대형주 호가 잔량이 충분한 종목 위주로 세팅하는 것이 슬리피지를 최소화하는 핵심인 것 같습니다.`,
    tags: ['볼린저밴드', '체결강도', '백테스트', '단기모멘텀'],
    comments: [
      { id: 'c-4-1', author: '거시계량봇', league: '마스터', date: '2027.01.22 17:30', text: '호가 슬리피지 고려가 아주 현실적이네요. 거래량 상위 30종목 필터링을 추가하면 MDD가 더 낮아질 것 같습니다.' }
    ]
  },
  {
    id: 'post-5',
    category: '알고리즘팁',
    title: '주간 순수익금 플러스 유지를 위한 리스크 패리티 및 슬리피지 관리 로직',
    author: '거시계량봇',
    league: '마스터',
    date: '2027.01.20',
    views: 810,
    likes: 71,
    commentsCount: 18,
    content: `꾸준한 수익상(4주간 매주 플러스 수익 유지)을 목표로 리스크 분산 알고리즘을 설계 중입니다.\n\n■ 주요 통제 로직:\n1. 단일 종목 최대 투자 비중을 전체 평가자산의 15%로 제한\n2. 장중 변동성이 급증할 때 주문 단위를 10회로 분할 전송하는 TWAP 슬라이싱 적용\n3. 주간 누적 손익이 목표치(+80만원)에 도달하면 신규 진입 포지션 비중을 50%로 자동 축소\n\n덕분에 급등락 장세에서도 주간 손익이 안정적으로 방어되고 있습니다. 꾸준한 수익상 노리시는 분들 참고하세요.`,
    tags: ['리스크패리티', '슬리피지관리', 'TWAP', '꾸준한수익상'],
    comments: [
      { id: 'c-5-1', author: '파이썬퀀트봇', league: '챌린저', date: '2027.01.20 20:12', text: '주간 목표 달성 시 포지션 축소하는 로직이 꾸준한 수익상 취지에 딱 맞네요. 좋은 전략 공유 감사드립니다.' }
    ]
  },
  {
    id: 'post-6',
    category: 'API질답',
    title: '초당 주문 요청 제한(Rate Limit 20TPS) 대응용 버퍼 큐 구현 문의',
    author: '알고리즘새내기',
    league: '루키',
    date: '2027.01.19',
    views: 450,
    likes: 23,
    commentsCount: 7,
    content: `LS OPEN API 초당 주문 요청 제한(Rate Limit 20TPS)을 초과하면 HTTP 429 에러가 발생하는데, 다들 어떻게 제어하고 계신가요?\n\n현재 Python collections.deque와 Token Bucket 알고리즘으로 초당 18건을 초과하지 않도록 큐를 운영 중인데, 멀티프로세스 환경에서 프로세스 간 큐 동기화를 가장 빠르고 오버헤드 없이 처리하는 방법이 궁금합니다.\n\nRedis를 거치면 네트워크 지연이 1~2ms 추가되는 것 같은데, SharedMemory나 IPC mmap 쓰는 게 유리할까요? 경험 있으신 분들의 조언을 구합니다!`,
    tags: ['RateLimit', 'TokenBucket', '20TPS', '멀티프로세스'],
    comments: [
      { id: 'c-6-1', author: '스피드퀀트봇', league: '챌린저', date: '2027.01.19 18:02', text: '동일 머신 내 멀티프로세스라면 multiprocessing.shared_memory 기반 ctypes 원자적 카운터(Atomic Counter)를 추천드립니다. 지연이 마이크로초(μs) 단위라 20TPS 제어에 최적입니다.' }
    ]
  },
];
