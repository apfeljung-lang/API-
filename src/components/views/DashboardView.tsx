import React from 'react';
import { 
  BarChart3, RefreshCw, Shield, ArrowUpRight, 
  CheckCircle, Clock, Flame, Gauge, Calendar
} from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

export const DashboardView: React.FC = () => {
  const netProfit = CURRENT_USER.netProfit;
  const week4Profit = CURRENT_USER.weeklyProfits[3];
  const secondHalfProfit = CURRENT_USER.weeklyProfits[2] + week4Profit;
  const minWeeklyProfit = Math.min(CURRENT_USER.weeklyProfits[0], CURRENT_USER.weeklyProfits[1], CURRENT_USER.weeklyProfits[2], week4Profit);

  const pnlHistory = [
    { day: '01.18 (월)', pnl: 180000, daily: '+180,000원' },
    { day: '01.19 (화)', pnl: 420000, daily: '+240,000원' },
    { day: '01.20 (수)', pnl: 390000, daily: '-30,000원' },
    { day: '01.21 (목)', pnl: 710000, daily: '+320,000원' },
    { day: '01.22 (금)', pnl: 890000, daily: '+180,000원' },
    { day: '01.25 (월)', pnl: 1030000, daily: '+140,000원' },
    { day: '01.26 (화)', pnl: netProfit, daily: `+${(netProfit - 1030000).toLocaleString()}원` },
  ];

  const maxPnl = Math.max(...pnlHistory.map((d) => d.pnl), 1400000);

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
            Dashboard
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1 break-keep-all leading-relaxed">
            <span className="inline-block">수익률 평가 제외 ·</span>{' '}
            <span className="inline-block">오직 원화 누적 순수익금(원)과</span>{' '}
            <span className="inline-block">주간별 실현손익을 실시간 확인합니다.</span>
          </p>
        </div>
      </div>

      {/* 4 Core KPI Cards - Centered entirely on KRW profits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* League & Rank */}
        <div className="bg-gradient-to-b from-[#13092b] to-[#0c061e] border border-purple-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300 font-semibold mb-2">
              <span className="whitespace-nowrap">클래스 & 순위</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/50 whitespace-nowrap">
                챌린저 리그
              </span>
            </div>
            <div className="flex items-baseline text-2xl sm:text-2xl xl:text-3xl font-racing text-white font-black tracking-tight whitespace-nowrap">
              <span>12</span>
              <span className="text-base sm:text-lg font-normal text-slate-400 ml-0.5 whitespace-nowrap">위</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-emerald-400 mt-2 font-mono break-keep-all leading-relaxed">
            <ArrowUpRight size={16} className="shrink-0" />
            <span className="inline-block whitespace-nowrap">▲ 3위 추월</span>{' '}
            <span className="inline-block whitespace-nowrap">(상위 2.3%)</span>
          </div>
        </div>

        {/* Net Profit - Main Evaluation Metric */}
        <div className="bg-gradient-to-b from-[#13092b] to-[#0c061e] border-2 border-yellow-500/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300 font-semibold mb-2">
              <span className="text-yellow-400 font-bold whitespace-nowrap">누적 순수익금 (메인)</span>
              <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">제비용 차감</span>
            </div>
            <div className="flex items-baseline text-2xl sm:text-2xl xl:text-3xl font-racing text-yellow-400 tracking-tight tabular-nums font-black whitespace-nowrap">
              <span>+{netProfit.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold text-yellow-400 ml-0.5 whitespace-nowrap">원</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2 break-keep-all leading-relaxed">
            <span className="inline-block whitespace-nowrap">종료자산 - 시작자산</span>{' '}
            <span className="inline-block whitespace-nowrap">- 순외부유입</span>
          </div>
        </div>

        {/* Consistency - Min Weekly Profit */}
        <div className="bg-gradient-to-b from-[#13092b] to-[#0c061e] border border-purple-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300 font-semibold mb-2">
              <span className="whitespace-nowrap">최저 주간 순수익금</span>
              <span className="text-xs text-emerald-400 font-bold whitespace-nowrap">4주 올플러스</span>
            </div>
            <div className="flex items-baseline text-2xl sm:text-2xl xl:text-3xl font-racing text-emerald-400 tracking-tight tabular-nums font-black whitespace-nowrap">
              <span>+{minWeeklyProfit.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 ml-0.5 whitespace-nowrap">원</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2 break-keep-all leading-relaxed">
            <span className="inline-block whitespace-nowrap">꾸준한 수익상</span>{' '}
            <span className="inline-block whitespace-nowrap">2차 평가 지표</span>
          </div>
        </div>

        {/* Second Half Profit */}
        <div className="bg-gradient-to-b from-[#13092b] to-[#0c061e] border border-purple-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300 font-semibold mb-2">
              <span className="whitespace-nowrap">후반부 순수익금 (3~4주)</span>
              <span className="text-xs text-sky-400 font-bold whitespace-nowrap">{CURRENT_USER.tradesCount}건 체결</span>
            </div>
            <div className="flex items-baseline text-2xl sm:text-2xl xl:text-3xl font-racing text-slate-100 tracking-tight font-black whitespace-nowrap">
              <span>+{secondHalfProfit.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold text-slate-300 ml-0.5 whitespace-nowrap">원</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2 break-keep-all leading-relaxed">
            <span className="inline-block whitespace-nowrap">전반부 72만원</span>{' '}
            <span className="inline-block whitespace-nowrap">대비 손익</span>
          </div>
        </div>
      </div>

      {/* 7-Day Cumulative Net Profit Chart (KRW only) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-racing text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-yellow-400" />
              <span>일별 누적 순수익금(원) 추이</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              개막(01.18) 이후 일별 실현 순수익금 누적 궤적 (수익률 지표 제외)
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono">단위: 원화(KRW)</span>
        </div>

        <div className="space-y-3">
          {pnlHistory.map((item, idx) => {
            const barWidth = Math.min(100, Math.max(14, Math.round((item.pnl / maxPnl) * 100)));
            const isToday = idx === pnlHistory.length - 1;

            return (
              <div key={item.day} className="flex items-center gap-3.5 text-sm">
                <span className={`w-24 font-semibold shrink-0 text-xs sm:text-sm ${isToday ? 'text-yellow-400 font-bold' : 'text-slate-300'}`}>
                  {item.day}
                </span>
                <div className="flex-1 h-8 bg-slate-950/80 rounded-lg overflow-hidden p-0.5 flex items-center">
                  <div
                    style={{ width: `${barWidth}%` }}
                    className={`h-full rounded-md transition-all duration-300 flex items-center justify-end pr-2.5 text-xs sm:text-sm font-mono font-bold ${
                      isToday
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-400 text-slate-950'
                        : 'bg-slate-700/80 text-slate-200'
                    }`}
                  >
                    +{item.pnl.toLocaleString()}원
                  </div>
                </div>
                <span className="w-24 text-right font-mono text-xs text-slate-400 tabular-nums shrink-0">
                  {item.daily}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Week Consistency Tracker (꾸준한 수익상 트래커) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-base sm:text-lg font-racing text-white flex items-center gap-2">
              <Calendar size={18} className="text-emerald-400" />
              <span>꾸준한 수익상 주간별 순수익금 트래커</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              4주 모두 플러스 순수익금 달성 시, 「최저 주간 순수익금」이 높은 참가자가 우선 선정됩니다.
            </p>
          </div>
          <span className="text-xs sm:text-sm text-emerald-400 font-racing font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 whitespace-nowrap shrink-0">
            4주 올플러스 (최저 +{minWeeklyProfit.toLocaleString()}원)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3.5 text-center">
            <span className="text-xs text-slate-400 block font-medium whitespace-nowrap">1주차 순수익금</span>
            <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1 font-racing whitespace-nowrap">
              <CheckCircle size={15} className="shrink-0" />
              <span className="whitespace-nowrap">+{CURRENT_USER.weeklyProfits[0].toLocaleString()}원</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">플러스 완주</span>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3.5 text-center">
            <span className="text-xs text-slate-400 block font-medium whitespace-nowrap">2주차 순수익금</span>
            <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1 font-racing whitespace-nowrap">
              <CheckCircle size={15} className="shrink-0" />
              <span className="whitespace-nowrap">+{CURRENT_USER.weeklyProfits[1].toLocaleString()}원</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">플러스 완주</span>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3.5 text-center">
            <span className="text-xs text-slate-400 block font-medium whitespace-nowrap">3주차 순수익금</span>
            <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1 font-racing whitespace-nowrap">
              <CheckCircle size={15} className="shrink-0" />
              <span className="whitespace-nowrap">+{CURRENT_USER.weeklyProfits[2].toLocaleString()}원</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">플러스 완주</span>
          </div>

          <div className="bg-slate-950/80 border border-yellow-500/40 rounded-xl p-3.5 text-center bg-yellow-950/10">
            <span className="text-xs text-slate-400 block font-medium whitespace-nowrap">4주차 순수익금</span>
            <div className="text-sm sm:text-base font-bold text-yellow-400 mt-1 flex items-center justify-center gap-1 font-racing animate-pulse whitespace-nowrap">
              <Clock size={15} className="shrink-0" />
              <span className="whitespace-nowrap">+{week4Profit.toLocaleString()}원</span>
            </div>
            <span className="text-[10px] text-yellow-400/80 block mt-0.5 whitespace-nowrap">최저 주간 순익</span>
          </div>
        </div>
      </div>
    </div>
  );
};
