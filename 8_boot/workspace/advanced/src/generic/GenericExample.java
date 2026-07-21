package generic;
/*
 <T>제네릭 사용하는 이유
 타입 안정성 보장: 의도하지 않은 타입의 데이터가 들어가는 것을 실행전에 완벽히 차단
 번거로운 형변환 제거: 데이터를 꺼낼때 (String)같은 형변환 작업 을 생략
 뛰어난 재사용성 : 클래스 하나만 잘 설계해두면 자유자재로 바꾸어 사용
 */

public class GenericExample {

	public static void main(String[] args) {
		//아까 만들었던 박스 클래스 사용
		Box<String> box1 = new Box<>();
		box1.content = "안뇽하세요";
		String str = box1.content;
		System.out.println(str);

		Box<Integer> box2 = new Box<>();
		box2.content = 100;
		int value = box2.content;
		System.out.println(value);
				
		/*
		Product라는 객체를 생성하는데 
		이 객체가 다룰 타입을 <TV, String>으로 미리 정해줌
		첫번째 데이터는 tv객체만
		두번째 데이터는 String(문자열만 받겠다)선언
		why??
		타입을 꼭 집어서 정해두면, 나중에 다른 객체나 Integer숫자를 넣으려고 할때
		자바 컴파일러가 에러를 띄워서 실수를 미리 막아줌... => 타입 안정성
		
		 */
		Product<Tv, String> product1 = new Product<>();

		product1.setKind(new Tv());
		//product1의 종류로 새로운 Tv객체를 생성해서 넣음
		product1.setModel("스마트 TV");
		// 모델명으로 "스마트tv" 문자열을 넣어줌 
		
		//기존 만들어 놓은 값을 변수들에 담아둠..
		//장점: 형변환 생략 가능.. 
		Tv tv = product1.getKind();
		String tvModel = product1.getModel();
		
		
		/*
		 코드 재사용하는 Product 객체 
		 why??
		 class를 tv용,car용 따로만들필요없이
		  틀(클래스)하나 만들어두고 쓸때마다 원하는타입을 끼워맞춰<T>
		 코드 재사용!!
		 */
		Product<Car, String> product2 = new Product<>();
		product2.setKind(new Car());
		product2.setModel("suv 자동차");

		Car car = product2.getKind();
		String carModel = product2.getModel();

		
			
	}	

}
