
#클래스문제

class charClass :
    a = ["서울", "인천", "경기", "대전"]

myVal = charClass() #객체

#변수선언만하면 값이 유동적으로 들어온다 빈 값을 넣으면 +=

str01 = '' #비어진변수로 선언

for i in myVal.a:
    str01 = str01 + i[0]
    
print(str01) #서인경대