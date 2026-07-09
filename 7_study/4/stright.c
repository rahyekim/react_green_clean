#include <stdio.h>
#include <string.h>

//문자열 복사 및 포인터 연산

//strcpy와 동일한 역할을 하는 함수 string copy

/*
char* d 복사받을 목적지(destination) 배열의 포인터
char* s 복사할 원본(source) 문자열의 포인터
*/
void sumFn(char* d, const char* s){

    while(*s){ //포인터 s가 가리키는 문자가 널문자(\0) 가 아닐때까지 반복
        *d = *s; 
        d++;  //목적지 포인터를 다음칸으로 이동
        s++;//원본 포인터도 다음칸으로 이동 
    }
    *d = '\0'; //원본 문자열 복사가 끝나면, 목적지 문자열 끝에도 \0널문자를 직접 넣어준다
}

int main(){


    const char* str1 = "first"; //변경되지않는 원본 문자열 first 포인터str1이 가리킴..길이5
    char str2[50] = "teststring"; //목적지

    int result= 0;
    sumFn(str2, str1); //sumFn함수호출 str1('first')를 str2배열에 엎어씌움

    for(int i =0; i< str2[i] !='\0' ; i++){ // 처음부터끝까지반복(널문자만날때까지) 
        result += i;  // 0+1+2+3+4  // f i r s t '\0' r i n g \0 
    }

    printf("%d", result);

    return 0;
}