package advanced;
/*
클래스를 선언할때 class대신에 record 키워드를 사용하여
괄호안에 상태(필드)만 나열

🟦 레코드record의 핵심특징요약
⭐완벽한 불변성(immutable)- ????? 한번생성된 데이터는 안전하게 유지
⭐보일러플레이트 코드제거:
 롬복(Lombok)의 @value나 @data어노테이션을 쓰지않아도 순수자바문법으로 코드로 매우간결해짐
⭐상속불가: 레코드는 내부적으로 java.lang.record를 상속받기 때문에 다른 클래스를 상속
(extends)할 수 없음.. 대신 인터페이스구현(implements)를 얼마든지 사용가능
 */
public record Person( //레코드 선언
	String employeeId,
	String name,
	int age,
	String departmentCode
) {
	public Person{ //선택사항이 필요한경우 데이터 검증로직 표현
		if(age<0){
			throw new IllegalArgumentException("나이는 0보자 작을 수없습니다");
		}
		
	}


} 




