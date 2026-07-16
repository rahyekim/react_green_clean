public class Good2 {
    
    public static void main(String[] args) {
        Vehicle obj = new Car3("spark");
        System.out.println(obj.getName()); //vehicle name: spark
    }

}

abstract class Vehicle{
    private String name;

    abstract public String getName(String val);

    public String getName(){
        return "vehicle name:" + name;
    }
    public void setName(String val){
         name = val;
    }
}


class Car3 extends Vehicle{

    public Car3(String name) {
        setName(name);
    }
    public String getName(String val){
        return "Car name:" +val;
    }
     public String getName(byte val[]){
        return "Car name:" +val;
    }
    
}




