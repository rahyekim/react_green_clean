import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from numpy.random.mtrand import rayleigh

#한글 폰트 설정(시각화시 한글 깨짐 방지)
plt.rcParams['font.family']=['Malgun Gothic']
plt.rcParams['axes.unicode_minus']=False

print("----1. 랜덤소개 && 2. 데이터 배포  && 3. 무작위순열")

#1.랜덤소개(기본 난수 생성)
basic_random = np.random.randint(1, 100)
print(f"랜덤소개 (0-100정수):{basic_random}")

#2.데이터배포(확률을 직접 지정하여 데이터 추출)
#[1,2,3]중에서 각각 10% , 60%, 30% 확률로 5개 추출

data_dist = np.random.choice([1,2,3], p=[0.1,0.6,0.3], size=5)
print(f"데이터분포 (지정확률 추출) : {data_dist}")

#3.무작위 순열(배열의 순서를 무작위로 섞음)
arr = np.array([1,2,3,4,5])
np.random.shuffle(arr)

print(f"무작위순열(배열섞기): {arr}\n")

print("----10.다항분포 (시각화대신 텍스트로 출력")

multinomial_dist = np.random.multinomial(n=20, pvals=[1/6]*6,size=3)
print(f"다항분포 결과:\n {multinomial_dist}")

#다양한 확률분포 데이터 생성
size=1000

#5. 정규분포
normal_dist = np.random.normal(loc=0, scale=1, size=size)

#6. 이항분포
bionomial_dist = np.random.binomial(n=10, p=0.5, size=size)

#7.포아송분포( 특정 시간 동안 어떤 사건이 몇 번 일어날지 예측)
#예) 1시간 동안 걸려오는 콜센터 전화 횟수

poisson_dist = np.random.poisson(lam=10, size=size)

#8.균일 분포(모든 숫자가 나올 확률이 똑같은 분포 예) 공평한 룰렛)
# low=0 최소0 부터 high=1 (최대1) 사이에서 아무 숫자나 1000개를 뽑ㅅ아

uniform_dist = np.random.uniform(low=0, high=10, size=size)

#9.로지스틱 분포( 정규분포와 비슷하지만 꼬리가 더 두꺼운 분포, 통계학에서많이쓰임)
# loc=0(평균), scale=1(퍼진정도)로 1000개를 만듦

logisic_dist = np.random.logistic(loc=0, scale=1, size=size)

#10.지수분포( 다음사건이 일어날 때까지 걸리는 시간 예)다음버스가 올때까지 대기시간)
# scale=2(평균대기시간2) 일 떄의 데이터 1000개를 만듦

exponential_dist = np.random.exponential(scale=2, size=size)

#11.카이제곱분포(통계학에서 가설을 검증할때 주로 쓰는 분포)
# df=2 자유도 설정으로 1000개를 만듦
chisquare_dist = np.random.chisquare(df=2, size=size)

#13.레일리분포( 바람의 속도나 파도의 높이등을 측정할때 쓰이는 분포)
# scale=2 설정으로 1000개

rayleigh_dist = np.random.rayleigh(scale=2, size=size)

#14.파레토 분포(20%의 원인이 80%의 결과를 만든다는 파레토 법칙의 분포 예)부의분배
#a=2 모양을 결정하는 수치 설정으로 1000개 만듦

pareto_dist = np.random.pareto(a=2, size=size)

#.15 지프 분포( 많이 쓰이는 단어는 엄청 많이 쓰이고, 안 쓰이는 건 거의안쓰이는 현상을 설명)

zipf_dist = np.random.zipf(a=2, size=size)
zipf_dist = zipf_dist[zipf_dist < 10]



# seaborn 모듈을 활용한 데이터시각화

fig, ax = plt.subplots(3,3, figsize=(15,12))
fig.suptitle('Numpy Random 분포 시각화(seaborn활용)', fontsize=20)

#0번째 줄에 그리기
sns.histplot(normal_dist, kde=True, ax=ax[0,0], color='blue').set_title('정규분포')
sns.histplot(bionomial_dist, kde=False, ax=ax[0,1], color='green',discrete=True).set_title('이항분포')
sns.histplot(poisson_dist, kde=False, ax=ax[0,2], color='lightgray', discrete=True).set_title('포아쏭분포')

#1번째 줄에 그리기
sns.histplot(uniform_dist, kde=True, ax=ax[1,0], color='purple').set_title("균일분포")
sns.histplot(exponential_dist, kde=True, ax=ax[1,2], color='orange').set_title("지수분포")
sns.histplot(logisic_dist, kde=True, ax=ax[1,1], color='brown').set_title("로지스틱분포")

#2번째
sns.histplot(chisquare_dist, kde=True, ax=ax[2,0], color='teal').set_title("카이제곱분포")
sns.histplot(rayleigh_dist, kde=True, ax=ax[2,1], color='navy').set_title("레일리분포")
sns.histplot(pareto_dist[pareto_dist<10], kde=True, ax=ax[2,2], color='olive').set_title("파레토분포")

plt.tight_layout()
plt.show()
