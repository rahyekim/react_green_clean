public class Test {
    
    public static void main(String[] args) {
        
        System.out.println(Test.check(1));

    }

    static String check(int num){

        return (num >=0) ? "positive" : "negative";
    }
}
