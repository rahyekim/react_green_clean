class One{
    String type = "animal";

}

class Two extends One{
    String type = "cat";

    public void printType(){
        System.out.println(super.type);
    }
}

public class Super_9 {

    public static void main(String[] args){
        Two myTwo = new Two();
        myTwo.printType();
    }
    
}


//서버클래스가 부모의 클래스 참조할때 upser 키워드를 사용 