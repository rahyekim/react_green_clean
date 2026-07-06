
'''
이문제는 python programming 입력을 하고 난 후 문제 

'''

x = input() #사용자로부터 input 키보드 문자열 입력받아 변수 x에 저장 

x= x.capitalize() #첫글자만 대문자로 // Python Programming

y= x.split() #띄어쓰기(공백)로 쪼개서 리스트(배열) 형태로 y에 저장 //["Python", "Programming"]

# ["Python", "Programming"]
print(y[0][::2], end="*") #0번위치에서 2씩 증가 // Pto
print(y[1][3:6])  #gra 

# Pto*gra

