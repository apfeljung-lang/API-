import React, { useState } from 'react';
import { 
  Trophy, TrendingUp, Sparkles, Flame, Cpu, 
  ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, ChevronRight, Coins 
} from 'lucide-react';
import { SIMPLE_AWARDS, PRIZE_BUDGET_TABLE, DUPLICATE_AWARD_RULES } from '../../data/mockData';
import { NavTab } from '../Header';

interface ReportViewProps {
  onNavigate?: (tab: NavTab) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ onNavigate }) => {
  const [activeAwardId, setActiveAwardId] = useState<string>(SIMPLE_AWARDS[0].id);

  const activeAward = SIMPLE_AWARDS.find((a) => a.id === activeAwardId) || SIMPLE_AWARDS[0];

  const renderAwardIcon = (id: string) => {
    switch (id) {
      case 'profit_champion': return <Trophy size={20} className="text-yellow-400" />;
      case 'steady_profit': return <TrendingUp size={20} className="text-emerald-400" />;
      case 'rookie_star': return <Sparkles size={20} className="text-sky-400" />;
      case 'reversal': return <Flame size={20} className="text-purple-400" />;
      default: return <Trophy size={20} className="text-yellow-400" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
          대회 시상안내
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1">
          수익률 평가를 전면 제외하고, 오직 원화 기준 누적 순수익금으로 공정하게 평가하는 4개 시상 부문(총 12명)입니다.
        </p>
      </div>

      {/* Revision Key Principles Banner */}
      <div className="p-5 rounded-2xl bg-[#0e0826] border border-yellow-500/40 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/40">
              <Coins size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-racing text-white flex items-center gap-2">
                <span>수익금 평가 원칙 통일 (수익률 평가 전면 제외)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 font-bold">
                  단일 원칙
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                모든 시상은 원화 기준 <strong className="text-yellow-400">누적 순수익금(종료순자산 - 시작순자산 - 순외부유입액)</strong>으로만 평가하며,
                기존 알고리즘 전략상은 수익금 경쟁에서 제외하고 별도의 「OPEN API 전략 우수사례」 프로그램으로 독립 운영합니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate?.('strategy')}
            className="px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-cyan-300 text-xs sm:text-sm font-racing font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <Cpu size={15} />
            <span>전략 우수사례 바로가기</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* 1. Official Prize Budget Section - Full-width, prominent, visible at a glance */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0926]/95 border-2 border-yellow-500/50 shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-purple-900/50 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-racing font-bold text-yellow-300 bg-yellow-400/20 border border-yellow-400/40">
                공식 확정 예산안
              </span>
              <span className="text-xs text-slate-400 font-mono">100% 원화 순수익금 기준 시상</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-racing font-bold text-white flex items-center gap-2.5">
              <Coins className="text-yellow-400 shrink-0" size={28} />
              <span>실전투자대회 시상 예산안</span>
              <span className="text-yellow-400 text-xl sm:text-2xl font-black">(총 1,850만원)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 break-keep-all leading-relaxed">
              수익률 평가를 전면 배제하고 오직 원화 누적 순수익금 기준으로만 지급되는 3대 리그 본상(9명) 및 특별상(3명) 총 12명 예산 배정표입니다.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs sm:text-sm font-racing font-bold px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 shadow-sm">
              총 12명 수상
            </span>
          </div>
        </div>

        {/* 4 Summary Metric Cards (Visible at a single glance) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          <div className="p-4 rounded-2xl bg-[#090518] border-2 border-yellow-500/50 text-center shadow-lg">
            <span className="text-xs text-slate-400 block font-medium">총 시상 예산</span>
            <div className="text-2xl sm:text-3xl font-racing text-yellow-400 font-black mt-1">
              1,850<span className="text-sm font-normal text-slate-300 ml-0.5">만원</span>
            </div>
            <span className="text-[11px] text-yellow-400/90 block mt-1 font-mono">전액 원화 순수익금 평가</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090518] border border-purple-800/60 text-center">
            <span className="text-xs text-slate-400 block font-medium">총 시상 인원</span>
            <div className="text-2xl sm:text-3xl font-racing text-white font-black mt-1">
              12<span className="text-sm font-normal text-slate-400 ml-0.5">명</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1 font-mono">1인 1개 부문 원칙</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090518] border border-purple-800/60 text-center">
            <span className="text-xs text-slate-400 block font-medium">3대 리그 본상 (9명)</span>
            <div className="text-2xl sm:text-3xl font-racing text-emerald-400 font-black mt-1">
              1,400<span className="text-sm font-normal text-slate-400 ml-0.5">만원</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1 font-mono">루키 300 · 챌린저 450 · 마스터 650</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090518] border border-purple-800/60 text-center">
            <span className="text-xs text-slate-400 block font-medium">특별상 3개 부문 (3명)</span>
            <div className="text-2xl sm:text-3xl font-racing text-sky-400 font-black mt-1">
              450<span className="text-sm font-normal text-slate-400 ml-0.5">만원</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1 font-mono">꾸준 200 · 루키스타 150 · 후반 100</span>
          </div>
        </div>

        {/* Full-Width Spacious Budget Table */}
        <div className="overflow-x-auto rounded-2xl border border-purple-900/60 bg-[#090518] shadow-inner">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-purple-900/70 text-slate-300 font-semibold bg-[#12082b]">
                <th className="py-3.5 px-4 whitespace-nowrap">구분</th>
                <th className="py-3.5 px-4 whitespace-nowrap">시상 부문</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">선정 인원</th>
                <th className="py-3.5 px-4 whitespace-nowrap">세부 시상 내역 (순위별 배분)</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">시상 예산</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60 text-slate-300">
              {PRIZE_BUDGET_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-950/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">{row.category}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-medium whitespace-nowrap">{row.award}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-white whitespace-nowrap">{row.winners}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs sm:text-sm break-keep-all">{row.detail}</td>
                  <td className="py-3.5 px-4 text-right font-racing font-bold text-yellow-400 text-sm sm:text-base whitespace-nowrap tabular-nums">
                    {row.amount}
                  </td>
                </tr>
              ))}
              <tr className="bg-purple-950/50 font-bold border-t-2 border-yellow-500/60">
                <td className="py-4 px-4 text-white font-racing text-sm sm:text-base" colSpan={2}>
                  실전투자대회 총 시상 예산
                </td>
                <td className="py-4 px-4 text-center font-mono text-yellow-300 text-sm sm:text-base whitespace-nowrap font-bold">
                  12명
                </td>
                <td className="py-4 px-4 text-slate-300 text-xs sm:text-sm">
                  1인 1개 부문 수상 원칙 (중복 시 차순위 승계)
                </td>
                <td className="py-4 px-4 text-right font-racing text-yellow-300 text-base sm:text-xl whitespace-nowrap font-black">
                  1,850만원
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3.5 text-[11px] sm:text-xs text-slate-400">
          <p className="leading-relaxed">
            ※ 현금 시상은 준법감시부 사전 승인 후 확정되며, 「OPEN API 전략 우수사례」 시상은 별도 검토됩니다.
          </p>
          <span className="text-yellow-400/90 font-medium shrink-0">
            * 제세공과금(4.4% 또는 22%) 수증자 부담
          </span>
        </div>
      </div>

      {/* 2. Individual Award Details Heading */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-racing font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-400" size={24} />
            <span>4대 시상 부문별 상세 기준 & 선두 현황</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            카드를 클릭하여 부문별 심사 기준, 시상 우선순위 및 실시간 선두 랭킹을 확인하세요.
          </p>
        </div>
      </div>

      {/* 4 Awards Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        {SIMPLE_AWARDS.map((award) => {
          const isSelected = activeAwardId === award.id;
          const displayBudget = award.id === 'profit_champion' ? '총 1,400만원' : award.budget;

          return (
            <button
              key={award.id}
              onClick={() => setActiveAwardId(award.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-purple-950/80 border-yellow-400 shadow-xl ring-2 ring-yellow-400/50 transform -translate-y-0.5'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2 gap-2">
                {renderAwardIcon(award.id)}
                <span className="text-[11px] font-bold text-slate-400 font-mono text-right break-keep-all leading-tight">
                  {award.winnerCount}
                </span>
              </div>
              <div className="text-base sm:text-lg font-racing text-white font-bold break-keep-all leading-snug">
                {award.name}
              </div>
              <div className="text-xs text-yellow-400 font-medium mt-1 break-keep-all leading-snug">
                예산: {displayBudget}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Award Detail Card */}
      <div className="bg-[#0f0926]/95 border border-purple-900/60 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-purple-900/60 pb-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#090518] border border-purple-800/80 flex items-center justify-center shrink-0">
              {renderAwardIcon(activeAward.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-racing uppercase tracking-wider text-yellow-400 font-bold whitespace-nowrap">
                  {activeAward.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">·</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">시상 우선순위 {activeAward.priorityOrder}위</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-racing text-white mt-0.5 font-bold">
                {activeAward.name}
              </h3>
              <p className="text-sm text-slate-300 mt-1 break-keep-all leading-relaxed">
                {activeAward.summary}
              </p>
            </div>
          </div>

          <div className="bg-[#090518] border border-purple-800/60 px-5 py-3 rounded-2xl text-right self-start sm:self-auto shrink-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold whitespace-nowrap">내 후보 상태</span>
            <span className="text-base sm:text-lg font-racing text-yellow-400 font-bold whitespace-nowrap">
              {activeAward.myStatus}
            </span>
          </div>
        </div>

        {/* Criteria & Leader */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="p-5 rounded-2xl bg-[#090518]/90 border border-purple-950/80 space-y-3">
            <h4 className="text-sm font-racing text-slate-200 uppercase tracking-wider flex items-center gap-2 font-bold">
              <ShieldCheck size={16} className="text-yellow-400" />
              <span>공식 심사 및 선정 기준</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeAward.criteria}
            </p>
            <div className="pt-2 border-t border-purple-900/40 text-xs text-slate-400 flex items-center justify-between">
              <span>시상 인원: <strong className="text-white">{activeAward.winnerCount}</strong></span>
              <span>잠정 예산: <strong className="text-yellow-400">{activeAward.budget}</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#090518]/90 border border-purple-950/80">
            <h4 className="text-sm font-racing text-slate-200 uppercase tracking-wider mb-3 font-bold flex items-center justify-between">
              <span>현재 부문 선두 현황</span>
              <span className="text-xs text-yellow-400 font-normal">장마감 잠정집계</span>
            </h4>
            <div className="space-y-2">
              {activeAward.top3?.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-racing font-bold w-6">{item.rank}위</span>
                    <span className="text-white font-medium">{item.id}</span>
                    <span className="text-xs text-slate-400">({item.league})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-racing text-yellow-400 font-bold block">{item.val}</span>
                    {item.detail && <span className="text-[11px] text-slate-400">{item.detail}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steady Profit Award Special 3-Step Guide Table */}
        {activeAward.id === 'steady_profit' && (
          <div className="pt-5 border-t border-purple-900/60">
            <h4 className="text-sm font-racing text-slate-200 uppercase tracking-wider mb-2 font-bold">
              꾸준한 수익상 평가 예시 (최저 주간 순수익금 우선 선정)
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              4주 모두 플러스 순수익을 달성한 참가자가 여러 명일 경우, 가장 낮은 주의 주간 순수익금이 더 큰 고객이 우선 선정됩니다.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                    <th className="py-2.5 px-3">참가자</th>
                    <th className="py-2.5 px-3">1주차</th>
                    <th className="py-2.5 px-3">2주차</th>
                    <th className="py-2.5 px-3">3주차</th>
                    <th className="py-2.5 px-3">4주차</th>
                    <th className="py-2.5 px-3">플러스 주</th>
                    <th className="py-2.5 px-3">최저 주간 수익금</th>
                    <th className="py-2.5 px-3 text-right">선정 결과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">A</td>
                    <td className="py-2.5 px-3 text-emerald-400">+50만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+70만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+60만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+80만원</td>
                    <td className="py-2.5 px-3 font-bold">4주</td>
                    <td className="py-2.5 px-3 text-yellow-400 font-bold">+50만원</td>
                    <td className="py-2.5 px-3 text-right text-slate-400">차순위</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">B</td>
                    <td className="py-2.5 px-3 text-emerald-400">+200만원</td>
                    <td className="py-2.5 px-3 text-rose-400">-100만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+250만원</td>
                    <td className="py-2.5 px-3 text-rose-400">-50만원</td>
                    <td className="py-2.5 px-3 font-bold text-rose-400">2주</td>
                    <td className="py-2.5 px-3 text-rose-400">-100만원</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">탈락</td>
                  </tr>
                  <tr className="bg-emerald-950/20 font-bold">
                    <td className="py-2.5 px-3 text-yellow-400">C (선정)</td>
                    <td className="py-2.5 px-3 text-emerald-400">+100만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+100만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+100만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">+100만원</td>
                    <td className="py-2.5 px-3 text-emerald-400">4주</td>
                    <td className="py-2.5 px-3 text-yellow-400">+100만원</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400">★ 우선 선정</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reversal Award Notice */}
        {activeAward.id === 'reversal' && (
          <div className="pt-5 border-t border-purple-900/60 text-xs sm:text-sm text-slate-300 space-y-2">
            <h4 className="font-racing text-slate-200 uppercase tracking-wider font-bold">
              후반 역전상 선정 원칙 (개선 금액 왜곡 방지)
            </h4>
            <p className="leading-relaxed">
              초반에 큰 손실을 발생시킨 참가자가 단순 수익 개선폭만으로 유리해지는 문제를 방지하기 위해,
              <strong>전반부 대비 후반부 순수익금이 증가한 고객 중 「후반부 순수익금(원)」이 가장 높은 고객</strong>을 선정합니다.
            </p>
          </div>
        )}
      </div>

      {/* Duplicate Award Rules - Full Width */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0f0926]/90 border border-purple-900/60 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h4 className="text-base sm:text-lg font-racing text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-yellow-400 shrink-0" />
            <span>1인 1개 부문 수상 원칙 및 중복 처리 규정</span>
          </h4>
          <span className="text-xs text-yellow-400 font-racing font-bold px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 self-start sm:self-auto">
            우선순위 규정 (차순위 승계)
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed break-keep-all">
          더 많은 참가자에게 고른 수상 기회를 부여하기 위해 <strong>1인 1개 부문 수상을 원칙</strong>으로 하며,
          복수 부문에서 수상 대상이 될 경우 아래 <strong>우선순위 규정</strong>에 따라 최상위 1개 부문만을 수여하고 차순위 적격자에게 권리가 자동 승계됩니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DUPLICATE_AWARD_RULES.map((rule) => (
            <div
              key={rule.priority}
              className="p-4 rounded-2xl bg-slate-950/80 border border-purple-900/40 flex flex-col justify-between gap-2 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                  {rule.priority}
                </span>
                <span className="font-bold text-white whitespace-nowrap">{rule.award}</span>
              </div>
              <span className="text-slate-400 text-xs break-keep-all mt-1">{rule.rule}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 flex items-center justify-between break-keep-all leading-relaxed">
          <span>💡 <strong>예외 인정</strong>: 「OPEN API 전략 우수사례」는 수익금 경쟁과 분리된 별도 정성평가 프로그램으로, 실전투자대회 본상 및 특별상과 중복 수상이 가능합니다.</span>
        </div>
      </div>
    </div>
  );
};
