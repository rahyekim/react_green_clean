from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

data = {
    "normal": random.normal(loc=50, scale=5, size=1000),
    "binomial": random.binomial(n=100, p=0.5, size=1000)
}
'''
정규분포(normal distribution)
loc = 50 평균(중심위치)
scale = 5 표준편차(퍼진정도:데이터가 평균에서 얼마나 퍼지는지)
=> 평균이 50이고, 표준편차가 5인 정규분포에서 데이터 1000개 뽑기

binomial
n=100
size=1000/ 동전던지기 100번 을  1000번반복
'''

sns.displot(data,kind="kde") #데이터 분포를 부드러운 곡선으로
plt.show()