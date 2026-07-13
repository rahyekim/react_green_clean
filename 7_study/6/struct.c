#include <stdio.h>
#include <stdlib.h> //malloc, free

//헤더파일 및 구조체 정의

typedef struct Data{//멤버,,,,,
    char c; //문자형 변수 c
    int *numPtr; //정수형 메모리 주소를 저장할 포인터변수
}Data;
//typedef :밑에서 struct 선언안해도됨;


int main(){

    int num = 10; //
    Data d1; //Data타입 구조체 선언 
    /*
    stack memory => LIFO 후입선출 //프링글스, 브라우저 뒤로가기    
    queue => FIFO 선입선출 
    */
    Data *d2= malloc(sizeof(struct Data));
    //구조체 크기만큼 힙메모리를 동적할당하고
    // 구조체 포인터 d2에 저장
    /*
    내가 원하는 만큼 잘라쓰는 장점 다만 직접빌리고 치우고
    */
    d1.numPtr = &num;
    // . 점연산자를 사용하여 numPtr에 접근한뒤 
    d2->numPtr = &num;

    printf("%d\n", *d1.numPtr); //10
    printf("%d\n", *d2->numPtr); //10

    /*
    d1.numPtr은 num주소를 가지고 있으므로 앞에 역 참조연산자를 붙여
    그 주소안에 있는 실제 값인 10을 출력 
    */
    free(d2);  //malloc heap동적메모리 빌렸으니 반납
    d2 = NULL;
    
    return 0;
}


/*
. 점연산자는 구조체 변수 자체일때 사용 
Data d1; 
d1.numPtr = 

화살표 연산자 -> 구조체를 가리키는 포인터 일때
Data *d2;
d2->numPtr = &num;  ===== (*d2).numPtr
                    d2는 포인터니까 실제 구조체를 얻고 접ㅈ근...

*/