

'''
1차원 리스트에 있는 이진트리형태로 만들고
트리를 탐색하면서 특정깊이(홀수레벨)에 있는
숫자들만 골라서 합산하는 문제


데이터계층적으로 저장하는 자료구조중 하나로
모든노드의 자식노드 개수가 최대 2개이하인 트리

각각왼쪽자식과 오른쪽 자식으로 명확하게 구분

'''

class Node:
    def __init__(self,value): #생성자
        self.value= value #노드에 들어갈 실제 숫자
        self.children =[] #이 노드아래에 연결될 자식 노드들을 담을 빈 리스트
        
#1차원 리스트(li)를 받아서 이진트리로 조립해 주는 함수 

def tree(li):
    nodes = [Node(i) for i in li] #모든 숫자를 Node 객체로 만듦 
    #리스트안의 모든 숫자를 각각 Node객체로 만들어 리스트로 묶음
    '''
    1번 인덱스(두번째 숫자)부터 끝까지 돌면서 부모 자식 관계를 연결 
    0번이 아닌이유?
    0번째는 뿌리 root라서 !!
    [(i-1)//2] 내인덱스 i를 통해 내 부모의 인덱스를 알아내는 수학공식 .... // : (몫)
    '''   
    for i in range(1, len(li)): #1번 인덱스부터 부모 자식 관계를 연결 
        nodes[ (i-1) //2 ].children.append(nodes[i])
        #⭐nodes[부모인덱스]⭐.children 리스트안에 나 자신(node[i])를 집어넣음
        

    return nodes[0] ## 3. 루트 노드 반환
#트리를 순회하면서 조건에 맞는 숫자만 더하는 재귀함수 (level의 기본값은 0)

def calc(node, level=0): #함수가 시작될때 맨처음 노드(root)가 들어오고 
    #1.재귀-> 종료조건(안전장치)
    if node is None: return 0 #만약들어온 노드가 없으면 계산할 값 0을 돌려주고 끝냄
    
    #2.진짜계산 : 내점수+자식들값
    return(node.value if level % 2 == 1 else 0 )+ sum(calc(n, level+1) for n in node.children)
            

li= [3,5,8,12,15,18,21]

root= tree(li)

print(calc(root))
'''
node.value if level % 2 == 1 else 0
내값을 더할까 말까 결정
level을 2로 나눠서... 나머지가 1이면=홀수층이면 내진짜 숫자를 챙김

sum(calc() for n in node.children)
내밑에 있는 자식들아 너희들도 각자 계산해서 결과 가져와
for n in node.chilren 내 자식들을 하나씩 꺼내서
cal(n, level+1) 자식들에게 다시 이함수를 시킴...


                [0층] ─── ● 3 (Root)
                        /    \
         [1층] ─────── ⭐ 5    ⭐ 8    ◀── (8도 무사히 입주 완료!)
                      /   \    /   \
  [2층] ──────────── ● 12 ● 15 ● 18 ● 21
'''

