import numpy as np

'''
배열의 형태를 바꾸는 걸 re-shapeing 리쉐이핑 이라고한다
1차원에서 2차원으로 재구성 ... re-shaping
'''

arr= np.array([1,2,3,4,5,6,7,8,9,10,11,12])

#아래는 이차원배열로~~~

newArr = arr.reshape(3,4) #3행 4열
print(newArr)

newArr = arr.reshape(4,3) #4행 3열
print(newArr)

# 3차원ㅂ ㅐ열로~~~

arr = np.array([1,2,3,4,5,6,7,8,9,10,11,12])

threeArr = arr.reshape(2,3,2)  # /// 3행 2열(3x2) 모양의 2차원배열 2묶음
print(threeArr)


# 차원 틀리게 reshape하면 에러난당... => 차원을 계산할때 엘리먼트 갯수를 잘 맞춰야함
nop = np.array([1,2,3,4,5,6,7,8])
newop= nop.reshape(4,2)
print(newop)

#다차원배열을 원래대로 1차로 돌리기 reshape(-1)

two = np.array([[1,2,3],[4,5,6]])
one = two.reshape(-1)
print(one) #[1 2 3 4 5 6]




