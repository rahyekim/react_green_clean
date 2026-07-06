/*
 */
interface Animal {
    public void animalSound();
    public void sleep();

} 

class Cat implements Animal{
    public void animalSound(){
        System.out.println("냐옹냐옹");

    }
    public void sleep(){
        System.out.println("쿠울쿠울");

    }
}

public class Interface_11 {
    public static void main(String[]args) {

        Cat myCat = new Cat();
        myCat.animalSound();
        myCat.sleep();
    }   

}
