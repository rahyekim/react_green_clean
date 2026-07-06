/*
자바 8이전과 이후로 나뉨
java.util.Date and Calendar 는 치명적인 설계의 결함
월이 0부터 시작
불변객체가 아님(Mutable) 
생성된 날짜 객체의 값을 setter로 바꿀 수있다.
명확하지 않은 이름 Date라고 하지만 실제로는 시간까지 포함
자바에서는...java.time 도입 
이패키지의 핵심뼈대가 Temporal 인터페이스 
3대장 :모두 불변으로 안전
🟢 LocalDate: 날짜만 필요할때 
🟢 LocalTime: 시간만
🟢 LocalDateTime: 날짜시간 
ZonedDateTime //Duration / Period
plusDays(), minusMonths()와같이 인간의 언어에 가까운 직관적인 메서드 제공
 */

import java.util.Calendar;
import java.util.Date;
//유지보수해야할때 사용
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class Date_14 {
    
    public void issueCouponMordern(){
        LocalDateTime issuDate = LocalDateTime.now();
        LocalDateTime expirDate = issuDate.plusMonths(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        
        System.out.println("쿠폰발급");
        System.out.println("발급일: " + issuDate.format(formatter));
        System.out.println("만료일: " + expirDate.format(formatter));
        
        //비지니스 로직 
        boolean isValid = LocalDateTime.now().isBefore(expirDate);
        System.out.println("현재쿠폰 사용가능 여부: " +isValid );
        

    }

    public void issueCouponLegacy(){

        //현재 시간가져오기
        Calendar calendar= Calendar.getInstance();
        Date issuDate= calendar.getTime();
        
        // 한달 더하기
        calendar.add(Calendar.MONTH, 1);
        Date expiDate= calendar.getTime();

        System.out.println("발급일: " + issuDate);
        System.out.println("만료일: " + expiDate);
    }

    public static void main(String [] args){

        Date_14 example = new Date_14();
        example.issueCouponMordern();
        example.issueCouponLegacy();
    }
    
    
}

/*
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateExam {
    public static void main(String[] args) {
        // 1. 오늘 날짜 구하기 (연-월-일 깔끔하게 나옴!)
        LocalDate today = LocalDate.now();
        System.out.println("오늘: " + today); // 출력 예: 2026-07-01

        // 2. 100일 뒤 계산하기 (기존 오늘 날짜는 변하지 않고, 새 날짜를 반환!)
        LocalDate hundredDaysLater = today.plusDays(100);
        System.out.println("100일 뒤: " + hundredDaysLater);

        // 3. 특정 날짜와 시간 지정하기
        LocalDateTime appointment = LocalDateTime.of(2026, 12, 25, 14, 30);
        System.out.println("크리스마스 약속: " + appointment); // 2026-12-25T14:30
    }
}
*/
