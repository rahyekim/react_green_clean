    // 💡 최신 Temporal API를 활용한 날짜 포맷 함수
    export const formatDate = (dateString: string) => {
        
        if (!dateString) return ''; // 빈 값 방어 코드 추가

        let dateTime;
        
        try {
            // 1. UTC 기준 ISO 문자열일 경우 (예: 2026-09-21T05:30:00Z) -> 한국 시간으로 변환
            dateTime = Temporal.Instant.from(dateString).toZonedDateTimeISO('Asia/Seoul');
        } catch (error) {
            // 2. 타임존 정보가 없는 일반 문자열일 경우 (예: 2026-09-21 14:30:00) 공백을 T로 치환 후 파싱
            const safeString = dateString.replace(' ', 'T');
            dateTime = Temporal.PlainDateTime.from(safeString);
        }

        // Temporal 객체에서 직관적으로 년/월/일/시/분 추출 (달이 0부터 시작하지 않고 1부터 시작함!)
        const year = dateTime.year;
        const month = String(dateTime.month).padStart(2, '0');
        const day = String(dateTime.day).padStart(2, '0');
        const hour = String(dateTime.hour).padStart(2, '0');
        const minute = String(dateTime.minute).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}`;
    };