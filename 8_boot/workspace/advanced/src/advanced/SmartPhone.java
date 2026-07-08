package advanced;

public class SmartPhone {
	
	private String company;
	private String os;
	
	//생성자
	public SmartPhone(String company, String os) {
		this.company = company;
		this.os = os;
	}
	
	@Override //object의 toString()메소드를 재정의해서 제조사와 운영체가 문자열로 표현???
	public String toString() {
		return company + "와" + os;
		
	}
}
