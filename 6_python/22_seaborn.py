import matplotlib.pyplot as plt
import seaborn as sns

'''
matplotlib 기반으로 만들어진 고급 시각화 라이브러리 seaborn
'''

sns.displot([0,1,2,3,4,5,6], kind="kde") #커널밀도추정
plt.show()