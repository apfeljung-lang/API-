import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, FileText, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, Lock, Terminal, Calculator, Cpu
} from 'lucide-react';

export const RegulationsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    {
      step: '01',
      title: 'LS증권 위탁계좌 준비',
      desc: 'LS증권 종합위탁계좌를 개설하고 참가 기준 예탁자산(최소 100만원 이상)을 입금합니다.',
    },
    {
      step: '02',
      title: 'OPEN API 개발자 포털 인증',
      desc: 'LS증권 OPEN API 포털에서 개발자 등록 및 본인 인증을 거쳐 App Key와 Secret Key를 발급받습니다.',
    },
    {
      step: '03',
      title: '대회 참가 신청 & 리그 배정',
      desc: '대회 시작 시점(2027.01.18) 평가자산에 따라 루키/챌린저/마스터 리그로 자동 확정 배정됩니다.',
    },
    {
      step: '04',
      title: 'API 국내주식 실거래 & 손익 집계',
      desc: 'LS OPEN API를 통해 국내 일반 상장주식을 매매하며, 누적 순수익금(원)이 실시간 집계됩니다.',
    },
  ];

  const faqs = [
    {
      q: '수익률(%)도 시상이나 순위 산정에 반영되나요?',
      a: '아닙니다. 본 대회는 "수익금 평가 원칙 통일"에 따라 수익률 평가를 전면 제외하며, 오직 원화 기준 누적 순수익금(원)만으로 순위를 결정합니다. 수익률은 산정하거나 순위 결정에 사용하지 않습니다.',
    },
    {
      q: '누적 순수익금은 어떻게 계산되나요?',
      a: '누적 순수익금 = 종료 순자산 - 시작 순자산 - 순외부유입액(기간 중 입금액 - 출금액) 산식으로 계산됩니다. 순자산에는 보유주식 평가금액 및 현금잔액이 반영되며, 거래수수료·세금 등 제비용이 전액 차감됩니다. 배당·권리변동·주식 입출고는 별도 보정 기준이 적용됩니다.',
    },
    {
      q: '대회 중간에 입출금 시 참가 리그가 변경되나요?',
      a: '아닙니다. 리그 배정은 대회 개막일(2027.01.18) 장시작 전 평가자산을 기준으로 확정되며, 대회 기간 중 추가 입금이나 출금으로 자산 구간이 변동되더라도 배정된 리그는 종료일까지 유지됩니다.',
    },
    {
      q: '신용·미수나 파생상품 거래도 실적으로 인정되나요?',
      a: '아닙니다. 건전한 투자 환경 조성을 위해 국내 일반 상장주식 현물 거래만 인정되며, 신용·미수 거래 및 선물/옵션 파생상품, 레버리지·인버스 ETP 등은 대회 평가 대상에서 제외됩니다.',
    },
    {
      q: '알고리즘 전략상은 어떻게 운영되나요?',
      a: '기존 알고리즘 전략상은 실전투자대회 수익금 경쟁에서 제외하고, 「OPEN API 전략 우수사례」 프로그램으로 분리 운영됩니다. 수익금이나 수익률과 무관하게 5대 정량 지표(API 활용성, 전략 구체성, 창의성, 위험관리, 전달력) 100점 만점으로 심사합니다.',
    },
    {
      q: '중복 수상이 가능한가요?',
      a: '실전투자대회 수익금 경쟁은 1인 1개 부문 수상을 원칙으로 합니다. 중복 발생 시 1순위(수익금 챔피언) > 2순위(꾸준한 수익상) > 3순위(루키 스타상) > 4순위(후반 역전상) 순으로 상위 부문을 수여하고 차순위 적격자에게 승계합니다. 단, 전략 우수사례 프로그램은 별도 프로그램이므로 중복 선정이 가능합니다.',
    },
  ];

  return (
    <section id="regulations" className="py-14 sm:py-20 border-b border-slate-800/80 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            대회 참가 방법 및 공식 운영규정 (수익금 평가 중심)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            수익률 평가 전면 제외 및 누적 순수익금 단일 평가 원칙과 자본시장법 준법 가이드라인을 준수합니다.
          </p>
        </div>

        {/* 4 Steps Participation Guide */}
        <div className="mb-14">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-yellow-400" />
            <span>대회 참가 절차 (4단계)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div
                key={st.step}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-slate-800 font-mono mb-2">
                    {st.step}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit Calculation Formula Highlight Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border-2 border-yellow-500/40 shadow-xl">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 flex items-center justify-center shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                공식 누적 순수익금(원) 산정 공식 및 원칙
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                대회 모든 시상 부문은 수익금(원)만 평가하며, 수익률은 산정하거나 순위 결정에 사용하지 않습니다.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-yellow-500/30 text-center my-4 font-mono text-sm sm:text-base text-yellow-300 font-bold whitespace-nowrap overflow-x-auto">
            누적 순수익금 = 종료 순자산 − 시작 순자산 − 순외부유입액 (입금액 − 출금액)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">순외부유입액 보정</strong>
              기간 중 입금액에서 출금액을 차감하여 입출금에 따른 순자산 왜곡을 정밀 보정합니다.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">제비용 전액 차감</strong>
              증권거래세, 유관기관제비용, 위탁수수료 등 거래비용을 실시간 반영하여 순수익금을 계산합니다.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">주간 순수익금 기준</strong>
              꾸준한 수익상 및 후반 역전상은 해당 주/기간의 시작·종료 순자산을 기준으로 독립 산정합니다.
            </div>
          </div>
        </div>

        {/* FSS Guidelines Compliance Box */}
        <div className="mb-14 bg-gradient-to-br from-slate-900 via-[#0c1428] to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">
                금융감독원·금융투자협회 건전투자대회 가이드라인 준수 고지
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                거래횟수·거래대금 비례 리워드 금지 및 이상거래 모니터링 원칙을 철저히 준수합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">거래횟수·거래대금 비례 리워드 전면 배제</strong>
                과도한 회전매매를 유도하는 미션, 누적 거래량 달성 시 혜택 지급 등의 요소를 철저히 배제하였습니다.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">고위험 상품 거래 제한</strong>
                신용·미수 거래 및 선물/옵션 파생상품, 레버리지·인버스 ETP 등 고위험 상품은 대회 평가 대상에서 제외됩니다.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">현금 시상 준법 승인 전제</strong>
                시상 예산(1,850만원)은 잠정안이며, 현금 시상 여부는 준법감시부 사전 승인 후 공식 확정됩니다.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">철저한 개인정보 가명처리 및 보안</strong>
                참가자의 실명 및 계좌번호는 엄격히 암호화 마스킹 처리되어 제3자에게 노출되지 않습니다.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-400" />
            <span>자주 묻는 질문 (FAQ)</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="text-yellow-400 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
