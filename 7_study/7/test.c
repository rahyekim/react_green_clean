#include <stdio.h>
#include <stdlib.h>

char n[30]; //전역변수

//입력값은 홍길동, 김철수, 박영희 순서

char *test(){ //문자열의 메모리 시작주소(포인터)
    printf("입력하세요:");
    gets(n);
    //사용자로부터 문자열을 입력받아 위에서 만든 유일한 전역변수 n에저장
    return n;
    //문자가 저장된 전역변수 n의 메모리 주소를 반환
}

int main(){

    system("chcp 65001");
    
    char * test1;
    char * test2;
    char * test3;

    test1= test();
    test2= test();
    test3= test();

    printf("%s\n", test1);
    printf("%s\n", test2);
    printf("%s\n", test3);  //무조건 마지막이 나온다... 덮어쓴다...
    
    // char n[30]; 이름표 한 칸(30글자짜리)
    //이름표 3장(각각 30글자) n[3][30]
    return 0;
}