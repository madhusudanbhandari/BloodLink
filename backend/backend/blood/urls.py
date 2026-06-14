from django.urls import path
from .import views

urlpatterns=[
    path('',views.login,name='login'),
    path('register/',views.register,name='register'),
    path('request/', views.recipient_request, name='request'),
    path('seerequest/',views.see_request,name="see_request"),
    path('listblood/',views.available,name='list_blood'),
    path('seeblood/',views.available,name='see_blood'),
    path('myprofile/',views.get_profile,name='get_profile'),
    path('request_donation/',views.donation_request_view,name='donor_request'),
    path('donation_response/<int:pk>/',views.update_donation_request,name='respond_donation_request'),
    path('recipient_donation_response/',views.recipient_donation_response),
    path('donation_offer/',views.donation_offer)
]
