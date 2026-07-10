//싱글톤(Singleton) 패턴 구현
//:Connection 객체를 프로그램 전체에서 딱 1개만 만들어서 공유하겠다
/*
⭐static 변수 → 객체 하나 저장
⭐private 생성자 → new 막기
⭐static 메서드 → 객체 반환
*/
class Connection{
    //1.자기자신의 인스턴스를 담을 정적(static)변수를 선언
    //처음엔 비어있음
    private static Connection _inst = null;
    //2.호출횟수를 저장할 인스턴스 변수...기본값 0
    private int count = 0;
    //3외부에서 객체를 달라고 할때 사용하는 정적메서드
    public static Connection get() {

    //4.만약 만들어진 객체가(_inst)없다면? (최초1회실행시)
    if(_inst == null){
        _inst = new Connection(); //새 객체를 만들어 _inst에저장
        return _inst; //만든객체를 반환
    }
    //5. 이미만들어진 객체가 있으면... 새로만들지않고 기존객체 그대로 반환
    return _inst;
    }
    //count1 를 증가시키는
    public void count(){
        count ++;
    }
    //7.현재 count값을 반환하는 메서드
    public int getCount(){
        return count;
    }
}   

public class Sing {

    public static void main(String[] args) {
        //1) [최초호출]_inst가 null이므로 새객체생성
        Connection con1 = Connection.get();
        con1.count();
        //2.
        Connection con2 = Connection.get();
        con2.count();
        //3.
        Connection con3 = Connection.get();
        con3.count();

        con1.count(); // 4
        System.out.println(con1.getCount());
    }
   
}


/*
static 메서드는 객체에 속한 메서드가 아니라 클래스에 속한 메서드

static = "객체의 것이 아니라 클래스의 것"
즉, 객체들이 하나의 값을 함께 공유하는 변수
 */


class 클래스명 {

    private static 클래스명 instance;


    private 클래스명() {
        // 외부 new 금지
    }


    public static 클래스명 getInstance() {

        if(instance == null) {
            instance = new 클래스명();
        }

        return instance;
    }
}