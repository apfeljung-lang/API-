import React, { useState, useEffect } from 'react';
import { 
  Trophy, Zap, Shield, Crown, ArrowRight, 
  Flag, Activity, Flame, Sparkles, Cpu, ChevronRight, Gauge 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NavTab } from '../Header';

interface HomeViewProps {
  onOpenRegister: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenRegister,
  onNavigate,
}) => {
  const [isBoosting, setIsBoosting] = useState(false);
  const [speed, setSpeed] = useState(248);

  const handleTriggerBoost = () => {
    if (isBoosting) return;
    setIsBoosting(true);
    setSpeed(356);

    // Launch celebratory nitro sparks
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffe600', '#a855f7', '#00f2fe', '#ffffff'],
      ticks: 180,
    });

    setTimeout(() => {
      setIsBoosting(false);
      setSpeed(248);
    }, 4000);
  };
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Background Racing Atmosphere with Violet Speed Glow */}
      <div className="absolute inset-0 speed-gradient pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Top Grand Prix Status Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs mb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 font-bold text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 animate-ping" />
            <span className="whitespace-nowrap">수익금 중심 평가 (수익률 전면 제외)</span>
          </div>
          <span className="text-slate-400 text-xs whitespace-nowrap">대회기간: 2027.01.18 ~ 02.19</span>
        </div>

        {/* Visual Hero Banner featuring the racing artwork - matching width of HUD section */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.4)] bg-[#0d0724] animate-nitro-pulse group">
            {/* Complete, uncropped image with dynamic suspension and throttle animation */}
            <div className="relative overflow-hidden w-full">
              <img
                src="/assets/aistudio/image_b3a86ff2.png"
                alt="LS증권 OPEN API 실전투자대회 - OPEN API로 투자 챔피언에 도전!"
                className={`w-full h-auto block select-none transition-all duration-500 ${
                  isBoosting ? 'animate-nitro-speed brightness-110 contrast-105' : 'animate-kart-idle group-hover:scale-[1.01]'
                }`}
              />

              {/* Dynamic light streak sweep reflection */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent animate-light-sweep" />
              </div>

              {/* Tire friction spark twinkles matching the kart artwork */}
              <div className="absolute bottom-6 sm:bottom-12 left-[34%] w-2.5 h-2.5 rounded-full bg-yellow-300 blur-[1px] animate-spark pointer-events-none shadow-[0_0_12px_#fde047]" />
              <div 
                className="absolute bottom-5 sm:bottom-10 right-[32%] w-3 h-3 rounded-full bg-amber-400 blur-[1.5px] animate-spark pointer-events-none shadow-[0_0_15px_#f59e0b]" 
                style={{ animationDelay: '0.6s' }} 
              />
              {isBoosting && (
                <>
                  <div className="absolute bottom-7 sm:bottom-14 left-[38%] w-3.5 h-3.5 rounded-full bg-cyan-300 blur-[2px] animate-ping pointer-events-none" />
                  <div className="absolute bottom-6 sm:bottom-12 right-[36%] w-4 h-4 rounded-full bg-purple-400 blur-[2px] animate-ping pointer-events-none" />
                </>
              )}
            </div>

            {/* Quick action strip docked cleanly beneath artwork on mobile and integrated console on desktop */}
            <div className="border-t border-purple-500/40 bg-[#0e0722]/98 backdrop-blur-md p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#12082b]/90 sm:bg-transparent px-3 py-2 sm:p-0 rounded-xl border border-purple-900/40 sm:border-0">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight flex items-center gap-1.5 whitespace-nowrap">
                        <span>실시간 실거래 집계 중</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                          1,562명 참가
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 whitespace-nowrap">
                        API 누적 거래액 1,911억원
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Speedometer & Nitro Boost Interactive Button */}
                <button
                  onClick={handleTriggerBoost}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl border text-xs font-racing transition-all cursor-pointer w-full sm:w-auto shrink-0 ${
                    isBoosting 
                      ? 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.6)] animate-pulse'
                      : 'bg-purple-950/70 hover:bg-purple-900/80 text-yellow-300 border-yellow-500/40 hover:border-yellow-400'
                  }`}
                  title="클릭하여 부스터 가동!"
                >
                  <Flame size={14} className={isBoosting ? 'animate-bounce text-yellow-300' : 'text-yellow-400'} />
                  <span className="whitespace-nowrap">{isBoosting ? 'BOOST MAX!' : '⚡ 부스터 가동'}</span>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/40 text-emerald-400 font-bold tabular-nums whitespace-nowrap">
                    {speed} km/h
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={onOpenRegister}
                  className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-racing font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-yellow-500/25 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <Flag size={14} />
                  <span>대회 참가 신청</span>
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex-1 lg:flex-none px-4 py-2.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  내 대시보드
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* 3 Racing Classes (3대 리그 소개) */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl sm:text-3xl font-racing font-bold text-white">참가리그(수익금 경쟁)</h3>
            </div>
            <button
              onClick={() => onNavigate('ranking')}
              className="text-sm font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>전체 순위표</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Rookie */}
            <div
              onClick={() => onNavigate('ranking')}
              className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-sky-500/30 hover:border-sky-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Zap size={22} />
                </div>
                <span className="text-xs font-mono font-medium text-slate-300 whitespace-nowrap">시상 예산 300만원</span>
              </div>
              <h4 className="text-lg sm:text-xl font-racing text-white group-hover:text-sky-300 transition-colors">
                루키 리그
              </h4>
              <p className="text-sm text-sky-400 font-bold mt-1 break-keep-all">
                <span className="inline-block whitespace-nowrap">100만원 이상</span> ~ <span className="inline-block whitespace-nowrap">1,000만원 미만</span>
              </p>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
                소액 투자자 참여 확대 및 신예 퀀트들의 진검승부
              </p>
              <div className="mt-5 pt-3.5 border-t border-slate-800 text-sm font-mono font-bold text-emerald-400">
                <span className="inline-block whitespace-nowrap">1위: +142만원</span> <span className="inline-block whitespace-nowrap">(누적순익)</span>
              </div>
            </div>

            {/* Challenger */}
            <div
              onClick={() => onNavigate('ranking')}
              className="p-6 rounded-2xl bg-purple-950/40 hover:bg-purple-950/60 border border-purple-500/50 hover:border-purple-400 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 text-xs font-bold text-purple-200 bg-purple-500/40 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                MY CLASS
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Shield size={22} />
                </div>
                <span className="text-xs font-mono font-medium text-slate-300 whitespace-nowrap">시상 예산 450만원</span>
              </div>
              <h4 className="text-lg sm:text-xl font-racing text-white group-hover:text-purple-300 transition-colors">
                챌린저 리그
              </h4>
              <p className="text-sm text-purple-400 font-bold mt-1 break-keep-all">
                <span className="inline-block whitespace-nowrap">1,000만원 이상</span> ~ <span className="inline-block whitespace-nowrap">5,000만원 미만</span>
              </p>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
                일반 투자자 활성화 및 알고리즘 분산투자의 메인 리그
              </p>
              <div className="mt-5 pt-3.5 border-t border-slate-800 text-sm font-mono font-bold text-emerald-400">
                <span className="inline-block whitespace-nowrap">내 순위: 12위</span> <span className="inline-block whitespace-nowrap">(+124.5만원)</span>
              </div>
            </div>

            {/* Master */}
            <div
              onClick={() => onNavigate('ranking')}
              className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Crown size={22} />
                </div>
                <span className="text-xs font-mono font-medium text-slate-300 whitespace-nowrap">시상 예산 650만원</span>
              </div>
              <h4 className="text-lg sm:text-xl font-racing text-white group-hover:text-amber-300 transition-colors">
                마스터 리그
              </h4>
              <p className="text-sm text-amber-400 font-bold mt-1 break-keep-all">
                <span className="inline-block whitespace-nowrap">5,000만원 이상</span>
              </p>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed break-keep-all">
                고액 자산 운용 및 고액 투자자 참여 포뮬러
              </p>
              <div className="mt-5 pt-3.5 border-t border-slate-800 text-sm font-mono font-bold text-emerald-400">
                <span className="inline-block whitespace-nowrap">1위: +1,845만원</span> <span className="inline-block whitespace-nowrap">(누적순익)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Awards & Strategy Program Quick Banner */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl bg-[#0e0826] border border-purple-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 shadow-xl overflow-hidden">
          <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-xs font-racing uppercase tracking-wider text-yellow-400 font-bold whitespace-nowrap">
                  총 12명 / 1,850만원 예산
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">·</span>
                <span className="text-xs text-cyan-300 font-mono whitespace-nowrap">
                  전략 우수사례 별도 운영
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-racing text-white font-bold mt-1 break-keep-all leading-snug">
                수익금 실전투자대회 4대 시상 & OPEN API 전략 우수사례
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed break-keep-all">
                수익금 챔피언(9명), 꾸준한 수익(1명), 루키 스타(1명), 후반 역전(1명) 및 전략 우수사례(100점 정량심사)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto pt-1 md:pt-0">
            <button
              onClick={() => onNavigate('report')}
              className="flex-1 md:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1"
            >
              <span>시상안내</span>
              <ChevronRight size={15} />
            </button>
            <button
              onClick={() => onNavigate('strategy')}
              className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs sm:text-sm font-racing font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20"
            >
              <span>전략 우수사례</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
