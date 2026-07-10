/*
포인터를 활용하여 문자열을 뒤집는 Reverse알고리즘과
배열 인덱스 다루는 법 
-문자열 뒤집기: 문자열의 맨앞과 맨뒤에 포인터를 두고
-서로의 글자를 맞바꾼뒤 점점 가운데로 좁혀오며 문자열 전체를 완전히 뒤집

홀스 인덱스 추출
i+=2 를 이용하여 index번호가 1,3,5,7 인 자리만 골라내서 출력
*/

#include <stdio.h>
#include <string.h>

void reverse(char* str){

     int len = strlen(str); //strlen문자열길이 8
     
     //두글자 맞바꿀때 잠시 담아둘
     char temp ;

     char* p1 = str; //배열의 시작주소 즉 맨 첫글자인 a를 가리킴

     char*p2 = str + len -1; //마지막글자 h 가리킴

     while (p1<p2) //p1이 p2보다 왼쪽에 있는동안
     {                   //가운데에서만날때까지...
        temp = *p1; //빈상자에 p1복사
        *p1 = *p2; //p1자리에 p2로 덮어쓰기
        *p2 = temp;  // ⭐전형적인 맞교환 로직 3줄....
         //복사해놓은 p1을 p2에 넣..
        p1++; //왼쪽 포인터를 오른쪽으로 한칸 이동 
        p2--; // 오른쪽에서 왼쪽으로 한칸 이동 
     }
     
    

}

int main(int argc, char* argv[]){

    char str[100] = "ABCDEFGH";
    
    reverse(str);

    int len = strlen(str);

    for( int i =1 ; i < len ; i+=2){  //int i=1 이어야 홀수..

        printf("%c", str[i]);  //H G F E D C B A =>GECA
 
    }    

    
    
    return 0;

}