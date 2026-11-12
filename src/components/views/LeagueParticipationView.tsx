import React, { useState } from 'react';
import { Shield, Zap, Crown, CheckCircle2, Key, ArrowRight, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeagueParticipationViewProps {
  onSuccess: (league: string) => void;
}

export const LeagueParticipationView: React.FC<LeagueParticipationViewProps> = ({ onSuccess }) => {
  const [apiKey, setApiKey] = useState('ls_api_live_9921_quant_dev');
  const [assetInput, setAssetInput] = useState('25000000'); // 2,500만원
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const numericAsset = parseInt(assetInput, 10) || 0;
  let targetLeague = '루키 리그';
  let leagueKey: 'rookie' | 'challenger' | 'master' = 'rookie';

  if (numericAsset >= 50000000) {
    targetLeague = '마스터 리그';
    leagueKey = 'master';
  } else if (numericAsset >= 10000000) {
    targetLeague = '챌린저 리그';
    leagueKey = 'challenger';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffe600', '#a855f7', '#38bdf8', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
    onSuccess(targetLeague);
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
          리그 참가신청 및 계좌 등록
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1 break-keep-all leading-relaxed">
          예탁 자산 규모에 따라 3개 리그 중 하나로 자동 확정 배정되며, <strong className="text-yellow-400">누적 순수익금(원)</strong>만으로 순위를 평가합니다.
        </p>
      </div>

      {/* 3 League Brackets Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Rookie */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            leagueKey === 'rookie'
              ? 'bg-sky-950/30 border-sky-400 ring-2 ring-sky-400/50 shadow-lg'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Zap size={22} />
            </div>
            <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded border border-sky-500/30 whitespace-nowrap">
              시상 300만원
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-racing text-white">루키 리그</h3>
          <p className="text-sm text-sky-400 font-bold mt-1 break-keep-all">
            <span className="inline-block whitespace-nowrap">100만원 이상</span> ~ <span className="inline-block whitespace-nowrap">1,000만원 미만</span>
          </p>
          <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
            소액 자본으로 참여하는 신예 퀀트 리그 (누적 순수익금 1~3위 시상)
          </p>
          <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="whitespace-nowrap">1위: 150만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">2위: 100만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">3위: 50만원</span>
          </div>
        </div>

        {/* Challenger */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            leagueKey === 'challenger'
              ? 'bg-purple-950/30 border-purple-400 ring-2 ring-purple-400/50 shadow-lg'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Shield size={22} />
            </div>
            <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30 whitespace-nowrap">
              시상 450만원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-racing text-white">챌린저 리그</h3>
            <span className="text-xs font-racing text-yellow-300 bg-yellow-400/20 px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">
              추천 배정
            </span>
          </div>
          <p className="text-sm text-purple-400 font-bold mt-1 break-keep-all">
            <span className="inline-block whitespace-nowrap">1,000만원 이상</span> ~ <span className="inline-block whitespace-nowrap">5,000만원 미만</span>
          </p>
          <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
            일반 투자자 활성화 주력 리그 (누적 순수익금 1~3위 시상)
          </p>
          <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="whitespace-nowrap">1위: 250만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">2위: 130만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">3위: 70만원</span>
          </div>
        </div>

        {/* Master */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            leagueKey === 'master'
              ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Crown size={22} />
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
              시상 650만원
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-racing text-white">마스터 리그</h3>
          <p className="text-sm text-amber-400 font-bold mt-1 break-keep-all">
            <span className="inline-block whitespace-nowrap">5,000만원 이상</span>
          </p>
          <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
            고액 자산 운용 및 고액 투자자 참여 리그 (누적 순수익금 1~3위 시상)
          </p>
          <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="whitespace-nowrap">1위: 350만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">2위: 200만원</span>
            <span className="text-slate-600">·</span>
            <span className="whitespace-nowrap">3위: 100만원</span>
          </div>
        </div>
      </div>

      {/* Interactive Application Form */}
      <div className="bg-[#0f0926]/90 border border-purple-900/50 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl sm:text-2xl font-racing text-white mb-2 flex items-center gap-2.5">
          <Flag size={22} className="text-yellow-400" />
          <span>대회 지정 계좌 등록 및 참가 신청서</span>
        </h3>
        <p className="text-sm text-slate-300 mb-6">
          OPEN API 키와 참가 계좌 자산을 확인하면 해당 리그로 즉시 배정되며, 수익금 평가 원칙이 적용됩니다.
        </p>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={30} />
            </div>
            <h4 className="text-lg sm:text-xl font-racing text-white">참가 신청이 완료되었습니다!</h4>
            <p className="text-sm sm:text-base text-slate-200">
              <strong className="text-yellow-400 font-racing text-lg">{targetLeague}</strong>에 공식 배정되었습니다. 대회 개막일(2027.01.18) 이후 OPEN API 국내주식 체결 시 누적 순수익금이 자동 집계됩니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>LS OPEN API 발급 키 (App Key)</span>
                <span className="text-xs sm:text-sm text-yellow-400 font-racing">개발자 포털 인증완료</span>
              </label>
              <div className="relative">
                <Key size={18} className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#080415] border border-purple-900/50 rounded-xl pl-11 pr-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>대회 지정 계좌 시작 평가 자산 (원)</span>
                <span className="text-xs sm:text-sm text-yellow-400 font-racing">배정 예상: {targetLeague}</span>
              </label>
              <input
                type="number"
                value={assetInput}
                onChange={(e) => setAssetInput(e.target.value)}
                className="w-full bg-[#080415] border border-purple-900/50 rounded-xl px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-yellow-400"
              />
              <span className="text-xs sm:text-sm text-slate-400 mt-1.5 block">
                입력 자산: {(numericAsset / 10000).toLocaleString()}만원 → <strong className="text-yellow-400 font-racing">{targetLeague}</strong> 자동 배정
              </span>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-300 leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 rounded border-slate-700 text-yellow-400 focus:ring-0 w-4 h-4"
                />
                <span>
                  (필수) 누적 순수익금 단일 평가 원칙(수익률 제외), 국내 일반 상장주식 현물 거래 한정(신용·미수·파생상품 제외), 및 건전투자 가이드라인(거래량 비례 리워드 금지)에 동의합니다.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!agreed}
                className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-racing font-black rounded-xl text-base shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🏁 {targetLeague} 참가 신청 완료</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
