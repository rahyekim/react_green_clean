package thread;

public class YieldExam {
    public static void main(String[] args) {
        Y yA = new Y("workThreadA");
        Y yB = new Y("workThreadB");
        yA.start();
        yB.start();

        try{
            Thread.sleep(5000);//main스레드 5초쉼(걍 AB같이 일하는거 보여주려고)
        }catch (InterruptedException e){}
        yA.work = false;
        //yiedl():...cpu계속양보양보양보..
        // B만 독박 일함..10초동안..

        try{Thread.sleep(10000);}catch (InterruptedException e){}
        yA.work = true;
        //다시 A도 일함...


    }
}
