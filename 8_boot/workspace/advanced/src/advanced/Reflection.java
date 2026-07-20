package advanced;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

/*
🟦 자바는 클래스 자체도 하나의 객체(Class 객체)로 관리
🟦 [ 클래스이름, 패키지이름, 생성자 목록, 필드 목록, 메서드 목록 ]
 => 이 메타정보를 읽는 것을 🌳 리플렉션 
프로그램에서 class객체를 얻으려면 아래의 3가지 방법 중 하나를 사용!
⭐Class clazz = 클래스이름.class;
⭐Class clazz = Class.forName("패키지.클래스이름")
⭐Class clazz = 객체참조변수.getClass(); //객체로부터 얻는 방법 
 */

public class Reflection {

	public static void main(String[] args) {
		
		Class clazz = TheName.class;
		// Class clazz = Class.forName("advanced.TheName");
		// TheName thename = new TheName();
		// Class clazz = thename.getClass();
		System.out.println("패키지: " + clazz.getPackageName());
		System.out.println("클래스 간단이름: " + clazz.getSimpleName());
		System.out.println("클래스 전체이름: " + clazz.getName());

		System.out.println("[생성자 정보]");
		Constructor[] constructors = clazz.getDeclaredConstructors();
		for(Constructor constructor: constructors){
			System.out.print(constructor.getName()+ "(");
			Class [] parameters = constructor.getParameterTypes();
			printParameters(parameters);
			System.out.println(")");
 		}
		System.out.println();

		System.out.println("[메서드 정보]");

		Method[] methods = clazz.getDeclaredMethods();
		
		for(Method method: methods){
			System.out.print(method.getName()+"(");
			Class[] parameters= method.getParameterTypes();
			printParameters(parameters);
			System.out.println(")");
		}

	}
	
	private static void printParameters(Class[] parameters){
		for(int i=0 ; i<parameters.length ; i++){
			System.out.print(parameters[i].getName());
			if(i< parameters.length-1){
				System.out.print(",");
			}
		}
	}
}
