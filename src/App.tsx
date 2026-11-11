import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { LeagueParticipationView } from './components/views/LeagueParticipationView';
import { RankingView } from './components/views/RankingView';
import { ReportView } from './components/views/ReportView';
import { StrategyCaseView } from './components/views/StrategyCaseView';
import { HistoryView } from './components/views/HistoryView';
import { CommunityView } from './components/views/CommunityView';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal, UserProfile } from './components/LoginModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRegisterSuccess = (leagueName: string) => {
    setIsRegisterOpen(false);
    showToast(`${leagueName}에 공식 등록 완료되었습니다.`);
    setActiveTab('dashboard');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    showToast(`${user.name}님 환영합니다! 대회 참가 계좌가 연결되었습니다.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('로그아웃되었습니다.');
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl border border-blue-400/40 text-xs sm:text-sm font-bold flex items-center gap-2">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with 7 Menu Navigation: 홈, 대시보드, 리그참여, 랭킹, 리포트, 기록, 커뮤니티 */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Rendered by Selected Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onOpenRegister={() => setIsRegisterOpen(true)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'dashboard' && <DashboardView />}

        {activeTab === 'league' && (
          <LeagueParticipationView onSuccess={handleRegisterSuccess} />
        )}

        {activeTab === 'ranking' && <RankingView />}

        {activeTab === 'report' && (
          <ReportView onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'strategy' && <StrategyCaseView />}

        {activeTab === 'history' && <HistoryView />}

        {activeTab === 'community' && <CommunityView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegisterSuccess}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
