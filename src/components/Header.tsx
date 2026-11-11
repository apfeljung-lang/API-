import { LSLogo } from './LSLogo';
import { UserProfile } from './LoginModal';
import { User, LogOut } from 'lucide-react';

export type NavTab = 'home' | 'dashboard' | 'league' | 'ranking' | 'report' | 'strategy' | 'history' | 'community';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenLogin: () => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
  currentUser,
  onLogout,
}) => {
  const navItems: { key: NavTab; label: string }[] = [
    { key: 'home', label: '홈' },
    { key: 'dashboard', label: '대시보드' },
    { key: 'league', label: '리그참여' },
    { key: 'ranking', label: '랭킹' },
    { key: 'report', label: '시상안내' },
    { key: 'strategy', label: '전략 우수사례' },
    { key: 'history', label: '기록' },
    { key: 'community', label: '커뮤니티' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/60 bg-[#0c061e]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand wordmark matching the attached image LS증권 logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="shrink-0 flex items-center gap-3 sm:gap-3.5 cursor-pointer text-left group"
          title="LS증권 OPEN API 실전투자대회 홈으로 이동"
        >
          {/* Top-left LS증권 Official White Logo */}
          <LSLogo size="md" className="group-hover:opacity-90 transition-opacity" />

          <div className="flex items-center gap-1.5 sm:gap-2 font-racing italic font-black text-xl sm:text-2xl tracking-tight leading-none">
            <span className="text-[#FFCC00] group-hover:text-yellow-300 transition-colors">
              OPEN API
            </span>
            <span className="text-white group-hover:text-slate-100 transition-colors">
              실전투자대회
            </span>
          </div>
        </button>

        {/* 7 Menu Items Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 font-black shadow-md shadow-yellow-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-purple-950/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Changed to 로그인 */}
        <div className="flex items-center gap-2 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-purple-950/70 border border-yellow-400/40 text-xs sm:text-sm font-bold text-yellow-300">
                <User className="w-3.5 h-3.5 text-yellow-400" />
                <span>{currentUser.name} 님</span>
              </div>
              <button
                onClick={onLogout}
                title="로그아웃"
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-racing text-slate-950 bg-yellow-400 hover:bg-yellow-300 font-extrabold rounded-xl shadow-md shadow-yellow-400/25 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>로그인</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
