
#include <stdio.h>

int main(){

    char a[] = "Art"; //문자형배열a 선언+ "Art"라는 문자열로 초기화
    //['A','r','t','\0']
    char *p = NULL; //문자를 가리킬수 있는 포인터변수 p 아무것도가리키지않도록 비워둠

    p=a; //배열의 이름인 'a'는 배열의 첫번째칸('A'가 들어있는곳) 주소값을 의미 
    
    printf("%s\n", a); //Art
    printf("%c\n", *p); //A

    printf("%c\n", *a); //A
    printf("%s\n", p); //Art (핵심) %s라서: 그 주소부터 문자열 끝(\0)까지 출력해줘

    for(int i=0; a[i] != '\0'; i++){ //널문자만날때까지...
        printf("%c", a[i]); //Art \n안해서

    }

    return 0;
    
}