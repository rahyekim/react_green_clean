package advanced;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD}) // 적용대상은 메서드만...
@Retention(RetentionPolicy.RUNTIME) //유지 정책 런타임: 프로그램 실행 중에도 이 애노테이션 정보를 유지해라
public @interface PrintAnnotation {  // @interface 새로운 애노테이션을 직접 만들겟다
	
	String value() default "-";
	int number() default 15;

}
