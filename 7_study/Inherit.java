public class Inherit {
    

    public static void main(String[] args) {
        
        Parent p = new Child();
        System.out.println(p.compute(4));


    }
}


class Parent{

    public int compute(int num){

        if(num <=1) return num;
         return compute(num-1)+compute(num-2);

    }
    
}

class Child extends Parent {

    public int compute(int num){

        if(num <=1) return num;
        return compute(num-1)+compute(num-3);  
        /*
        3 - 2 -  1
              ㄴ -1
          ㄴ0 
        1
         */

    }
}