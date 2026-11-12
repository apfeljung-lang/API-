import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Building2, Flag, Key, AlertTriangle, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LSLogo } from './LSLogo';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (leagueName: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [apiKey, setApiKey] = useState('ls_api_live_9921_quant_dev');
  const [assetInput, setAssetInput] = useState('25000000'); // 2,500만원
  const [agreedCompliance, setAgreedCompliance] = useState(false);
  const [agreedRisk, setAgreedRisk] = useState(false);
  const [nickname, setNickname] = useState('스피드퀀트봇');

  if (!isOpen) return null;

  const numericAsset = parseInt(assetInput, 10) || 0;
  let targetLeague = '루키 리그';
  let leagueColor = 'text-sky-400 border-sky-500/40 bg-sky-500/10';

  if (numericAsset >= 50000000) {
    targetLeague = '마스터 리그';
    leagueColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  } else if (numericAsset >= 10000000) {
    targetLeague = '챌린저 리그';
    leagueColor = 'text-purple-400 border-purple-500/40 bg-purple-500/10';
  }

  const handleComplete = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffe600', '#a855f7', '#38bdf8', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
    setStep(4);
    setTimeout(() => {
      onSuccess(targetLeague);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto scrollbar-none bg-gradient-to-b from-[#13092b] to-[#0c061e] border-2 border-yellow-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <LSLogo size="sm" />
          <span className="text-xs sm:text-sm font-racing uppercase tracking-wider text-yellow-400 font-bold">
            LS OPEN API TRADING CHALLENGE 참가 신청
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-racing text-white">
          참가자 등록 및 계좌 리그 배정
        </h2>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-between my-6 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-900/60 -translate-y-1/2 -z-0" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-racing transition-all ${
                step > s
                  ? 'bg-emerald-500 text-white'
                  : step === s
                  ? 'bg-yellow-400 text-slate-950 ring-4 ring-yellow-400/30 font-black shadow-md'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Open API Key and Nickname */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">
                참가자 닉네임 설정
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 스피드퀀트봇"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-yellow-400 font-medium"
              />
              <span className="text-xs sm:text-sm text-slate-400 mt-1.5 block">
                리더보드에 노출되는 공개 닉네임입니다 (ID는 가명 마스킹).
              </span>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>LS OPEN API 발급 키 (App Key)</span>
                <span className="text-xs sm:text-sm text-yellow-400 font-bold">개발자 포털 인증완료</span>
              </label>
              <div className="relative">
                <Key className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-base font-mono text-slate-200 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-racing font-extrabold rounded-xl text-base flex items-center gap-2 shadow-lg shadow-yellow-500/25 cursor-pointer"
              >
                <span>다음: 자산 확인 및 클래스 배정</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Asset Check & League Assignment */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">
                대회 참가 계좌 평가 자산
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={assetInput}
                  onChange={(e) => setAssetInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base font-mono text-white focus:outline-none focus:border-yellow-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                  원
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-400 mt-1.5 block whitespace-nowrap">
                입력 금액: {(numericAsset / 10000).toLocaleString()}만원
              </span>
            </div>

            {/* Auto Assigned League Preview */}
            <div className={`p-5 rounded-2xl border ${leagueColor} mt-4`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold">배정 예상 참가 리그</span>
                <span className="text-xs font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-black/30">
                  자동 산정
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-racing text-white mt-1">
                {targetLeague}
              </div>
              <p className="text-sm text-slate-300 mt-1.5">
                {targetLeague === '루키 리그' && '100만원 이상 ~ 1,000만원 미만 구간 (누적 순수익금 1~3위 시상)'}
                {targetLeague === '챌린저 리그' && '1,000만원 이상 ~ 5,000만원 미만 구간 (누적 순수익금 1~3위 시상)'}
                {targetLeague === '마스터 리그' && '5,000만원 이상 고액자산 구간 (누적 순수익금 1~3위 시상)'}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 text-slate-300 hover:text-white text-base font-medium cursor-pointer"
              >
                이전
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-racing font-extrabold rounded-xl text-base flex items-center gap-2 shadow-lg shadow-yellow-500/25 cursor-pointer"
              >
                <span>다음: 금융 규정 및 서약</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Compliance & Risk Disclosure */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-sm text-slate-300 space-y-2.5 leading-relaxed max-h-56 overflow-y-auto">
              <div className="font-bold text-yellow-400 flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>수익금 평가 원칙 및 준법 가이드라인 서약</span>
              </div>
              <p>
                1. 본 대회는 <strong>수익률 평가를 전면 배제</strong>하며 오직 <strong>원화 기준 누적 순수익금(원)</strong>만으로 순위를 결정합니다.
              </p>
              <p>
                2. 국내 일반 상장주식 현물 거래만 인정되며, 신용·미수·파생상품·레버리지/인버스 ETP 등은 대회 평가 대상에서 제외됩니다.
              </p>
              <p>
                3. 과도한 회전매매를 유도하는 <strong>거래횟수나 거래대금에 비례한 리워드 미션</strong>을 일체 운영하지 않습니다.
              </p>
              <p>
                4. 실시간 순위 및 수익금 데이터는 장마감 잠정치이며 거래·권리처리 검증 후 최종 확정됩니다. 투자 원금 손실 위험은 본인에게 귀속됩니다.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={agreedCompliance}
                  onChange={(e) => setAgreedCompliance(e.target.checked)}
                  className="rounded border-slate-700 text-yellow-400 focus:ring-0 w-4 h-4"
                />
                <span>(필수) 대회 운영 규정 및 건전투자 준수 서약에 동의합니다.</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={agreedRisk}
                  onChange={(e) => setAgreedRisk(e.target.checked)}
                  className="rounded border-slate-700 text-yellow-400 focus:ring-0 w-4 h-4"
                />
                <span>(필수) 투자손실 위험 고지 및 개인정보(가명처리) 처리에 동의합니다.</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 text-slate-300 hover:text-white text-base font-medium cursor-pointer"
              >
                이전
              </button>
              <button
                onClick={handleComplete}
                disabled={!agreedCompliance || !agreedRisk}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-racing font-black rounded-xl text-base flex items-center gap-2 shadow-lg shadow-yellow-500/25 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>🏁 챌린지 참가 최종 등록</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success confirmation */}
        {step === 4 && (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-racing text-white">
              대회 참가 등록이 완료되었습니다!
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-yellow-400 font-racing">{targetLeague}</strong>에 공식 배정되었습니다.<br />
              OPEN API를 통한 주문 체결 시 실시간 순위표에 자동 집계됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
