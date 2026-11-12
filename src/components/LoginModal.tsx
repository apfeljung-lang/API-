import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import { LSLogo } from './LSLogo';

export interface UserProfile {
  name: string;
  id: string;
  accountNo: string;
  league?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [loginMethod, setLoginMethod] = useState<'id' | 'cert'>('id');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'id' && (!userId.trim() || !password.trim())) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: userId.trim() ? (userId.includes('lee') ? '이영수' : '김투자') : '김투자',
        id: userId.trim() || 'ls_quant_user',
        accountNo: '312-88-094***',
        league: '챌린저 컵 (3,000클럽)',
      });
      onClose();
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    setUserId('ls_trader_01');
    setPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: '김투자',
        id: 'ls_trader_01',
        accountNo: '312-88-094***',
        league: '챌린저 컵 (3,000클럽)',
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto scrollbar-none bg-gradient-to-b from-[#150a32] to-[#0c061e] border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-2">
            <LSLogo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-racing text-white tracking-tight mt-1">
            LS증권 <span className="text-yellow-400">로그인</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            OPEN API 실전투자대회 참가 및 계좌 연동
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl mb-5 border border-purple-900/50">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('id');
              setErrorMessage('');
            }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              loginMethod === 'id'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ID / 계좌 로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod('cert');
              setErrorMessage('');
            }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              loginMethod === 'cert'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            간편인증 (PASS/금융)
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {loginMethod === 'id' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                아이디 또는 계좌번호
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="LS증권 ID 또는 계좌번호 8자리"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="영문, 숫자, 특수문자 조합"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberId}
                  onChange={(e) => setRememberId(e.target.checked)}
                  className="rounded border-purple-700 text-yellow-400 focus:ring-yellow-400/40 bg-black/50"
                />
                <span>아이디 저장</span>
              </label>
              <a
                href="#find-pwd"
                onClick={(e) => {
                  e.preventDefault();
                  alert('LS증권 고객지원센터(1544-5000) 또는 HTS/MTS에서 비밀번호를 재설정할 수 있습니다.');
                }}
                className="hover:text-yellow-400 transition-colors"
              >
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black rounded-xl shadow-lg shadow-yellow-500/20 font-racing transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>로그인</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-black/40 border border-purple-800/40 text-center">
              <ShieldCheck className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-white mb-1">간편인증 지원</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                PASS 앱, 카카오페이, 토스, 금융인증서로<br />
                빠르고 안전하게 본인인증 후 로그인하세요.
              </p>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black rounded-xl shadow-lg shadow-yellow-500/20 font-racing transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>간편인증으로 빠른 로그인</span>
            </button>
          </div>
        )}

        {/* Quick Demo Fill button */}
        <div className="mt-5 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs">
          <span className="text-slate-400">대회 체험용 계정</span>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="text-yellow-400 hover:text-yellow-300 font-bold underline underline-offset-4 cursor-pointer"
          >
            원클릭 데모 로그인
          </button>
        </div>
      </div>
    </div>
  );
};
