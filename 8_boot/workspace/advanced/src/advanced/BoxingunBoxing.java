package advanced;
//래퍼클래스: 기본 자료형을 객체로 만든 클래스
//왜 굳이 객체로???? 컬렉션은 객체만 저장 가능
public class BoxingunBoxing {
	//포장객체는 값을 변경할 수 없고 단지 객체로 생성하는것에 목적 
	//래퍼클래스.... 문자열을 기본타입값으로 편환할때도 사용 
	//Integer Double Character Boolean ...등
	
	/*
	 * Boxing 은 내부값을 비교하기 위해 == 와 != 사용자를 사용못함
	 * 이 연산은 내부의 값을 비교하는 것이 아니라 포장객체의 번지를 비교
	 */

	public static void main(String[] args) {
	
		//Boxing Integer로 포장
		Integer obj=100;
		System.out.println("value: " + obj.intValue()); //100
		System.out.println("포장후더하기 " + obj + 100); //100100
		
		//Unboxing int로 언박싱
		int value = obj;
		System.out.println("value: "+ value);
		int result = obj + 100;
		System.out.println("언박싱후더하기: "+ result); //200
		
		System.out.println();
		//객체라 메모리주소비교...
		Integer ob1= 300;
		Integer ob2= 300;
		System.out.println("==: " + (ob1==ob2)); //false
		System.out.println("!=: " + (ob1!=ob2)); //true 
		System.out.println("equals(): "+ (ob1.equals(ob2))); //값비교 true
	}

}
