from traceback import print_tb


class good:
    li =["서울","경기","대전","세종","인천"]

g= good() #클래스생성자호출 +객체생성역할..
str01 = ""

for i in g.li:
    str01 += i[0]
print(str01)
