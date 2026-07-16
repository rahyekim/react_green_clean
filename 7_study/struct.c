#include <stdio.h>

struct good{
    char name[10];
    int age;
};

int main(){

    struct good s[] = {"jin", 22, "Lee", 25, "Seo", 50 , "Park", 34};
    struct good *p;
    p = s; 
    p++;
    printf("%s", p-> name);
    printf("%d", p-> age);
}