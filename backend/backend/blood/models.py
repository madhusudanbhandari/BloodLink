from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class MyUser(AbstractUser):
    BLOOD_TYPES=[
        ('A+','A+'),
        ('A-','A-'),
        ('AB+','AB+'),
        ('AB-','AB-'),
        ('B+','B+'),
        ('B-','B-'),
        ('O+','O+'),
        ('O-','O-'),


    ]
    ROLE_CHOICE=[
        ('admin','admin'),
        ('donor','donor'),
        ('recipient','recipient')
    ]
    GENDER=[
        ('male','male'),
        ('female','female'),
        ('other','other')
    ]

    age=models.IntegerField(default=0)
    blood_group=models.CharField(max_length=20,choices=BLOOD_TYPES)
    gender=models.CharField(max_length=20,choices=GENDER)
    location=models.CharField(max_length=20)
    role=models.CharField(max_length=10,choices=ROLE_CHOICE)
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=150,unique=False)
   

class DonorProfile(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)

  
class RecipientProfile(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)


class BloodRequest(models.Model):
    URGENCY=[
        ("high","High"),
        ("low","Low"),
        ('medium',"Medium")
    ]
    recipient=models.ForeignKey(RecipientProfile,on_delete=models.CASCADE,related_name='requests')

    blood_group=models.CharField(max_length=30,choices=MyUser.BLOOD_TYPES)
    units_required=models.PositiveBigIntegerField()
    hospital_name=models.CharField(max_length=50)
    hospital_address=models.CharField(max_length=50)
    contact_num=models.IntegerField()
    urgency_level=models.CharField(max_length=20,choices=URGENCY,default='medium')



    
