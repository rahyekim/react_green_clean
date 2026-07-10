// 다형성 메서드 오버라이딩 재귀함수

//피보나치 수열 공식
class Parent{
    int compute(int num){
        if(num <=1) return num;
        return compute(num-1)+compute(num-2); //재귀
    }
}

class Child extends Parent{

    int compute(int num){
        if(num <=1) return num;
        return compute(num-1)+compute(num-3); //재귀
    }

}

public class Dogs {
    
    public static void main(String[] args) {

        Parent obj = new Child();
        System.out.println(obj.compute(7)); //동적바인딩..자식함수 
        
    }
}

/*
7 -6-5 - 4 - 3 -2 - 1
                    -1
                - 0
            -1 
        -2
    -2

 -3
 */