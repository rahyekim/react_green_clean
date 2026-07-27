package thread;

public class WaitNotify {
    public static void main(String[] args) {
        WorkObject workObject = new WorkObject();
        //공유작업 객체 생성

        ThreadA threadA = new ThreadA(workObject);
        ThreadB threadB = new ThreadB(workObject);

        threadA.start();
        threadB.start();
    } //번갈아가면서 실행...


}
