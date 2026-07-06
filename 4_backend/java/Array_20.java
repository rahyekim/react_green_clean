//새롭게 매번 변동되는 것은 ... Arraylist를 사용
import java.util.ArrayList;

public class Array_20 {
    
    
    public static void main(String[] args){

        String [] cars= {"volvo","benz","ford"};
        System.out.println(cars[0]);  //평상시 정해져있을때...

        ArrayList<String> car= new ArrayList<>();

        /*매번 추가되어야 하는 리스트 경우에는 java.util.ArrayList를 사용한다.
        내장 array와 다른점 : (1)객체화 시키고 사용
        매번 추가되기 때문에 (2) add() 함수로 추가...
*/
        car.add("volvo"); 
        car.add("BMW");


        //인덱스를 사용하여 바꿀 수 있음
        car.add(0, "kia");

        System.out.println(car);

        System.out.println(car.get(2)); //3번째 출력 
        
        //기존 항목 변경
        car.set(2, "benz");

        car.remove(0);

        car.size(); //몇개? 

        //항목이 많을 경우 for 와 forEach 사용
        for ( int i=0; i <car.size() ; i++){
            System.out.println(car.get(i));
        }
        
        //껍데기만 남기고 지울때
        car.clear(); 

        //foreach 출력
        for( String i : car){
            System.out.println(i);
        }

        String listVSarrayList = "list는 변수타입, 매개변수리턴타입선언시"+
        "array리스트 new 키워드를 통해 실제 리스트데이터를 담을 메모리객체 생성할때"+
        "사용해주세요"+
        "유연한 코드: List<String> 쓰면 쉽게 바꾸기 가능 "+
        "✨ List<String> list = new ArrayList<>();"+
        "✨ List<String> list = new LinkedList<>();";
        
        
    }
}

/*
🚨내부적으로 방을 다닥다닥 붙여놨느냐(ArrayList), 줄로 엮어놨느냐(LinkedList)🚨 의 구조 차이

🏢 ArrayList: "다닥다닥 붙어있는 아파트"

- 조회 (방 찾기) - 초고속 🚀 번호판(인덱스)이 딱딱 붙어 있어서
- 추가/삭제 - 느림 🐌:중간에 데이터를 넣거나 빼면,
 뒤에 있는 데이터들이 한 칸씩 이사를 가거나 앞으로 당겨져야 해서 컴퓨터가 노가다

 🔗 LinkedList: "기차 놀이 (보물찾기)"
 데이터들이 메모리 여기저기 흩어져 있고, 자기 옆 사람의 '주소(손잡이)'만 붙잡고 연결되어 있는 형태

 - 조회 (방 찾기) - 느림 🐌 0번부터 시작해서 "너 다음 사람 주소 뭐야?" 물어물어 3번까지
- 추가/삭제 - 초고속 🚀: 중간에 뭘 끼워 넣을 때, 이사 갈 필요 없이 앞뒤 사람 손잡이(링크)만 슥 바꿔 쥐여주면
 
*/


/*
인터페이스: "이런 기능은 반드시 만들어!" 라고 약속하는 설계도
class Dog implements Animal {}

List 인터페이스 : add()remove()get()size()기능 정의 
implements : 기능약속을구현하는것**

class ArrayList implements List {}

➡️ArrayList는 List를 구현한 클래스

List<String> list = new ArrayList<>();
인터페이스로 선언 = 구현체로 생성 

⭐⭐
오버라이딩: 부모 클래스(extends)나 인터페이스(implements)의 메서드를 재정의하는 것.
오버로딩: 메서드 이름은 같고 매개변수(개수 또는 타입)가 다른 메서드를 여러 개 정의
⭐⭐

*/