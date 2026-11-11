import React from 'react';
import { Shield } from 'lucide-react';
import { LSLogo } from './LSLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070312] border-t border-purple-950 text-slate-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Statutory Investment Risk Warning */}
        <div className="p-6 rounded-2xl bg-[#0e0722]/80 border border-purple-900/40 text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2.5">
          <div className="flex items-center gap-2.5 font-bold text-slate-200">
            <Shield className="w-5 h-5 text-yellow-400 shrink-0" />
            <span className="font-racing tracking-wide text-white text-sm sm:text-base">투자 전 반드시 확인하세요 (투자 유의사항)</span>
          </div>
          <p>
            · 본 대회는 투자 권유를 목적으로 하지 않으며, 참가자의 투자 판단에 따른 결과는 전적으로 투자자 본인에게 귀속됩니다.
          </p>
          <p>
            · 금융투자상품은 자산가격 변동 등에 따라 투자원금의 손실(0~100%)이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다.
          </p>
          <p>
            · 금융상품은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.
          </p>
          <p>
            · OPEN API를 통한 자동매매 시 통신망 장애, 시스템 점검, 서버 지연 등으로 인해 주문 전송 및 체결이 지연되거나 실패할 수 있으므로 리스크 관리에 만전을 기하시기 바랍니다.
          </p>
          <p>
            · 본 대회의 모든 리더보드 순위 및 수익 지표는 장마감 기준 잠정치이며, 이상매매 조사 및 심사를 거쳐 최종 확정됩니다.
          </p>
        </div>

        {/* Brand & Contact Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-5 border-t border-purple-950/60">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LSLogo size="sm" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              서울특별시 영등포구 여의나루로 76 LS증권빌딩 · 사업자등록번호: 116-81-22485 <br />
              고객지원센터: 1544-5000 (평일 08:00 ~ 18:00) · OPEN API 기술지원: openapi@ls-sec.co.kr
            </p>
          </div>

          <div className="text-right text-xs sm:text-sm text-slate-400">
            <span className="block font-mono text-slate-300 font-semibold mb-1">
              LS증권 준법감시인 심사필 제2027-T0118호
            </span>
            <span>(2027.01.18 ~ 2027.02.19)</span>
            <div className="mt-2 text-slate-500 text-xs">
              © 2027 LS Securities Co., Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
