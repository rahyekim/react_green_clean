#include <stdio.h>


struct node{
    int n1; //정수 데이터 변수
    struct node *n2; //자기자신과 똑같이생긴 다른 node구조체의 메로리주소를 저장할 포인터변수

};

int main(){

    struct node a = { 10, NULL};
    struct node b = { 20, NULL};
    struct node c = { 30, NULL};

    /*연결 리스트의 시작점을 나타내기 위해 node 포인터 변수 head를 만들고 첫번째 노드인 
    a의 주소(&a 저장) */
    struct node *head = &a;
    a.n2 = &b ; //a의 포인터변수 n2에 b의주소(&b) 를 저장 a->b
    b.n2 = &c ; //b의 포인터변수 n2에 c의주소(&c) 를 저장 b->c

    printf("%d\n", head->n2->n1); //20

    
    return 0;
}