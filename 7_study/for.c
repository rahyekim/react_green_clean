#include <stdio.h>

int main(){


    char *a = "qwer";
    char *b = "qwtey";

    for (int i=0; a[i] != '\0'; i++){
        for ( int j=0; b[j] != '\0'; j++){
            if(a[i] == b[j]) printf("%c", a[i]);
        }
    }


    return 0;
}