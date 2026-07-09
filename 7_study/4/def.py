
#문자열 x안에서 특정 문자열 y가 몇번 포함되어있는지 세어주는 함수 

def Calculation(x,y):
    
    result = 0; #나중결과를 위해 0으로 초기화;
    
    #문자열 x의 전체 길이만큼 반복문 실행 
    for i in range(len(x)):
        #문자열 x의 i번째 인덱스부터 y의길이 만큼 잘라내어(슬라이싱) tmp에 넣음
        temp = x[i:i+len(y)]
        
        if temp == y: #우리가 찾고자하는 문자열y과 똑같은지비교
            #똑같다면 찾는횟수 1증가
            result +=1
    return result

#검색대상
a = "abdcabcabca"
        
p1="ab" #3

p2= "ca" #3

out = f"ab{Calculation(a,p1)}ca{Calculation(a,p2)}"

print(out) #ab3ca3     
            
        
        
    