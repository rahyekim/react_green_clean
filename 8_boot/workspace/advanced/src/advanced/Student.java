package advanced;

//Student객체를 동등비교하기위해 hashcode와 equals() 재정의
public class Student {
	
	private int no; 
	private String name;
	
	/*
	 * 생성자
	 * 자바에서 생성자 contuctor를 만드는 가장 근본적인 이유
	 * 바로 객체가 태어날때(생성될떄) 정상적인 상태를 갖추도록 강제하기위해(초기화)
	 * 1.객체의 무결성보장(필수데이터강제)
	 * 2.코드의 간결성과 가독성향상
	 * 3.상황에 따른 다양한 생성방식 제공(오버로딩)
	*/
	public Student(int no, String name) {
		this.no = no;
		this.name = name;
	}
	//getter 값을 리턴
	public int getNo() {
		return no;
	}
	public String getName() {
		return name;
	}
	
	//학생번호와 이름해시코드를 합한 새로운 해시코드 리턴
	//번호와 이름이 같으면 동일한 해시코드가 생성됨...
	@Override
	public int hashCode () {
		int hashCode = no + name.hashCode();
		return hashCode;
	}
	//equals() 재정의 : Student객체인지를 확인하고 학생번호와 같으면 true를 return
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Student target) {
			if(no == target.getNo() && name.equals(target.getName())) {
				return true;
			}
					
		}return false;
	}
	

}
