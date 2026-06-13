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



    
class AvailableBlood(models.Model):
    donor=models.ForeignKey(DonorProfile,on_delete=models.CASCADE, related_name="available_blood")

    blood_group=models.CharField(max_length=10,choices=MyUser.BLOOD_TYPES)
    last_donated=models.DateField()
    location=models.CharField(max_length=50)
    contact=models.IntegerField()
    units_available=models.PositiveBigIntegerField()

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
    available_blood=models.ForeignKey(AvailableBlood,on_delete=models.CASCADE,related_name='blood_requests',null=True,blank=True)


class DonationRequest(models.Model):
    STATUS=[
        ('pending','Pending'),
        ('accepted','Accepted'),
        ('rejected','Rejected'),
    ]
    recipient=models.ForeignKey(RecipientProfile,on_delete=models.CASCADE,related_name='donation_request')

    available_blood=models.ForeignKey(AvailableBlood,on_delete=models.CASCADE,related_name='donation_requests')
    contact_num=models.CharField(max_length=15)
    urgency=models.CharField(max_length=20,choices=BloodRequest.URGENCY,default='medium')
    status=models.CharField(max_length=20,choices=STATUS,default='pending')
    location=models.CharField(max_length=30)
    hospital=models.CharField(max_length=20)
    created_at=models.DateTimeField(auto_now_add=True)



