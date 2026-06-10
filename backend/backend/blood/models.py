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

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=[]


class DonorProfile(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)

    last_donated=models.DateField(null=True,blank=True)
    is_availble=models.BooleanField(default=True)


class RecipientProfile(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)

    required_blood=models.CharField(max_length=3)
    hospital_name=models.CharField(max_length=30)


    
