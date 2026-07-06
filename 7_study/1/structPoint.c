#include <stdio.h>
#include <stdlib.h>

//c언어의 단일 연결리스트 문제
//데이터를 차곡차곡 연결하고 특정데이터를 맨 앞으로 자리이동 시키는 알고리즘  

//🚂 링크드 리스트(Linked List)

typedef struct Data //🚃기차한칸 설계도 {value숫자칸, next다음기차칸주소}
{ //연결리스트 각칸의 노드를 정의하는 구조체
    int value;
    struct Data *next;
    
} Data;

//🌟 맨 앞에 새 기차칸 하나 붙이는 함수

Data *insert(Data* head, int value){
    Data* new_node = (Data*)malloc(sizeof(Data)); //📦새 기차칸 하나

    new_node->value = value; 
    new_node->next = head; //🔥연결하기- 새 노드 뒤에 기존 리스트를 붙여!
    return new_node; //새노드가 맨앞
}

//🌟 찾은 숫자를 맨 앞으로 데려오는 함수
Data* reconnect(Data* head, int value){
    if( head== NULL || head->value == value ) return head;
    //리스트가 비워있거나 찾는 숫자가 맨앞에 있다면 종료

    Data* prev = NULL, *curr = head; //  🚶 prev 🚶 curr(처음) >>>
    //리스트를 끝까지 다 뒤지거나 원하는 숫자를 찾을때까지 화살표타고 이동 
    while(curr != NULL && curr->value != value){
        prev = curr; //한칸 이동하기전에 현재 위치를 prev에 기록
        curr = curr->next; //curr 다음칸으로 이동 
    }

    if ( curr != NULL && prev != NULL) { //원하는 숫자를 찾았따면 
        prev->next = curr->next; //화살표가 내 다음 노드를 가르켜 나를 ㅃ
        curr->next = head; //맨앞으로 빠져나온 화살표가 기존의 맨앞을 가리키게함
        head = curr; //내가 맨앞..
    }
    return head; //새로 갱신된 맨앞을 리턴...

}

int main(){
    Data *head = NULL, *curr; //처음 리스트 비워있음 

    for(int i = 0; i<=5 ; i++){ //1부터 5까지 숫자를 순서대로 맨앞에 끼움
        head = insert(head, i); 

        head = reconnect(head,3); //숫자 3을 찾아서 맨앞으로..끌어옴
    } 
    
    for(curr = head ....); 
    return 0;
}

/*
1단계 1~5 까지 숫자 삽입
초기리스트 54321

2단계 
화살표를 타고가다가 3을 찾음 반복문이 멈춤

3단계
3을빼서 맨 앞으로 옮김 

3 5 4 2 1 

 */