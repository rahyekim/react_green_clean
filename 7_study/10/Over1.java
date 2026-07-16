public class Over1 {
    
    int sum(int x, int y){
            return x+y;
        }

    public static void main(String[] args) {
        
        Over1 o1 = new Over1();
        Over2 o2 = new Over2();
        System.out.println(o1.sum(3,2)+ o2.sum(3, 2));
    } // 5 6
}


class Over2 extends Over1{

    int sum(int x, int y) { //재정의...
        
        return x - y + super.sum(x,y); //부모불러.... 오버라이딩되기전에 
    }

}

/*
super키워드,..상속,,, 메서드 오버라이딩,,,,
 */