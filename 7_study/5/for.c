
#include <stdio.h>
#include <ctype.h>

/*
c언어의 아스키코드연산과 특정글자를 일정한 칸수만큼 밀어서 암호화하는
시저암호(Caesar cipher)
*/


int main(){


    char *p = "IT is 8"; //그 문자열의 첫 번째 문자 주소를 저장하는 포인터
    char result[100];
    int i;

    for ( i=0 ; p[i]!='\0'; i++){ //널문자 만날때까지...

        if (p[i] >= 'A' && p[i] <= 'Z') {
            result[i] = (p[i] - 'A' + 3) % 26 + 'A';
        }
        else if (p[i] >= 'a' && p[i] <= 'z') {
            result[i] = (p[i] - 'a' + 3) % 26 + 'a';
        }
        else {
            result[i] = p[i];   // 숫자, 공백 등은 그대로
        }
    }

    result[i]= '\0';
    printf("%s", result); //LW lv 8
    
    
    return 0;
}