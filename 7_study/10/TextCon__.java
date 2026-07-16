/*
⭐싱글톤 패턴: 프로그램 전체에서 어떤 클래스의 객체를 단하나만 만들어서 돌려씀
-객체가 단 하나만 생성됨
-모두가 같은 객체 공유함
-결과 ????

⭐static:  클래스 하나에 하나만 존재

static → 하나만 공유
private → 외부 접근 차단
*/


class Connection{
    
    //✨ private static✨
    private static Connection instance = null; //⭐객체 저장 변수 private static
    //private static Connection instance; 객체타입변수기본값이null이라 생략가능

//프로그램 전체에서 단하나만 존재하게 될 Connction 객체를 저장할 숨겨진 변수
    
    private Connection() {} //⭐외부 newConnection()방지
    
    public static Connection get(){ 
//외부에서 Connection객체 필요할때⭐ 호출메서드 //생성자 대신 사용
        if( instance == null){
            instance = new Connection(); //없으면 새롭게 하나만듦
        }
        return instance; //있으면 그대로반환
    }

    private int count = 0; //초기값0

    public void count(){ count ++;} 
    
    public int getCount(){ return count;}
}

public class TextCon__ {
    
    public static void main(String[] args) {
        
        Connection con1 = Connection.get();
        con1.count(); //카운트1올림

        Connection con2 = Connection.get();
        con2.count();

        Connection con3 = Connection.get();
        con3.count();

        System.out.println(con1.getCount()); //3
    }
}
