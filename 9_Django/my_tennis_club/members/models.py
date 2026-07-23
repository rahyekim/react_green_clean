from django.db import models
'''
1) python manage.py makemigrations (members) -> \migrations\0001_initial.py(DB설계도)
2) python manage.py migrate -> 실제 DB에 적용
3) python manage.py shell  >>> CLI(commandlineinterface)뜸..

>>> from members.models import Member
>>> Member.objects.all()
<QuerySet []>
member1 = Member(first_name='Tobias', last_name='Refsnes', age=20)
member2 = Member(first_name='Linus', last_name='Refsnes', age=21)
member3 = Member(first_name='Lene', last_name='Refsnes', age=22)
member4 = Member(first_name='Stale', last_name='Refsnes', age=24)
member5 = Member(first_name='Jane', last_name='Doe', age=25)
members_list = [member1, member2, member3, member4, member5]
for member in members_list:
    member.save()
Member.objects.all().values() 
'''
class Member(models.Model): #Member라는 테이블 - 컬럼 3개
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.IntegerField()
    phone = models.IntegerField(null=True)
    joined_date = models.DateField(null=True)


'''
python manage.py createsuperuser
'''