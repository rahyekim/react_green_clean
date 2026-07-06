//상자를 만들때 이상자에 무엇을 담을지 지금은 모르겟고,,,, 
//사용할때 담은 물건 타입 정할게... 
// 🏷️ 마법상자 <T> => 생성자의 코드량을 줄여준다
/*
🥛 컵은 하나만 만들고, 내용물은 나중에 결정
class Cup<T> { 
    T value; // 👈 여기에 뭐가 담길지는 나도 몰라! 손님이 결정할 거야.
}
 */

class Box<T> {  // type parameter => <T> 아직 정해지지 않은 타입을 의미 
    T value ; //상자안에 실제로 들어갈 내용물...

    //상자안에 내용물을 넣는 ㄴ매서드 
    void set (T value){
        this.value = value;
    }
    //상자에서 내용물을 꺼내는 메서드
    T get(){
        return value;
    }
}

public class Generic_21 {
    
    public static void main (String[] arg){

        Box<String> str= new Box();
        str.set("문자열");
        Box<Integer> i = new Box();
        i.set(50);

        System.out.println(str.get());
        System.out.println(i.get());

    }
}
