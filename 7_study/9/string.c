
#include <stdio.h>


int len(char *p); // len함수가 main()보다 아래에 있으므로 선언필수!

int main(){


    char* p1 = "2022"; //2의주소
    char* p2 = "202207"; //2의주소

    int a = len(p1); //4
    int b = len(p2); //6 

    printf("%d", a+b);
}

int len(char *p){ //문자열길이...ㅋㅋㅋ
    int r = 0;
    while (*p != '\0'){
        p++; 
        r++; 
    }
    return r;
    
}