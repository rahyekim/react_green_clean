
#include <stdio.h>

//구조체 연결리스트 문제



struct Node{
    int value;
    struct Node* next;
};


void func(struct Node* node){
    while(node != NULL && node-> next != NULL){
        //node가 null이아니고 다음 노드도 null이 아닐떄 만 반복
        //node가 2개이상 쌍으로 잇을때
        int t = node->value; //현재 노드의 값을 임시변수 t에 잠시 복사(값지워지는거방지)
        node->value = node->next->value;
        //현재 노드값에 다음노드의 값을 덮어씌움
        node-> next->value = t;
        //다음 노드의 값에는 아까 보관해둔 원ㄹㅐ현재 노드의 값을 넣음
        //=> 3줄로 인접한 두노드의 값이 서로바뀜
        node= node->next->next; //두칸 뒤로 껑충!

    }
    
}

int main(){

    struct Node n1 = {1, NULL};
    struct Node n2 = {2, NULL};
    struct Node n3 = {3, NULL};

    n1.next = &n3;
    n3.next = &n2; 
    
    func(&n1); //완성된 연결리스트의 시작점인 n1의 주소를 func함수에 던져줌
    //n1(3)-> n3(1)-> n2(2)
    
    struct Node* current = &n1;
    /*
    결과를 화면에 찍기위해 current라는 탐색용 화살표 만들고 
    다시 리스트의 맨 처음n1 을 가리키게함
    */

 while(current != NULL){ //current가 null이 될때까지 반복.....
    printf("%d", current->value);   //3,1,2
    current = current->next;
 }
    return 0;
}
