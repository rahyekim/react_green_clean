
 //날짜 포맷팅 함수 (ISO 스트링이나 날짜 객체를 'YYYY-MM-DD HH:mm:ss'로 변환)
export const formatDate = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  
  // 유효하지 않은 날짜인 경우 처리
  if (isNaN(date.getTime())) return '-';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

 // 2. 숫자 콤마 및 통화 포맷팅 함수 (1000000 -> 1,000,000)
export const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '0';

  const number = Number(value);
  
  if (isNaN(number)) return '0';

  // 자바스크립트 내장 Intl API를 사용하여 성능과 로컬라이징이 뛰어나게 처리
  return new Intl.NumberFormat('ko-KR').format(number);
};