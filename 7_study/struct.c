#include <stdio.h>


typedef struct {
    int n;
    int g;
} A;

int main(){

    A a[2];    //struct A a[2]

    for (int i=0; i<2 ; i++){
        a[i].n = i; 
        a[i].g = i+1;
    }

    printf("%d\n", a[0].n + a[1].g); //0 2
    
    
    

    return 0;
}
