from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import RegisterSerializer,LoginSerializer,RequestSerializer,AvailabilitySerializer,ProfileSerializer,DonationRequestSerializer
from rest_framework.response import Response
from .models import MyUser, RecipientProfile,DonorProfile,AvailableBlood,DonationRequest
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

          available_blood=serializer.validated_data['available_blood']
          if DonationRequest.objects.filter(
               recipient=recipient,
               available_blood=available_blood,
               status='pending'
          ).exists():
               return Response(
                    {"error":"You have already requested this donor."},
                    status=status.HTTP_400_BAD_REQUEST
               )
          
          serializer.save(recipient=recipient)
          return Response(serializer.data,status=status.HTTP_201_CREATED)
     
     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def donor_donation_request(request):
     try:
          donor=DonorProfile.objects.get(user=request.user)

     except DonorProfile.DoesNotExist:
          return Response(
               {"error":"Donor profile does not exist"},
               status=status.HTTP_403_FORBIDDED
          )
     
     requests=DonationRequest.objects.filter(
          available_blood__donor=donor
     )

     serializer=DonationRequestSerializer(
          requests,many=True
     )

     return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_donation_request(request, pk):
    donor = DonorProfile.objects.get(user=request.user)

    donation_request = DonationRequest.objects.get(
        id=pk,
        available_blood__donor=donor
    )

    new_status = request.data.get("status")

    if new_status not in ["accepted", "rejected"]:
        return Response(
            {"error": "Invalid status"},
            status=400
        )

    donation_request.status = new_status
    donation_request.save()

    return Response({"status": donation_request.status})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recipient_donation_response(request):
    recipient=RecipientProfile.objects.get(user=request.user)
    

    requests=DonationRequest.objects.filter(recipient=recipient)

    serializer=DonationRequestSerializer(requests,many=True)
    
    return Response(serializer.data)