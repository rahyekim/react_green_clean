package advanced;

public class TheName {

	//필드
	private String model;
	private int age;
	//생성자
	public TheName(){};
	public TheName ( String model, int age){
		this.model= model;
		this.age= age;
	}
	//메소드
	
	@Override
	public String toString() {
		return "TheName [model=" + model + ", age=" + age + "]";
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	

}
