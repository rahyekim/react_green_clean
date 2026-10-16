'''
배열분할
분할은 하나의 배열을 여러개로 분할
array_split(): 분할할 배열과 분할 횟수를 전달
'''
'''
머신러닝에서 데이터 분석의 필수과정....
1)학습용과 테스트용으로 데이터를 나누기(Train/Test)
2)문제지와 정답지를 분리하기 위해서
3) 컴퓨터 메모리의 한계를 극복하기 위해서
데이터가 1억줄이 넘어가면 프로그램이....뻗어버림.....
'''

import numpy as np

arr = np.array([1,2,3,4,5,6])

new_arr = np.array_split(arr,3)
print(new_arr)

#2차원 배열 세 개의2차원 배열로 분할
arr = np.array([[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]])
new_arr2= np.array_split(arr,3)
print(new_arr2)

arr = np.array([[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18]])
new_arr3 = np.array_split(arr,3, axis=1)
print(new_arr3)


'''
#배열 검색 : 특정값을 검색하고 해당값이 일치하는 인덱스를 리턴
배열을 검색하려면 where() 메서드를 사용
'''
arr = np.array([1,2,3,4,5,4,5,6])
x=np.where(arr==4)
print(x) #몇번째 위치하는지 인덱싱 번호가 나옴 [3,5]

#값이 홀수 인 인덱스 찾기
arr= np.array([10,14,93,41,8,7])
x= np.where(arr%2==1)
print(x)

#값이 짝수인 인덱스 찾기
arr= np.array([10,14,93,41,8,7])
y= np.where(arr%2==0)
print(y)

print("-"*40)

#search sort
'''
# 데이터를 정렬된 상태로 유지한 다음 searchsorted()
# searchsorted() → 정렬되어 있다는 전제에서 위치 찾기
이진 탐색 → 빠르게 위치 찾는 방법
'''
arr = np.array([10, 20, 30, 40, 50])
z= np.searchsorted(arr,21)
print(z) #2    새로운데이터가들어오면 이진탐색으로 위치 찾아서 위치에 삽입.


#오른쪽부터 검색할 경우
arr = np.array([9,8,7,6])
q = arr.searchsorted(10,side="right")
print(q) #4

arr= np.array([1,3,5,7,9])
r = np.searchsorted(arr,[2,4,6])
print(r) #[1,2,3]


'''
# sort() 정렬이란 요소들을 순서대로 배열하는것

asc: 내림차순 desc:오름차순
정렬된 시퀀스란 숫자 또는 알파벳 순서, 오름차순 또는 내림차순 같이
요소에 해당하는 순서가 있는 시퀀스를 말함 
'''
arr=np.array([3,2,0,1])
print(np.sort(arr))

#알파베티컬
arr= np.array(['b','c','d','a', 'B',1])
print(np.sort(arr)) #숫자-대문자...먼저...

arr= np.array([False,True,False])
print(np.sort(arr)) #false 0 true 1

arr= np.array([[3,2,4],[5,0,1]])
print(np.sort(arr))  #2차원 배열도 정렬가능

#필터링!!

#불리언 인덱싱(Boolean indexing)
arr = np.array([41,42,43,44])
x = [True,False,True,False]
new_arr4= arr[x]
print(new_arr4) #[41 43]


filter_arr=[]

for element in arr:
    if element > 42:
        filter_arr.append(True)
    else:
        filter_arr.append(False)

new_arr5= arr[filter_arr]

print(filter_arr)  #[False, False, True, True]
print(new_arr5) #[43 44]

