import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Layers,
} from 'lucide-react';
import { MOCK_EXECUTION_LOGS, ExecutionLog } from '../../data/mockData';

export const HistoryView: React.FC = () => {
  // Extract unique dates in descending order
  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(MOCK_EXECUTION_LOGS.map((log) => log.date)));
    return dates.sort((a, b) => b.localeCompare(a));
  }, []);

  // Selected date: defaults to latest trading day ('2027.01.26'), or 'all'
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || 'all');
  const [sideFilter, setSideFilter] = useState<'all' | '매수' | '매도'>('all');

  // Filter logs by selected date and side
  const filteredLogs = useMemo(() => {
    return MOCK_EXECUTION_LOGS.filter((log) => {
      const matchDate = selectedDate === 'all' || log.date === selectedDate;
      const matchSide = sideFilter === 'all' || log.side === sideFilter;
      return matchDate && matchSide;
    });
  }, [selectedDate, sideFilter]);

  // Compute daily summary metrics for current view
  const summaryMetrics = useMemo(() => {
    const targetLogs =
      selectedDate === 'all'
        ? MOCK_EXECUTION_LOGS
        : MOCK_EXECUTION_LOGS.filter((l) => l.date === selectedDate);

    const totalCount = targetLogs.length;
    const buyLogs = targetLogs.filter((l) => l.side === '매수');
    const sellLogs = targetLogs.filter((l) => l.side === '매도');

    const totalAmount = targetLogs.reduce((sum, l) => sum + l.amount, 0);
    const buyAmount = buyLogs.reduce((sum, l) => sum + l.amount, 0);
    const sellAmount = sellLogs.reduce((sum, l) => sum + l.amount, 0);

    return {
      totalCount,
      buyCount: buyLogs.length,
      sellCount: sellLogs.length,
      totalAmount,
      buyAmount,
      sellAmount,
    };
  }, [selectedDate]);

  // Navigation handlers for prev/next day
  const currentIdx = availableDates.indexOf(selectedDate);
  const hasNext = currentIdx > 0; // newer date (left in list)
  const hasPrev = currentIdx < availableDates.length - 1; // older date (right in list)

  const handleNextDay = () => {
    if (hasNext) setSelectedDate(availableDates[currentIdx - 1]);
  };

  const handlePrevDay = () => {
    if (hasPrev) setSelectedDate(availableDates[currentIdx + 1]);
  };

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-racing font-bold text-yellow-300 bg-yellow-400/20 border border-yellow-400/40">
              OPEN API 실거래 체결장
            </span>
            <span className="text-xs text-slate-400 font-mono">실시간 검증 데이터</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight flex items-center gap-2">
            <span>체결 기록</span>
            <span className="text-sm sm:text-base font-normal text-slate-400">
              (일자별 실거래 조회)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 break-keep-all leading-relaxed">
            LS증권 OPEN API 게이트웨이를 통해 정식 인증 체결된 일자별 알고리즘 주문 및 체결 내역을 확인합니다.
          </p>
        </div>
      </div>

      {/* Date Navigation & Selector Bar */}
      <div className="bg-[#0f0926]/95 border border-purple-900/60 rounded-3xl p-4 sm:p-5 shadow-xl mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Date Quick Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedDate('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-racing whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedDate === 'all'
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-bold shadow-lg shadow-yellow-500/20'
                  : 'bg-[#140b33] text-slate-300 hover:text-white hover:bg-purple-950/80 border border-purple-900/40'
              }`}
            >
              <Layers size={14} />
              <span>전체 일자</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  selectedDate === 'all' ? 'bg-black/20 text-slate-900' : 'bg-purple-900/50 text-slate-400'
                }`}
              >
                {MOCK_EXECUTION_LOGS.length}
              </span>
            </button>

            {availableDates.map((date) => {
              const dayLogs = MOCK_EXECUTION_LOGS.filter((l) => l.date === date);
              const dayOfWeek = dayLogs[0]?.dayOfWeek || '';
              const isSelected = selectedDate === date;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-racing whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-purple-950 border-2 border-yellow-400 text-yellow-300 font-bold shadow-lg shadow-yellow-500/10'
                      : 'bg-[#140b33] text-slate-300 hover:text-white hover:bg-purple-950/80 border border-purple-900/40'
                  }`}
                >
                  <Calendar size={13} className={isSelected ? 'text-yellow-400' : 'text-slate-400'} />
                  <span>
                    {date} <span className="text-xs opacity-75">({dayOfWeek})</span>
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40'
                        : 'bg-purple-900/50 text-slate-400'
                    }`}
                  >
                    {dayLogs.length}건
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper (Prev/Next Day) & Side Filter */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-purple-900/40">
            {/* Prev / Next Day Buttons (enabled when a specific date is selected) */}
            {selectedDate !== 'all' && (
              <div className="flex items-center gap-1 bg-[#140b33] rounded-xl p-1 border border-purple-900/50">
                <button
                  onClick={handlePrevDay}
                  disabled={!hasPrev}
                  className={`p-1.5 rounded-lg text-xs font-racing flex items-center gap-1 transition-colors ${
                    hasPrev
                      ? 'text-slate-300 hover:text-white hover:bg-purple-900/60 cursor-pointer'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                  title="이전 거래일"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">이전일</span>
                </button>
                <span className="text-slate-600 text-xs font-mono px-1">|</span>
                <button
                  onClick={handleNextDay}
                  disabled={!hasNext}
                  className={`p-1.5 rounded-lg text-xs font-racing flex items-center gap-1 transition-colors ${
                    hasNext
                      ? 'text-slate-300 hover:text-white hover:bg-purple-900/60 cursor-pointer'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                  title="다음 거래일"
                >
                  <span className="hidden sm:inline">다음일</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Buy / Sell Quick Filter */}
            <div className="flex items-center bg-[#140b33] p-1 rounded-xl border border-purple-900/50">
              <span className="text-slate-400 text-xs px-2 flex items-center gap-1">
                <Filter size={12} />
                <span className="hidden sm:inline">구분:</span>
              </span>
              <button
                onClick={() => setSideFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-racing transition-colors cursor-pointer ${
                  sideFilter === 'all'
                    ? 'bg-purple-900/80 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSideFilter('매수')}
                className={`px-2.5 py-1 rounded-lg text-xs font-racing transition-colors cursor-pointer ${
                  sideFilter === '매수'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold'
                    : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                매수
              </button>
              <button
                onClick={() => setSideFilter('매도')}
                className={`px-2.5 py-1 rounded-lg text-xs font-racing transition-colors cursor-pointer ${
                  sideFilter === '매도'
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 font-bold'
                    : 'text-slate-400 hover:text-sky-400'
                }`}
              >
                매도
              </button>
            </div>
          </div>
        </div>

        {/* Selected Date Summary Metrics Banner */}
        <div className="mt-4 pt-4 border-t border-purple-900/50 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#090518] p-3 rounded-2xl border border-purple-900/40">
            <span className="text-xs text-slate-400 block">조회 대상 일자</span>
            <div className="text-base sm:text-lg font-racing text-white font-bold mt-0.5 flex items-center gap-1.5">
              <Calendar size={15} className="text-yellow-400 shrink-0" />
              <span className="whitespace-nowrap">
                {selectedDate === 'all' ? '대회 전 기간 (5개 거래일)' : `${selectedDate} (${MOCK_EXECUTION_LOGS.find(l => l.date === selectedDate)?.dayOfWeek}요일)`}
              </span>
            </div>
          </div>

          <div className="bg-[#090518] p-3 rounded-2xl border border-purple-900/40">
            <span className="text-xs text-slate-400 block">체결 건수</span>
            <div className="text-base sm:text-lg font-racing text-yellow-300 font-bold mt-0.5 flex items-center gap-1.5">
              <span>{summaryMetrics.totalCount}건</span>
              <span className="text-xs font-normal text-slate-400 font-sans">
                (매수 {summaryMetrics.buyCount} / 매도 {summaryMetrics.sellCount})
              </span>
            </div>
          </div>

          <div className="bg-[#090518] p-3 rounded-2xl border border-purple-900/40">
            <span className="text-xs text-slate-400 block">매수 체결총액</span>
            <div className="text-base sm:text-lg font-racing text-rose-400 font-bold mt-0.5 flex items-center gap-1">
              <ArrowDownRight size={16} />
              <span>{summaryMetrics.buyAmount.toLocaleString()}원</span>
            </div>
          </div>

          <div className="bg-[#090518] p-3 rounded-2xl border border-purple-900/40">
            <span className="text-xs text-slate-400 block">매도 체결총액</span>
            <div className="text-base sm:text-lg font-racing text-sky-400 font-bold mt-0.5 flex items-center gap-1">
              <ArrowUpRight size={16} />
              <span>{summaryMetrics.sellAmount.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs Table */}
      <div className="bg-[#0f0926]/90 border border-purple-900/50 rounded-3xl overflow-hidden shadow-xl mb-4">
        <div className="p-4 sm:px-6 sm:py-4 bg-[#0c061e] border-b border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-yellow-400" />
            <h3 className="text-sm sm:text-base font-racing text-white font-bold">
              {selectedDate === 'all'
                ? `전체 일자 체결 목록 (${filteredLogs.length}건)`
                : `${selectedDate} 당일 체결 목록 (${filteredLogs.length}건)`}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            * 지연 시간(Latency) 항목 제외 · 체결 완료 건만 집계
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/60 bg-[#090518] text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">체결일자 및 시각</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">주문번호</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">종목명 (코드)</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap">구분</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">체결단가</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">수량</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">체결금액</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60 text-sm font-mono">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-sans">
                    선택하신 조건에 해당하는 체결 기록이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-purple-950/30 transition-colors">
                    <td className="py-3.5 px-4 text-slate-200 font-sans whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 text-xs font-mono">{log.date}</span>
                        <span className="font-bold text-white">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-xs">{log.id}</td>
                    <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                      <span>{log.symbolName}</span>{' '}
                      <span className="text-slate-400 font-mono text-xs">({log.symbol})</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-sans font-bold whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-xs font-racing whitespace-nowrap ${
                          log.side === '매수'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                        }`}
                      >
                        {log.side}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-200 tabular-nums whitespace-nowrap">
                      {log.price.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 tabular-nums whitespace-nowrap">
                      {log.quantity}주
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-yellow-400 font-racing tabular-nums whitespace-nowrap">
                      {log.amount.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-racing">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidance Note */}
      <div className="p-4 rounded-2xl bg-[#090518] border border-purple-900/40 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="leading-relaxed">
          ※ 일반 HTS/MTS 수동 주문은 실적에서 제외되며, LS증권 OPEN API 게이트웨이를 통해 정식 인증된 체결 건만 일자별로 자동 집계됩니다.
        </p>
        <span className="text-yellow-400/90 font-medium shrink-0">
          * 최근 5개 거래일 데이터 제공 중
        </span>
      </div>
    </div>
  );
};
