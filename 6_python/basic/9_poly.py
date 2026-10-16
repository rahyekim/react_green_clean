

# 다형성 다양한 형태 동일한 이름을 가진
# 메서드 함수 연산자가 여러객체나 클래스에서 실행


class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        
    #함수
    def move(self):
        print("달린다")
            
class Car(Vehicle): #상속
    pass 

class Boat(Vehicle):
    def move(self):
        print("떠깐다")

class Plain(Vehicle):
    def move(self):
        print("날아간다")


#객체설정
car1 = Car("kia","ev4")
boat1= Boat("banana", "mega")
plain1= Plain("boaing", "747")


for x in (car1, boat1, plain1):
    print(x.brand, x.model)
    x.move()
    print("-------")