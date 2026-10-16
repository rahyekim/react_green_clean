
'''
Binomial Distribution
이항분포
동전던지기와 같이 앞면 또는 뒷면이 나오는 이진 시나리오 결과를 설명
n :시도횟수
p : 각시행이 발생할 확률
size: 반환되는 배열의 형태
'''

from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

# x = random.binomial(n=10, p=0.5, size=10) #동전 10번 던짐 앞뒷면나올확률50%
#print(x)

#동전을 100번 던지는 실험을 1000번 반복해서, 앞면이 나온 횟수의 분포를 그려라
sns.displot(random.binomial(n=100, p=0.5, size=1000))
plt.show()


