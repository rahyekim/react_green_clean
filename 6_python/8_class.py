class Person:
    #파이썬 생성자
    def __init__(self,name, age):
        self.name= name;
        self.age= age;
        
    def myfunc(self):
        print("hello myname is " + self.name + " 입니다")
        

person1 = Person("Jin", 25)

print(person1.name, person1.age)

person1.myfunc()