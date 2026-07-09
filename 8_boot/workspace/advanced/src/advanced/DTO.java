package advanced;

public class DTO {

	public static void main(String[] args) {
			String spring= "핵심실무"+
		"Entity: 데이터 베이스 DB테이블과 1:1로 매핑-> 클래스 자동 DB만들기"+
		"Entity = DB 테이블 그자체"+
		"사용자 - DTO- Entity - JPA - DB"+
		"JPA: java Persistence API-> Java에서 DB를 쉽게 다루기 위한 표준 API"+
		"DTO: Data Transfer Object 데이터 전송 객체 -> 계층간에 데이터를 주고받음 "+
		"VO: Value Object 값객체 -> 불변성을 가짐(값못바꿈) "+
		"자바에서 반복되는 코드를 줄이기 위해 14버젼에서 레코드 도입"
		;


		Person person = new Person(
			"emp20260709", "문현빈", 24, "dev01"
		);

		//데이터접근
		System.out.println("사원번호: " + person.employeeId());
		System.out.println("사원이름: "+ person.name());

		System.out.println(person); //toString()자동구현확인

		Person person2 = new Person("emp20260708", "류현진", 40, "dev02");

		//
		System.out.println("두객체값이 같은가? : "+ person.equals(person2));

		Person person3 = new Person("emp20260708", "류현진", 40, "dev02");

		System.out.println("두객체값이 같은가? : "+ person2.equals(person3));
		
	}

}
