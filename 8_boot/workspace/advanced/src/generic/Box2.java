package generic;

/*타입 파라미터는 기본적으로 Object타입으로 간주되므로 
Object가 지닌 메소드를 호출 할 수있다.
*/
public class Box2<T> {
	
	private T content;

	public T getContent() {
		return content;
	}

	public void setContent(T content) {
		this.content = content;
	}

	//Box의 내용물이 같은지를 비교
	public boolean compare(Box2<T> other) {
		boolean result = content.equals(other.content);
			return result;
	}
	
	public static void main(String[] args) {
		
		Box2<String> box2= new Box2<>();
		box2.content ="100";
		
		Box2<String> box3= new Box2<>();
		box3.content = "100";
		
		boolean result1= box2.equals(box3);
		System.out.println(result1);
	}

}
