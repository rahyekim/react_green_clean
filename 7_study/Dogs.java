

class Parent{
    int compute(int num){
        if(num >=1) return num;
        return compute(num-1)+compute(num-2);
    }
}

class Child extends Parent{

    int compute(int num){
        if(num >=1) return num;
        return compute(num-1)+compute(num-3);
    }

}

public class Dogs {
    
    

    public static void main(String[] args) {

        Parent obj = new Child();
        System.out.println(obj.compute(7));
        System.out.println();
        
    }
}
