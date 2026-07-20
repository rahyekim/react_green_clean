package advanced;
import java.lang.reflect.*;
/*
리플렉션 + 애노테이션 : 애노테이션에 정보를 적어두고, 리플렉션이 그 정보를 읽어 사용하는 구조

코드에서 @로 작성하는 요소를 어노테이션
클래스 또는 인터페이스를 컴파일하거나 실행할때
어떻게 처리해야 할 것인지를 알려주는 설정정보,,,

1) 컴파일시 사용하는 정보전달: @Override
2) 빌드툴이 코드를 자동으로 생성할때 사용하는 정보전달
3) 실행시 특정기능을 처리할때 사용되는 정보전달 

🟥 어노테이션 적용대상
TYPE : 클래스, 인터페이스, 열거 타입 
ANNOTATION_TYPE: 어노테이션
FIELD : 필드
CONSTRUCTOR :생성자
METHOD :메소드
LOCAL_VARIABLE : 로컬 변수
PAKAGE : 패키지 
 */
public class Anotation {

	@PrintAnnotation()
	public void method1(){ 
		System.out.println("실행내용1");
	};
	@PrintAnnotation("*")
	public void method2(){ 
		System.out.println("실행내용2");
	};
	@PrintAnnotation(value="#", number=20)
	public void method3(){ 
		System.out.println("실행내용3");
	};


	public static void main(String[] args) {

		Method[] declaredMethods = Anotation.class.getDeclaredMethods();

		for(Method method: declaredMethods){
			//⭐⭐
			PrintAnnotation annotation = method.getAnnotation(PrintAnnotation.class);
		
			printLine(annotation);
			try{
				//메소드호출
				method.invoke(new Anotation());
			}catch(Exception e){
				System.out.println("메소드 호출중 에러 발생");
			}
			printLine(annotation);
		}
	}

	public static void printLine(PrintAnnotation annotation){
		if(annotation != null){
			int number = annotation.number();
			for(int i=0 ; i < number; i++){
				String value = annotation.value();
				System.out.print(value);
			}
			System.out.println();
		}
	}
}
