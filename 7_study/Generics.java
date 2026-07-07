public class Generics {
    
    public static class Collection<T>{
        T value;

        public Collection(T t){
            value= t;
        }
        public void print(){
            new Printer().print(value); 
        /*Printer객체를 만들고 print를 호출 
        컴파일러가 이코드를 번역할때 제네릭T는 어떤타입인지 아직 확정하지않은상태
        자바는 하위 호환성을 위해서 제네릭 타입을 컴파일 시점에 가장 최상위 클래스인 Object로 덮어씌워버림
        이것을 타입 소거 Type Erasure 라고함
        컴파일눈에는 new Printer().print((Object)value); 로보임

        */
        }
        class Printer{
            void print(Integer a){
                System.out.println("A"+a);
            }
            void print(Object a){
                System.out.println("B"+a); /////////B0
            }
            void print(Number a){
                System.out.println("C"+a);
            }
        }

    }
    public static void main(String[]args){

        new Collection<>(0).print();
        /*
        0이라는 숫자를 넣어 collection객체를 생성
        이때 0은 기본형 int지만
        제네릭<T>에는 클래스(객체)만들어갈수있으므로
        자바가 자동으로 Integer로 변환(오토박싱)
        따라서 이순간 T는 Integer가 됨

         */

    }
}


/*
📚 오버로딩은 컴파일 시점의 타입으로 결정되고, 제네릭은 컴파일 시 타입 소거되어 Object가 된다.
 */