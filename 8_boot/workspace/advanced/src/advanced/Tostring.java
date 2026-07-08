package advanced;

public class Tostring {
	
	//Object의 toSTring() 메소드는 객체의 문자정보를 리턴
	// 객체의 문자정보란 객체를 문자열로 표현한 값
	public static void main(String[] args) {
		SmartPhone myPhone = new SmartPhone("아이폰", "ios");
		
		String strObj = myPhone.toString();
		System.out.println(strObj);
		System.out.println(myPhone); //myPhone.toString()이 자동실행
									//System.out.println(Object); toString()자동호출
		//toString재정의 안하면 내부메소드로 advanced.SmartPhone@5e91993f 요롷게 나옴...

	}

}
