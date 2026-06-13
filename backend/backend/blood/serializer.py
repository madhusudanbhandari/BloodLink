from rest_framework import serializers
from .models import MyUser,DonorProfile,RecipientProfile,BloodRequest,AvailableBlood,DonationRequest
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=MyUser
        fields='__all__'
        

    def validate(self,data):
        email=data.get('email');
        if email and MyUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exist")
        return data
    
    def create(self,validated_data):
        password=validated_data.pop('password')
        role=validated_data.get('role')

        user=MyUser.objects.create_user(
            password=password,
            username=validated_data['username'],
            email=validated_data.get('email'),
            role=validated_data.get('role'),
            age=validated_data.get('age'),
            blood_group=validated_data.get('blood_group'),
            gender=validated_data.get('gender'),
            location=validated_data.get('location'),

        )
        if role=="donor":
            DonorProfile.objects.create(user=user)
        
        elif role=='recipient':
            RecipientProfile.objects.create(user=user)

        return user
    
class LoginSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=50)
    password=serializers.CharField(write_only=True)

    class Meta:
        model=MyUser
        fields=['email','password']

    def validate(self,data):
        email=data.get('email')
        password=data.get('password')

        user=authenticate(username=email,password=password)

        if not user:
            raise serializers.ValidationError("Invalid Credentials")
        
        refresh=RefreshToken.for_user(user)

        return{
            "user":{
                "username":user.username,
                "email":user.email,
                "role":user.role,
            },
            "access":str(refresh.access_token),
            "refresh":str(refresh),
        }
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields = [
            "id",
            "username",
            "email",
            "age",
            "blood_group",
            "gender",
            "location",
            "role",
        ]
        
class RequestSerializer(serializers.ModelSerializer):
    recipient_username=serializers.SerializerMethodField()

    class Meta:
        model=BloodRequest
        fields="__all__"
        read_only_fields=['recipient']

    def get_recipient_username(self,obj):
        return obj.recipient.user.username

    

class AvailabilitySerializer(serializers.ModelSerializer):
    donor_username=serializers.SerializerMethodField()


    class Meta:
        model=AvailableBlood
        fields="__all__"
        read_only_fields=['donor']

    def get_donor_username(self,obj):
        return obj.donor.user.username




class DonationRequestSerializer(serializers.ModelSerializer):
    recipient_username=serializers.SerializerMethodField()

    blood_group=serializers.SerializerMethodField()
    
    class Meta:
        model=DonationRequest
        fields='__all__'
        read_only_fields=['recipient','status','created_at']

    def get_recipient_username(self,obj):
        return obj.recipient.user.username
    
    def get_blood_group(self,obj):
        return obj.available_blood.blood_group

