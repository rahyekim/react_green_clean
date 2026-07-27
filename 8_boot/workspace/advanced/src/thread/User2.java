package thread;

//얘는 이제부터 혼자 일하는 작업자야...선언
public class User2 extends Thread {

    //이 직원이 일할때 사용할 계산기를 놓을 개인책상(변수)를 준비
    private Calculator calculator;

    //직원이 처음 채용될때 (객체가 만들어질때)
    //가장 먼저 실행되는 준비과정(생성자)
    public User2() { //스레드 이름 변경
        setName("User2Thread");
    }
    //누가 지금 계산기를 쓰고있지? 확인할때 이 이름이 출력

    //외부에서 공유객체인 Calculator 를 받아서 필드에 저장
    public void setCalculator(Calculator calculator) {
        this.calculator = calculator;
    }

    @Override //내가 새로 지시..
    public void run() {
        calculator.setMemory2(50); //동기화 메소드 호출
    }

}
