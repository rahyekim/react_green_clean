
export interface MenuItem{
  href: string;
  label: string;
}

//헤더, 사이드바
export const NAV_MENUS:MenuItem[] = [
  { href: '/admin/process', label: '라인 공정 제어' },
  { href: '/admin/components', label: '핵심 부품 SCM' },
  { href: '/admin/quality', label: '비전 품질 검사' },
  { href: '/admin/cleanroom', label: '클린룸 & 설비' },
  { href: '/admin/analytics', label: '실시간 통합 관제' },
];

//사이드바
export const SYSTEM_MENUS :MenuItem[]= [
    { href: '/admin/master-data', label: '기준 정보 관리' },
    { href: '/admin/users', label: '사용자 권한 관리' },
    { href: '/admin/settings', label: '시스템 환경 설정' },
]