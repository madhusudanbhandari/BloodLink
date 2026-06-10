from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import RegisterSerializer,LoginSerializer
from rest_framework.response import Response

# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
     serializer=RegisterSerializer(data=request.data)
     if serializer.is_valid():
          serializer.save()
          return Response({'message':"Registration Successfull"},status=201)
     return Response(serializer.errors,status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
     serializer=LoginSerializer(data=request.data)
     if serializer.is_valid():
          return Response(serializer.validated_data,status=200)
     return Response(serializer.errors,status=400)