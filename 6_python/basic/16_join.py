from traceback import print_tb

import numpy as np

arr1= np.array([1,2,3])

arr2= np.array([4,5,6])

new_arr = np.concatenate((arr1,arr2),axis=0)
print(new_arr)

#1차원배열은 문제없지만 .... 2차원 이상일때는 axis써줘야함...

arr3= np.array([[1,2,3],[4,5,6]])
arr4= np.array([[7,8,9],[10,11,12]])

new_arr1 = np.concatenate((arr3,arr4),axis=1)
print(new_arr1)

#원래스타일 axis=0 단순화는 1


#np.concat() 기존 축에 따라 이어붙이는것  #[1 2 3 4 5 6]
#np.stack() 말그대로 차원을 하나 늘려서 포개어 싾는 것 축을 하나 늘림
# [[1 2 3]
# [4 5 6]]   => axis=0

#[[1 4]
# [2 5]
# [3 6]]  => axis=1

print("-" *50)
#hstack 가로뱡향으로 나란히 이어붙이는
#vstack 세로방향으로 차원이 늘어남

arr1= np.array([1,2,3])
arr2= np.array([4,5,6])

arr3= np.array([[1,2,3],[4,5,6]])
arr4= np.array([[7,8,9],[10,11,12]])

arr_h = np.hstack((arr1,arr2))
arr_h2 = np.hstack((arr3,arr4))
print(arr_h)
print(arr_h2)
print("-" *50)
arr_v = np.vstack((arr1,arr2))
arr_v2 = np.vstack((arr3,arr4))
print(arr_v)
print(arr_v2)




