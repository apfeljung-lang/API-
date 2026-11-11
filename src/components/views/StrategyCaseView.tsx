import React, { useState } from 'react';
import { 
  FileText, Video, CheckCircle2, AlertTriangle, Send, 
  Sparkles, Award, Shield, ChevronRight, Layers, HelpCircle, Eye 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STRATEGY_CASE_CRITERIA, MOCK_STRATEGY_CASES } from '../../data/mockData';
import { StrategyCaseSubmission } from '../../types';

export const StrategyCaseView: React.FC = () => {
  const [cases, setCases] = useState<StrategyCaseSubmission[]>(MOCK_STRATEGY_CASES);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<StrategyCaseSubmission | null>(cases[0]);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('퀀트알고리즘러');
  const [league, setLeague] = useState('챌린저 리그');
  const [summary, setSummary] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    '웹소켓 실시간 호가/체결 스트리밍',
    '초고속 매수/매도 분할 주문 API',
  ]);
  const [executionMethod, setExecutionMethod] = useState('');
  const [riskManagement, setRiskManagement] = useState('');
  const [docType, setDocType] = useState<'소개서(PDF)' | '영상(3분 이내)'>('소개서(PDF)');
  const [docLink, setDocLink] = useState('');
  const [agreedGuidelines, setAgreedGuidelines] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const availableFeatures = [
    '웹소켓 실시간 호가/체결 스트리밍',
    '초고속 매수/매도 분할 주문 API',
    '잔고 및 주문체결 실시간 조회 API',
    '재무 및 투자자별 순매수 통계 API',
    '장시작/마감 동시호가 자동 청산',
    '초당 레이트리밋(TPS) 버퍼 큐',
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !agreedGuidelines) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#a855f7', '#fbbf24', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    const newSubmission: StrategyCaseSubmission = {
      id: `case-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || '익명 퀀트',
      league,
      submittedAt: new Date().toISOString().split('T')[0],
      summary: summary.trim(),
      apiFeatures: selectedFeatures,
      executionMethod: executionMethod.trim() || 'OPEN API 비동기 처리 파이프라인',
      riskManagement: riskManagement.trim() || '네트워크 단절 시 자동 락다운 및 로스컷',
      documentType: docType,
      status: '접수완료',
      score: {
        apiUtilization: 33,
        strategyClarity: 24,
        creativity: 19,
        riskControl: 14,
        presentation: 5,
        total: 95,
      },
    };

    setCases([newSubmission, ...cases]);
    setSelectedCase(newSubmission);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      // Reset form
      setTitle('');
      setSummary('');
      setExecutionMethod('');
      setRiskManagement('');
      setDocLink('');
      setAgreedGuidelines(false);
    }, 2000);
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
            OPEN API 전략 우수사례 프로그램
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
            OPEN API 활용 경험과 우수 전략을 발굴하기 위해 별도로 운영되는 정량 평가 프로그램입니다.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitOpen(!isSubmitOpen)}
          className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-racing font-black text-sm rounded-xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto transform active:scale-95"
        >
          <Send size={16} />
          <span>{isSubmitOpen ? '접수창 닫기' : '전략 우수사례 공모 접수'}</span>
        </button>
      </div>

      {/* Program Core Principle Alert Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/40 mb-10 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40">
            <Sparkles size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[11px] font-mono">
                수익금 경쟁 분리 운영
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-racing text-white mt-1">
              실전투자 성과 시상과 분리된 독립 전략 평가 체계
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              본 프로그램은 고객의 <strong>실제 수익금이나 수익률, 거래횟수, 거래대금을 전면 배제</strong>하고,
              오직 LS OPEN API 기능을 얼마나 목적에 맞게 안정적으로 구현하고 위험을 체계적으로 관리했는지를 5대 정량 지표(100점 만점)로 심사합니다.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-cyan-500/20 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>제출 자료: 소개서 1~3페이지(PDF) 또는 3분 영상</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>소스코드 전체 제출 불필요 (API 키 등 민감정보 제출 금지)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>우수사례 선정 시 교육·세미나 및 콘텐츠 활용</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Item Evaluation Criteria Grid (100 Points) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-racing uppercase tracking-wider text-yellow-400 font-bold">
              EVALUATION MATRIX (TOTAL 100 PTS)
            </span>
            <h3 className="text-xl sm:text-2xl font-racing text-white mt-0.5">
              5대 심사 평가 기준 및 배점표
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            수익금·수익률 제외
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {STRATEGY_CASE_CRITERIA.map((criterion, idx) => (
            <div
              key={criterion.category}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    0{idx + 1}
                  </span>
                  <span className="text-lg font-racing text-cyan-400 font-black whitespace-nowrap">
                    {criterion.points}점
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-racing text-white mb-1.5 font-bold whitespace-nowrap">
                  {criterion.category}
                </h4>
                <div className="text-xs font-semibold text-cyan-300 mb-2">
                  {criterion.title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {criterion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Form Modal/Panel */}
      {isSubmitOpen && (
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10092d] to-[#0a051d] border-2 border-cyan-500/50 shadow-2xl relative">
          <h3 className="text-xl sm:text-2xl font-racing text-white mb-2 flex items-center gap-2.5">
            <Send className="text-cyan-400" size={22} />
            <span>OPEN API 전략 우수사례 온라인 공모 접수</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            운영 중인 알고리즘의 목적, API 활용 방식, 위험관리 체계를 기술하여 제출해 주세요. (민감정보 제외)
          </p>

          {submitSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-racing text-white">전략 우수사례가 성공적으로 접수되었습니다!</h4>
              <p className="text-sm text-slate-300">
                심사위원회의 5대 기준 평가 후 우수사례 선정 결과가 공지됩니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    전략 제목 (명칭)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 변동성 돌파 및 호가 잔량 불균형 자동 집행 시스템"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    제출자 닉네임 & 참가 리그
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="flex-1 bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                    <select
                      value={league}
                      onChange={(e) => setLeague(e.target.value)}
                      className="bg-slate-950 border border-purple-900/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="루키 리그">루키 리그</option>
                      <option value="챌린저 리그">챌린저 리그</option>
                      <option value="마스터 리그">마스터 리그</option>
                      <option value="일반 API 고객">일반 API 고객</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                  전략의 목적 및 기본 아이디어 요약
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="전략이 해결하고자 하는 시장 비효율성이나 퀀트 접근 방식을 2~3문장으로 요약해 주세요."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                  활용한 LS OPEN API 주요 기능 (다중 선택)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {availableFeatures.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span>{feat}</span>
                        {isChecked && <CheckCircle2 size={14} className="text-cyan-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    전략 운영 절차 및 실행 방식 (25점 배점)
                  </label>
                  <input
                    type="text"
                    placeholder="예: Python asyncio 기반 배치 수집 및 비동기 REST 주문 전송 파이프라인"
                    value={executionMethod}
                    onChange={(e) => setExecutionMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    오류 대응 및 리스크 관리 체계 (15점 배점)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 초당 15TPS 제한 큐 버퍼, 통신 단절 시 자동 락다운 및 최대 손실 -2.5% 로스컷"
                    value={riskManagement}
                    onChange={(e) => setRiskManagement(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    제출 자료 형태
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDocType('소개서(PDF)')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                        docType === '소개서(PDF)'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <FileText size={16} />
                      <span>소개서 1~3페이지 (PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocType('영상(3분 이내)')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                        docType === '영상(3분 이내)'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Video size={16} />
                      <span>영상 3분 이내 (YouTube/Link)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                    제출 문서/영상 URL 링크 또는 저장소
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... 또는 영상 링크"
                    value={docLink}
                    onChange={(e) => setDocLink(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Compliance & Security Checkbox */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <Shield size={15} />
                  <span>보안 및 개인정보 준수 서약</span>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer leading-relaxed text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreedGuidelines}
                    onChange={(e) => setAgreedGuidelines(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-cyan-400 focus:ring-0 w-4 h-4"
                  />
                  <span>
                    (필수) 본 제출물에 API Key, Secret Key, 계좌번호 등 민감정보를 포함하지 않았음을 확인하며,
                    수익률/수익금 지표와 무관하게 5대 정량 지표에 따른 공정한 심사 및 향후 교육/콘텐츠 활용에 동의합니다.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(false)}
                  className="px-5 py-2.5 text-slate-400 hover:text-white text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!agreedGuidelines || !title.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-racing font-black text-sm rounded-xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Send size={16} />
                  <span>공모 접수 완료</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Showcase: Selected & Candidate Cases */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-xs font-racing uppercase tracking-wider text-cyan-400 font-bold">
              SUBMITTED CASES & SELECTIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-racing text-white mt-0.5">
              전략 우수사례 출품작 쇼케이스
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">총 {cases.length}건 등록</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* List of cases */}
          <div className="lg:col-span-1 space-y-3">
            {cases.map((item) => {
              const isSelected = selectedCase?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-md ring-2 ring-cyan-400/30'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded font-racing font-bold text-cyan-300 bg-cyan-500/20">
                      {item.documentType}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.submittedAt}</span>
                  </div>
                  <h4 className="text-sm font-racing text-white line-clamp-2 leading-snug font-bold">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-400">
                    <span>{item.author} ({item.league})</span>
                    {item.score && (
                      <span className="text-cyan-400 font-racing font-bold">
                        {item.score.total}점
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed View of Selected Case */}
          <div className="lg:col-span-2">
            {selectedCase ? (
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0f0926]/90 border border-purple-900/60 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-purple-900/50 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded text-xs font-racing font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40">
                        {selectedCase.status}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {selectedCase.author} · {selectedCase.league}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-racing text-white font-bold">
                      {selectedCase.title}
                    </h3>
                  </div>

                  {selectedCase.score && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-center shrink-0">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold whitespace-nowrap">종합 심사점수</span>
                      <span className="text-2xl font-racing text-cyan-400 font-black whitespace-nowrap">
                        {selectedCase.score.total}<span className="text-xs font-normal text-slate-400"> / 100</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Score breakdown bar */}
                {selectedCase.score && (
                  <div>
                    <span className="text-xs font-racing uppercase tracking-wider text-slate-300 block mb-2 font-bold whitespace-nowrap">
                      5대 지표별 심사위원 배점 결과
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] whitespace-nowrap">API 활용성 (35)</span>
                        <span className="text-sm font-racing text-cyan-300 font-bold mt-0.5 block whitespace-nowrap">{selectedCase.score.apiUtilization}점</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] whitespace-nowrap">전략 구체성 (25)</span>
                        <span className="text-sm font-racing text-cyan-300 font-bold mt-0.5 block whitespace-nowrap">{selectedCase.score.strategyClarity}점</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] whitespace-nowrap">창의성 (20)</span>
                        <span className="text-sm font-racing text-cyan-300 font-bold mt-0.5 block whitespace-nowrap">{selectedCase.score.creativity}점</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] whitespace-nowrap">위험관리 (15)</span>
                        <span className="text-sm font-racing text-emerald-400 font-bold mt-0.5 block whitespace-nowrap">{selectedCase.score.riskControl}점</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] whitespace-nowrap">전달력 (5)</span>
                        <span className="text-sm font-racing text-yellow-400 font-bold mt-0.5 block whitespace-nowrap">{selectedCase.score.presentation}점</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-racing text-slate-300 uppercase tracking-wider mb-1.5 font-bold">
                    전략 개요 및 핵심 메커니즘
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    {selectedCase.summary}
                  </p>
                </div>

                {/* API Features Tag */}
                <div>
                  <h4 className="text-xs font-racing text-slate-300 uppercase tracking-wider mb-2 font-bold">
                    연동 및 활용한 LS OPEN API 기능
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.apiFeatures.map((feat) => (
                      <span
                        key={feat}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Execution & Risk Control */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-yellow-400 block mb-1">
                      ⚙️ 실행 구조 및 파이프라인
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedCase.executionMethod}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">
                      🛡️ 이상오류 대응 및 리스크 컷
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedCase.riskManagement}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
                선택된 사례가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
