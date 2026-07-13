#include <stdio.h>


int main(){

    char *p = "KOREA"; //'\0'포함 6개

    printf("%s\n", p); // KOREA

    printf("%s\n", p+1); // OREA

    printf("%c\n", *p); //K 

    printf("%c\n", *(p+3)); //E 

    printf("%c\n", *p+4); //K+4  k=74  O


    return 0;
}
