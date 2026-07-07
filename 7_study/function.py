
def func(lst):
    #리스트의 길이를 2로 나눈 몫:정수(소수점버림):3
    for i in range(len(lst)//2):
        # left right swap 
        lst[i], lst[-i-1] = lst[-i-1], lst[i]

lst=[1,2,3,4,5,6]
func(lst)
print(lst)  # 6 5 4 3 2 1

#짝수인덱스 6 4 2 -  홀수인덱스 5 3 1 = 3     
print(sum(lst[::2]) - sum(lst[1::2]))

'''
0 -1    
1 -2
2 -3
'''
        
        