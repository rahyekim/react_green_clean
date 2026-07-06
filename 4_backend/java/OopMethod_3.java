public class OopMethod_3 {
    
    //c와마찬가지 void return값이 없다.
    
    public void fullThrottle(){

        System.out.println("자동차는 빠르게 달릴 수있당");
    }

    //void
    public void speed(int maxSpeed){

        System.out.println("최고속도"+maxSpeed);
    }
    
    public static void main(String[] args){
        OopMethod_3 myCar = new OopMethod_3(); //mycar라는 객체만듦
        //myCar 객체 설정
        myCar.fullThrottle();
        myCar.speed(200);
        
    }
    
}
