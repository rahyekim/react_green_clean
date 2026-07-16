public class Obj {
    public static void main(String[] args) {
        
        A a = new B();
       
        System.out.println(a.g()); //2
    }
}

class A{
    String f(Object x){
        return "1";
    }
    String g(){
        return f("a");
    }

}

class B extends A{

    public B(){}

    String f(Object x){
        return "2";
    }
    String f(String x){
        return "3";
    }
}


