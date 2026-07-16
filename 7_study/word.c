#include <stdio.h>

void main(){

    char *p = "KOREA";

    printf("%s\n", p); //korea // %s는 \n만날때까지 출력
    printf("%s\n", p+3); //ea 
    printf("%c\n", *p); //k
    printf("%c\n", *(p+3)); //e
    printf("%c\n", *p+3); // 아스키코드 'K'+3 // N 

}