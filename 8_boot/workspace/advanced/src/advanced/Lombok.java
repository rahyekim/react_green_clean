package advanced;

import lombok.Data;
import lombok.NonNull;


/*  @Data :
 * 컴파일과정에서 기본생성자 + Getter, Setter, 
 * hashcode(), equals(), toString() 가 자동으로 생성
 */
@Data
public class Lombok {
	
	private String id ;

	@NonNull   //not null 
	private String name;

	private int age;
}

/*Lombok에서 자주 쓰는 어노테이션

 🟦 @NoArgsConstructor : 기본 매개변수가 없는 생성자 (아무것도 안 넣는 생성자 만들어줘)
 🟦 @AllArgsConstructor : 모든 필드를 초기화시키는 생성자 (필드 전부 받는 생성자 만들어줘)
 🟦 @RequiredArgsConstructor: 기본적으로 매개변수가 없는 생성자 포함
		final 이나 @NonNull 붙은 필드가 있을때 이필드만 초기화시키는 생성자 포함
		(중요하다고 표시한 애들만 받는 생성자 만들어줘)
 🟦 @EqualsAndHashCode: equals와 hashCode 메소드 포함 (객체 비교하는 방법 만들어줘)
 🟦 @ToString : toString()메소드포함 (객체 출력할 때 예쁘게 보여줘)
 */


/*
@NonNull  - Lombok 코드 내부 방어 (개발자가 null 넣음)
@NotNull  - Validation 사용자 입력 검증 (사용자가 잘못된 데이터 보냄)
*/