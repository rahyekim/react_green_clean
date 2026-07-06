 /* 
    parents PC -> super class : 상속시키는 클래스
    child  CC -> sub class : 부모한테 상속받는 클래스
    상속받는 아이들은 누구로 부터 확장 extends
    */
class vehicle{
    protected String brand = "Morning"; //속성

    public void honk(){ // 함수
        System.out.println("Tuut,tuut");
    }
}

public class Inherit_7 extends vehicle{

    private String modelName = "따릉이";

    public static void main(String[] ags){
        //이녀석만의 자체 객체
        Inherit_7 myCar = new Inherit_7();
        myCar.honk();
        System.out.println(myCar.brand + " " + myCar.modelName);


    }

   
   
    
}
