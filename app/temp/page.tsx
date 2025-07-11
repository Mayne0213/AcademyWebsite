"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const ProposalPage = forwardRef<HTMLDivElement>((props, ref) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto p-8 font-['Noto_Sans_KR']">
        {/* Header */}
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#092C4C] to-blue-700 opacity-5 rounded-3xl transform -rotate-1"></div>
          <div className="relative bg-white shadow-2xl rounded-2xl p-12 border border-gray-100">
            <div className="w-20 h-1 bg-gradient-to-r from-[#092C4C] to-blue-600 mx-auto mb-8 rounded-full"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#092C4C] to-blue-700 bg-clip-text text-transparent mb-4">
              학원 전용 웹사이트 솔루션
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">주혜연 영어 학원 맞춤형 개발</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              완전한 학원 관리 시스템과 학생 포털을 통합한 프리미엄 웹 솔루션
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="px-6 py-2 bg-[#092C4C] text-white rounded-full text-sm font-medium">프리미엄 솔루션</div>
              <div className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">맞춤형 개발</div>
              <div className="px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">즉시 운영 가능</div>
            </div>
          </div>
        </motion.div>

        {/* 핵심 가치 제안 */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">💎 이것은 단순한 웹사이트가 아닙니다</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              시중 학원 솔루션 수준의 완전한 디지털 인프라를 제공합니다
            </p>
          </div>
          
          <motion.div 
            variants={staggerContainer} 
            animate="animate"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🚀",
                title: "즉시 운영 가능",
                desc: "개발부터 배포까지 완료된 상태로 제공",
                highlight: "바로 사용 시작"
              },
              {
                icon: "🎯",
                title: "학원 전용 설계",
                desc: "학원 운영에 필요한 모든 기능을 통합",
                highlight: "맞춤형 솔루션"
              },
              {
                icon: "💼",
                title: "프리미엄 품질",
                desc: "기업급 보안과 안정성을 보장",
                highlight: "전문가 수준"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-[#092C4C]/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    {item.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 포함된 기능 */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📱 포함된 핵심 기능</h2>
            <p className="text-lg text-gray-600">시중 학원 솔루션 대비 월등한 기능과 사용자 경험</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                category: "🔐 사용자 관리 시스템",
                color: "from-purple-500 to-purple-700",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                features: [
                  "회원가입 + 학생 정보 입력 2단계 폼",
                  "쿠키 기반 보안 인증 시스템", 
                  "역할별 권한 관리 (관리자/학생)",
                  "개인정보 관리 및 수정"
                ]
              },
              {
                category: "💬 커뮤니케이션 플랫폼",
                color: "from-blue-500 to-blue-700", 
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                features: [
                  "Q&A 게시판 + 첨부파일 지원",
                  "공지사항 이미지 다중 업로드",
                  "실시간 댓글 시스템",
                  "학원별 필터링 기능"
                ]
              },
              {
                category: "📊 관리자 대시보드",
                color: "from-green-500 to-green-700",
                bgColor: "bg-green-50", 
                borderColor: "border-green-200",
                features: [
                  "학생 정보 통합 관리",
                  "출석 체크 및 통계",
                  "성적 입력 및 분석 차트",
                  "상담 예약 및 기록 관리"
                ]
              },
              {
                category: "☁️ 클라우드 인프라",
                color: "from-orange-500 to-orange-700",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200", 
                features: [
                  "AWS S3 파일 저장소 연동",
                  "Vercel + PlanetScale 자동 배포",
                  "다양한 파일 형식 지원",
                  "자동 백업 및 복구 시스템"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className={`${section.bgColor} ${section.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}
              >
                <div className={`bg-gradient-to-r ${section.color} text-white rounded-xl p-4 mb-6`}>
                  <h3 className="text-xl font-bold">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#092C4C] to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 기술 스택 */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🛠 최신 기술 스택</h2>
            <p className="text-lg text-gray-600">기업급 성능과 확장성을 보장하는 검증된 기술</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Frontend",
                  icon: "⚛️",
                  gradient: "from-cyan-500 to-blue-500",
                  items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"]
                },
                {
                  title: "Backend", 
                  icon: "🔧",
                  gradient: "from-green-500 to-emerald-500",
                  items: ["Node.js", "Prisma ORM", "JWT Auth", "API Routes"]
                },
                {
                  title: "Database",
                  icon: "🗄️", 
                  gradient: "from-purple-500 to-violet-500",
                  items: ["MySQL", "PlanetScale", "Auto Backup"]
                },
                {
                  title: "Infrastructure",
                  icon: "☁️",
                  gradient: "from-orange-500 to-red-500", 
                  items: ["Vercel", "AWS S3", "Auto Deploy", "CDN"]
                }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tech.gradient} rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {tech.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-3">{tech.title}</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {tech.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 프로젝트 비용 */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">💰 투자 가치 & 비용</h2>
            <p className="text-lg text-gray-600">완전한 디지털 인프라 구축 비용</p>
          </div>
          
          {/* 메인 가격 */}
          <motion.div 
            variants={scaleIn}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#092C4C] to-blue-700 rounded-3xl transform rotate-1 opacity-10"></div>
            <div className="relative bg-gradient-to-r from-[#092C4C] to-blue-700 text-white rounded-3xl p-12 text-center shadow-2xl">
              <div className="mb-4">
                <span className="text-lg font-medium opacity-90">개인 맞춤형 솔루션</span>
              </div>
              <div className="text-6xl font-bold mb-4">250만원</div>
              <div className="text-xl opacity-90 mb-6">완전한 구축 + 배포 + 세팅 포함</div>
              <div className="flex justify-center gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">✓ 즉시 운영 가능</div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">✓ 1개월 유지보수</div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">✓ 브랜딩 커스터마이징</div>
              </div>
            </div>
          </motion.div>

          {/* 가격 구성 */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "기본 구축비",
                price: "200만원",
                desc: "완성된 웹사이트 + 모든 기능",
                color: "bg-blue-50 border-blue-200"
              },
              {
                title: "배포 & 세팅",
                price: "+20만원", 
                desc: "실서버 배포 + 도메인 연결",
                color: "bg-green-50 border-green-200"
              },
              {
                title: "브랜딩 커스터마이징",
                price: "+30만원",
                desc: "로고, 색상, UI 맞춤 조정",
                color: "bg-purple-50 border-purple-200"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: 0.1 * index }}
                className={`${item.color} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300`}
              >
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <div className="text-2xl font-bold text-[#092C4C] mb-3">{item.price}</div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* 부가 서비스 */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-center mb-8 text-gray-800">🎁 추가 서비스 (선택사항)</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {[
                { service: "유지보수 연장 (월)", price: "25만원", desc: "버그 수정, 업데이트, 모니터링" },
                { service: "기능 추가 개발", price: "시간당 10만원", desc: "새로운 기능 개발 및 통합" },
                { service: "사용자 교육 및 지원", price: "회당 20만원", desc: "운영진 교육 및 사용법 안내" },
                { service: "데이터 마이그레이션", price: "30만원", desc: "기존 데이터 이전 및 정리" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{item.service}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                  <div className="font-bold text-[#092C4C]">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 프로젝트 타임라인 */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">⏱️ 프로젝트 일정</h2>
            <p className="text-lg text-gray-600">빠르고 체계적인 구축 프로세스</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#092C4C] to-blue-600"></div>
            <div className="space-y-8">
              {[
                { week: "1주차", title: "커스터마이징 & 브랜딩", desc: "로고, 색상, UI 맞춤 조정", icon: "🎨" },
                { week: "2주차", title: "데이터 세팅 & 테스트", desc: "초기 데이터 입력 및 기능 검증", icon: "🔧" },
                { week: "3주차", title: "배포 & 도메인 연결", desc: "실서버 배포 및 운영 환경 구축", icon: "🚀" },
                { week: "4주차", title: "교육 & 인수인계", desc: "사용법 교육 및 운영 가이드 제공", icon: "📚" }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  transition={{ delay: 0.1 * index }}
                  className="relative flex items-center gap-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#092C4C] to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-10">
                    {phase.icon}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-[#092C4C] text-white px-3 py-1 rounded-full text-sm font-bold">{phase.week}</span>
                      <h4 className="text-xl font-bold text-gray-800">{phase.title}</h4>
                    </div>
                    <p className="text-gray-600">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 연락처 & CTA */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-[#092C4C] rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">🚀 지금 바로 시작하세요</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                완전한 학원 디지털 인프라를 즉시 구축하고 운영을 시작할 수 있습니다
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: "📞", label: "전화 상담", value: "[개발자 전화번호]" },
                  { icon: "📧", label: "이메일", value: "[개발자 이메일]" },
                  { icon: "💬", label: "카카오톡", value: "[개발자 카카오톡]" }
                ].map((contact, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl mb-2">{contact.icon}</div>
                    <div className="font-medium mb-1">{contact.label}</div>
                    <div className="text-sm opacity-80">{contact.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4">📋 상담 프로세스</h3>
                <div className="text-left space-y-2 text-sm">
                  {[
                    "1. 무료 상담 및 요구사항 논의",
                    "2. 맞춤형 견적서 및 계약서 작성", 
                    "3. 계약 체결 및 프로젝트 시작",
                    "4. 주간 진행상황 보고",
                    "5. 최종 검수 및 서비스 오픈"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="text-center py-8 border-t border-gray-200 text-gray-600"
        >
          <p className="font-medium mb-2">본 제안서는 실제 구축된 시스템을 기반으로 작성되었습니다.</p>
          <p className="text-sm">상세한 기능 시연이나 추가 문의사항이 있으시면 언제든 연락주시기 바랍니다.</p>
        </motion.footer>
      </div>
    </div>
  );
});

ProposalPage.displayName = "ProposalPage";

export default ProposalPage;