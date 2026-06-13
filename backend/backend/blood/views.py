from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import RegisterSerializer,LoginSerializer,RequestSerializer,AvailabilitySerializer,ProfileSerializer,DonationRequestSerializer
from rest_framework.response import Response
from .models import MyUser, RecipientProfile,DonorProfile,AvailableBlood
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from .models import BloodRequest

# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
     serializer=RegisterSerializer(data=request.data)
     if serializer.is_valid():
          serializer.save()
          return Response({'message':"Registration Successfull"},status=201)
     return Response(serializer.errors,status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
     user=request.user
     serializer=ProfileSerializer(user)
     return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
     serializer=LoginSerializer(data=request.data)
     if serializer.is_valid():
          return Response(serializer.validated_data,status=200)
     return Response(serializer.errors,status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request(request):
     try:
          recipient=RecipientProfile.objects.get(user=request.user)
     except RecipientProfile.DoesNotExist:
          return Response(
               {"error":"Recipient  not found"},
               status=status.HTTP_403_FORBIDDEN   
          )
     
     blood_id=request.data.get("available_blood")

     try:
          available_blood=AvailableBlood.objects.get(id=blood_id)
     except AvailableBlood.DoesNotExist:
          return Response(
          {"error":"Available blood not found"},
          status=404
          )

     serializer=RequestSerializer(data=request.data)

     if serializer.is_valid():
          already_exists=BloodRequest.objects.filter(
               recipient=recipient,
               available_blood=available_blood
          ).exists()

          if already_exists:
               return Response(
                    {"error":"Request already sent"},
                    status=400
               )
          

          serializer.save(recipient=recipient,
                          available_blood=available_blood)
          
          return Response(serializer.data,status=201)
     
     return Response(serializer.errors,status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def see_request(request):

     # recipient=RecipientProfile.objects.get(user=request.user)

     requests=BloodRequest.objects.all()


     serializer=RequestSerializer(requests,many=True)
     return Response(serializer.data)


@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def available(request):
     
     if request.method=='POST':
          donor=DonorProfile.objects.get(user=request.user)

          serializer=AvailabilitySerializer(data=request.data)
          if serializer.is_valid():
               serializer.save(donor=donor)
               return Response(serializer.data,status=201)
          return Response(serializer.errors,status=400)
     

     if request.method=="GET":
          available_blood=AvailableBlood.objects.all()

          serializer=AvailabilitySerializer(available_blood,many=True)
          return Response(serializer.data)
     

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_donation(request):
     try:
          recipient=RecipientProfile.objects.get(user=request.user)
     except RecipientProfile.DoesNotExist:
          return Response(
               {"error":"Recipient profile not founc"},
               status=status.HTTP_403_FORBIDDEN
          )
     


     serializer=DonationRequestSerializer(data=request.data)

     if serializer.is_valid():
          serializer.save(recipient=recipient)
          return Response(serializer.data,status=status.HTTP_201_CREATED)
     
     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
