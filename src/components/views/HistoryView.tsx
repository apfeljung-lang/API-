import React from 'react';
import { MOCK_EXECUTION_LOGS } from '../../data/mockData';

export const HistoryView: React.FC = () => {
  const logs = MOCK_EXECUTION_LOGS;

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
            체결 기록
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            LS증권 OPEN API를 통한 체결 기록입니다.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f0926]/90 border border-purple-900/50 rounded-2xl overflow-hidden shadow-xl mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/50 bg-[#090518] text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">체결시각</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">주문번호</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">종목명 (코드)</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap">구분</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">체결단가</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">수량</th>
                <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">체결금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60 text-sm font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-purple-950/30 transition-colors">
                  <td className="py-3.5 px-4 text-slate-300 font-sans whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{log.id}</td>
                  <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    {log.symbolName} <span className="text-slate-400 font-mono text-xs">({log.symbol})</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-sans font-bold whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-racing whitespace-nowrap ${
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 text-center">
        ※ 일반 HTS/MTS 수동 주문은 제외되며, OPEN API 게이트웨이 인증 체결 건만 집계됩니다.
      </p>
    </div>
  );
};
