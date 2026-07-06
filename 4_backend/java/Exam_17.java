//인터페이스 설계(계약서 작성)

/*
메소드의 이름과 반환 타입만 있고 
중괄호{} 감싸진 실제내용(로직)이 없다 => 추상메서드abstract maethod
 */
interface Machine{
    void run();

}


public class Exam_17 implements Machine{

    //Machine 인터페이스 규칙 
    //필드(name)
    private String name;
    
    //생성자: 파일이름과 똑같아야
    public Exam_17 (){
        this.name = "LG";
    }

    // 🔥 interface와 implements (계약) => 
    // interface 껍데기 메서드의 작동조건을 무조건 적어줘야한다 
    
    public void run(){
        System.out.println("running....");
    }
    public static void main(String [] args){

        Exam_17 wm = new Exam_17();
        wm.run();

    }
}
