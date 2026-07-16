#include <stdio.h>

int main(){

    int i,j ;
    int temp;

    int a[5] = {75,95,87,100,20};

    for(i=0; i<4; i++){
        for(j=0; j < 4-i; j++){
            if(a[j]>a[j+1]){
            temp = a[j];
            a[j] = a[j+1];
            a[j+1] = temp;
            }
        }
    }
    for(i=0; i<5 ;i++){
        printf("%d ",a[i]);
    }

    int size = sizeof(a) / sizeof(a[0]);
    printf(" %d", size);

    return 0;
}