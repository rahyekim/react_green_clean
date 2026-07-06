import java.util.Arrays;

/*자바 내장형 array: 정해진것에 최적 고정형 ex) int[] arr = new int[5]; 같은 기본 배열
java util array로 1)크기가 변하는 동적 배열을 쓰고 싶을 때 
B) 고정형 배열을 편하게 요리하고 싶을 때 */

enum OrderStatus { // 자바에서 public은 한 번만 나와야함, enum사용일떄는 파일명과 일치해야함.

    // 1.상수정의
    PAYMENT_WAITING("결제대기", true),
    PREPARING("상품준비중", true),
    SHIPPED("배송중", false),
    DELIVERED("배송완료", false),
    CANCELED("주문취소", false); // 👈 세미콜론 필수

    // 2.필드정의 : final(불변성)을 붙여 안전하게 보호 & private(캡슐화)
    private final String description; // 화면에 노출될 설명
    private final boolean cancellable; // 취소가능여부

    // 3.생성자(💡enum에서의 생성자는 private) : new orderstatus 못찍어내게
    //private OrderStatus(){} : private 생략가능하나 public쓰면안됨
    OrderStatus(String description, boolean cancellable) {
        this.description = description;
        this.cancellable = cancellable;
    }

    // 4.getter메서드
    public String getDescription() {
        return description;
    }

    public boolean isCancellable() {
        return cancellable;
    }

    // 5.실무활용로직
    // static이 있으니까 new 없이 바로 호출 가능!(new 못쓰잖아)
    public static OrderStatus from(String name) {
        /*
         * 정적팩토리 메서드(static) 객체를 생성하거나 반환할때 사용하는 패턴
         * 하나의 매개변수를 받아서(String name: "SHIPPED") 
         * 해당 타입의 인스턴스(OrderStatus.SHIPPED)를 반환할때(실사용 객체)
         * 실무에서는 관례적으로 from이나 of라는 메서드 이름을 사용
         */

        return Arrays.stream(OrderStatus.values()) //배열로...
            // 이배열을 자바스크립트로 변환-> for반복문을사용하지않고 데이터를 함수형으로 깔금하게 처리하기
            // 위한 시작
            /*
                * orderstatus.values() 모든상수를 배열로 전환=>
                * Stream=> filter(),map(),findFirst() 등 메서드 기능활용할수있음
                */
            .filter(status -> status.name().equalsIgnoreCase(name)) //대소문자 무시하고 비교
/*
status.name enum상수의 원래 이름  (예:"DELiVERED")   
외부 API나 프론트엔드에서  대소문자를 섞어서 보내더라도
무시하고 일치하는지 검사   
*/
            .findFirst()// 필터링조건에 맞는 첫번째 요소 찾기
            // 찾은값이 없으면? 메세지 남김
            .orElseThrow(() -> new IllegalArgumentException("알수없는 주문상태입니다: " + name));
    }

}

public class Enum_13 { // enum을 끌어다 사용하는 클래스는..문기만한

    public void cancelOrder(OrderStatus currentStatus) {
        if (currentStatus.isCancellable()) {
            System.out.println("주문이정상취소되었습니다");
        } else {
            System.out.println("취소불가 현재상태 [" + currentStatus.getDescription() + "] 입니다");
        }
    }

    public static void main(String[] args) {

        Enum_13 service = new Enum_13(); //객체선언

        // 상황1 상품중비중일때 취소시도
        OrderStatus status1 = OrderStatus.PREPARING;
        service.cancelOrder(status1);

        // 상황2 배송중일때 취소 시도
        OrderStatus status2 = OrderStatus.SHIPPED;
        service.cancelOrder(status2);

        //상황3 🟢.from()
        // 문자열 같은 외부 데이터를 안전하게 enum으로 변환하는 단일 통로(API)
        OrderStatus apiStatus = OrderStatus.from("DELIVERED");
        System.out.println("API상태 변환결과: " + apiStatus.getDescription());

        String enumeration = "열거형" +
            "서로 관련된 상수들의 집합을 정의할때 사용하는 자료형" +
            "C나 C++의 enum 단순히 정수값에 이름을 붙인거라면" +
            "자바의 enum은 완전한 기능을 갖춘 클래스" +
            "자바 enum의 특징: " +
            "타입 안정성 보장: 컴파일 타임에 타입을 체크 예상치 못한값이 들어오는걸 원천 차단" +
            "데이터와 로직의 결합: 상수 자체가 객체이기 때문에 내부에 필드(변수)와 메서드를 가짐" +
            "리팩토링과 유지보수에 용이: 상태코드가 추가되거나 변경될때 enum 클래스 하나만 수정하면" +
            "관련된 로직이 모두 안전하게 반영"

            /*

🌱 DB 매핑 핵심 구조 (실무 핵심)           DB (S)
code        → DB 값                OrderStatus.fromCode("S")
name        → enum 이름             OrderStatus.SHIPPED
description → 화면 표시              UI: "배송중"

public enum OrderStatus {

    PAYMENT_WAITING("P", "결제대기"),
    PREPARING("PR", "상품준비중"),
    SHIPPED("S", "배송중"),
    DELIVERED("D", "배송완료"),
    CANCELED("C", "주문취소");

    private final String code;
    private final String description;

    OrderStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }
}

public static OrderStatus fromCode(String code) {
    return Arrays.stream(values())
            .filter(v -> v.code.equals(code))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("잘못된 코드"));
}


code   name        description
--------------------------------
P      PAYMENT     결제대기
PR     PREPARE     상품준비중
S      SHIPPED     배송중
D      DELIVERED   배송완료
C      CANCELED    주문취소
     

🌟캡슐화(Encapsulation)
자바는 “데이터를 마음대로 만지는 것”을 막고
“통제된 방식으로만 접근하게 만들기 위해” private + getter 구조를 씀 

외부
  ↓ (직접 접근 금지)
private 변수
  ↓ (getter/setter)
통제된 접근 : 안전하게 통제된 방식으로 접근하게



비교               의미                     비교대상 
------------------------------------------------------
==            주소(같은 객체?)              메모리위치
equals()       값 (내용 비교)              실제 데이터 


문자열 비교를 ==로 하면 위험 (false 나올 수 있음)
🔥 문자열 비교(String)는 .equals() 써야함

enum은 예외 JVM에서 객체가 하나만 존재(싱글톤) : == 써도 안전
*/

/*
➡️ static이 없는 일반 메서드 (인스턴스 메서드)
🔥 new를 통해 객체를 생성해야만 쓸 수 있음 
(각 객체마다 다른 데이터를 다룰 때 사용)

➡️ static이 있는 메서드 (정적 메서드): 
공통으로 쓰이는 기능 또는 from 처럼 객체를 조회/생성해 주는 공장 역할을 할 때 사용
🔥 new 없이 클래스 이름으로 바로 쓸 수 있음
프로그램이 실행되는 순간 메모리에 딱 하나 알아서 올라가기 때문에, 
클래스 이름에 점(.)만 찍어서 바로 쓸 수 있습니다.
->객체마다 상태를 다르게 가질 필요가 없는 '순수한 기능(유틸리티)'일 때는 
굳이 new로 메모리를 낭비할 필요 없이 static으로 만드는 것이 훨씬 편함

*/

/*
자바 기본 배열(int[])은 크기가 고정된 최적화형이고 
java.util은 이를 보완하는 동적/편의용 도구이며, 
enum은 속성(final)과 생성자(private)를 결합해 
대소문자 구분 없이(equalsIgnoreCase) 정품 마크를 변환·검증(from())하는 안전한 클래스이고,
 interface는 내용 없는 추상 메서드로 자식 클래스에게 무조건 구현하도록 강제하는 계약서이다.

자바 기본 배열(int[])은 크기가 고정된 대신 속도가 가장 최적화되어 있고, 
이를 보완하기 위해 크기가 변하는 동적 배열이나 배열을 편하게 요리하는 도구로 
java.util 라이브러리를 가져다 쓰며, enum은 서로 관련된 상수의 집합이자 
완전한 기능을 갖춘 클래스로서 내부에 변경 불가능한 속성(private final)과 
객체 생성을 막는 private 생성자를 가져 타입 안정성을 보장하고, 
실무에서는 Arrays.stream과 filter, equalsIgnoreCase를 활용한 정적 팩토리 
메서드 from()을 만들어 외부에서 들어온 글자를 안전하게 정품 Enum 객체로 변환하며 
만약 잘못된 값이 들어오면 orElseThrow로 명확한 에러를 던져 유지보수성을 극대화하고, 
interface는 메서드의 이름과 반환 타입만 있고 중괄호 내용이 없는 
추상 메서드로 이루어진 계약서 역할을 하여 이 인터페이스를 implements한 
자식 클래스는 껍데기 메서드의 작동 로직을 무조건 똑같은 이름으로 구현해야만 
컴파일 오류가 나지 않는다.
 
 
*/




        ;
    }
}