package collect;

import java.util.ArrayList;
import java.util.List;

public class ArrayListt {

    public static void main(String[] args) {

//1.String객체의 번지(주소)를 저장할
// List 컬렉션 생성 (보통 ArrayList를 가장 많이 사용)
    List<String> list = new ArrayList<>();
    //2.isEmpty():
        System.out.println("처음 리스트가 비어있나요?"+list.isEmpty());
        //객체 추가 3.add(E e)
        list.add("사과");
        list.add("바나나");
        list.add("사과"); // 중복저장가능
        //null저장: 객체가 없다는 의미인 null도 하나의 칸을 차지하며 저장
        list.add(null);
        //add(int idx, E element)
        list.add(0, "딸기");
        list.set(2,"딸기");

        System.out.println(list);
        System.out.println("총객체수: "+list.size());
        System.out.println("1번 인덱스 과일: "+list.get(1));
        System.out.println("2번 인덱스 과일: "+list.get(2));
        System.out.println("사과가 있나요?" + list.contains("사과"));

        list.remove(4);
        list.remove("딸기");
        list.remove("딸기");
        System.out.println("딸기가있나요?"+list.contains("딸기"));

        list.clear();

        System.out.println("claer후 리스트가 비어잇나요?"+list.isEmpty());

    }


}

/*
List 컬렉션은 객체 자체를 저장하는 것이 아니라
객체의 번지를 저장
또한 동일한 객체를 중복 저장할 수 있는데
이경우 동일한 번지가 저장된다
null또한 저장이 가능

idx인덱스를 매개 값으로 갖는 메소드
- 객체추가 -
boolean add(E e) 주어진 객체를 맨 끝에 추가
void add(int idx, E element)주어진 인덱스에 객체를 추가
set(int idx, E element) 주어진 인덱스의 객체를 새로운 객체로 바꿈

-객체 검색-
boolean contains(Object o)주어진 객체가 저장되어 있는지 여부
E get(int idx) 주어진 인덱스에 저장된 객체를 리턴
is Empty()컬렉션이 비워져 있는지 조사
int size() 저장되어 있는 전체 객체수를 리턴

-객체 삭제-
void clear() 저장된 모든 객체를 삭제
E remove(int idx) 주어진 인덱스에 저장된 객체를 삭제
boolean remove(Object o) 주어진 객체를 삭제

* */

