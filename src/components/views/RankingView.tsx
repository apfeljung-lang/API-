import React, { useState } from 'react';
import { Trophy, Shield, Zap, Crown, Search, AlertCircle, RefreshCw, Flag, Sparkles, CheckCircle2 } from 'lucide-react';
import { LEAGUE_SUMMARY, CURRENT_USER } from '../../data/mockData';

export const RankingView: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<'rookie' | 'challenger' | 'master'>('challenger');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('15:40:00 (장마감 잠정)');

  const currentSummary = LEAGUE_SUMMARY[selectedLeague];
  const roster = currentSummary.fullRoster || [];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} (실시간)`);
      setIsRefreshing(false);
    }, 400);
  };

  const filteredRoster = roster.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.nickname.toLowerCase().includes(q) || p.maskedId.toLowerCase().includes(q);
  });

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
            리그별 Ranking
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            수익률 평가 전면 제외 · 오직 원화 기준 누적 순수익금(원)만으로 순위를 집계합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold font-racing">
            <AlertCircle size={13} />
            <span>장마감 잠정 순위</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin text-yellow-400' : ''} />
            <span className="font-mono text-[11px]">{lastUpdated}</span>
          </button>
        </div>
      </div>

      {/* Profit-Only Policy Notice Banner */}
      <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 mb-6 text-xs text-slate-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-yellow-400 shrink-0" />
          <span>
            <strong>수익금 평가 원칙:</strong> 누적 순수익금 = 종료 순자산 - 시작 순자산 - 순외부유입액 (수익률 지표는 순위 산정에 일체 사용되지 않음)
          </span>
        </div>
        <span className="text-yellow-400 font-racing font-bold shrink-0 hidden sm:inline">
          시상 예산 {currentSummary.prizeBudget.split(' ')[0]}
        </span>
      </div>

      {/* 3 League Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-purple-900/60 pb-4">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSelectedLeague('rookie')}
            className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-racing transition-colors cursor-pointer flex items-center gap-2 ${
              selectedLeague === 'rookie'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            <Zap size={16} />
            <span>루키 리그</span>
            <span className="text-[11px] font-mono text-slate-400">100만~1,000만</span>
          </button>

          <button
            onClick={() => setSelectedLeague('challenger')}
            className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-racing transition-colors cursor-pointer flex items-center gap-2 ${
              selectedLeague === 'challenger'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            <Shield size={16} />
            <span>챌린저 리그</span>
            <span className="text-[11px] font-mono text-purple-300">1,000만~5,000만</span>
          </button>

          <button
            onClick={() => setSelectedLeague('master')}
            className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-racing transition-colors cursor-pointer flex items-center gap-2 ${
              selectedLeague === 'master'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            <Crown size={16} />
            <span>마스터 리그</span>
            <span className="text-[11px] font-mono text-amber-300">5,000만 이상</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="참가자 닉네임 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* TOP 3 Highlight Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {currentSummary.top3.map((item, idx) => {
          const isGold = idx === 0;
          const isSilver = idx === 1;

          return (
            <div
              key={item.maskedId}
              className={`p-5 rounded-2xl border backdrop-blur-sm ${
                isGold
                  ? 'bg-gradient-to-b from-yellow-500/20 to-amber-500/5 border-yellow-500/50 shadow-md shadow-yellow-500/10'
                  : isSilver
                  ? 'bg-gradient-to-b from-slate-400/20 to-slate-500/5 border-slate-400/40'
                  : 'bg-gradient-to-b from-amber-700/20 to-orange-500/5 border-amber-700/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-racing text-xs sm:text-sm font-bold text-yellow-400 flex items-center gap-1.5 whitespace-nowrap">
                  <span>🏆 리그 {idx + 1}위 (입상권)</span>
                </span>
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">{item.maskedId}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-base sm:text-lg font-racing text-white font-bold whitespace-nowrap">{item.nickname}</div>
                {item.isNewApi && (
                  <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/40 whitespace-nowrap shrink-0">
                    신규 API
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between pt-2.5 border-t border-slate-800/80">
                <span className="text-lg font-racing text-yellow-400 tabular-nums font-black whitespace-nowrap">
                  +{item.netProfit.toLocaleString()}원
                </span>
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                  4주 완주
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table without Yield % */}
      <div className="bg-[#0f0926]/90 border border-purple-900/50 rounded-2xl overflow-hidden shadow-xl mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/50 bg-[#090518] text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">리그 순위</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">참가자 (익명화)</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">누적 순수익금 (메인)</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap">주간 플러스</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">최저 주간 순익</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">후반부 순수익금</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap">구분</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60 text-sm sm:text-base">
              {filteredRoster.map((p) => {
                const isCurrent = p.maskedId === CURRENT_USER.maskedId;

                return (
                  <tr
                    key={p.maskedId}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-purple-900/35 font-bold border-l-4 border-yellow-400'
                        : 'hover:bg-purple-950/30'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-racing text-slate-200 font-bold whitespace-nowrap">
                      {p.rank}위
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-white font-semibold whitespace-nowrap">{p.nickname}</span>
                        <span className="text-xs font-mono text-slate-400 whitespace-nowrap">({p.maskedId})</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-yellow-300 bg-yellow-400/25 px-1.5 py-0.5 rounded font-racing whitespace-nowrap">
                            MY ACCOUNT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-racing text-yellow-400 tabular-nums font-bold whitespace-nowrap">
                      +{p.netProfit.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400 tabular-nums whitespace-nowrap">
                      {p.posWeeks}주 / 4주
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums whitespace-nowrap">
                      +{p.minWeekly.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums whitespace-nowrap">
                      +{p.secondHalf.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {p.isNewApi ? (
                        <span className="text-[10px] text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800 whitespace-nowrap">
                          신규 API
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap">
                          기존
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-2">
        <span>※ 본 순위표는 원화 기준 누적 실현 순수익금(제비용 차감 후) 잠정 데이터이며, 거래·권리처리 검증 후 확정됩니다.</span>
        <span className="text-yellow-400/80">수익률 산정 전면 제외</span>
      </div>
    </div>
  );
};
