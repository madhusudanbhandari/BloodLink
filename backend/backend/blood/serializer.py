from rest_framework import serializers
from .models import MyUser,DonorProfile,RecipientProfile
from rest_framework.response import Response

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
        if role=="doctor":
            DonorProfile.objects.create(user=user)
        
        elif role=='recipient':
            RecipientProfile.objects.create(user=user)

        return user
    
