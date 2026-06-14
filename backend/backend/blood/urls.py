from django.urls import path
from .import views

urlpatterns=[
    path('',views.login,name='login'),
    path('register/',views.register,name='register'),
    path('request/', views.request, name='request'),
    path('seerequest/',views.see_request,name="see_request"),
    path('listblood/',views.available,name='list_blood'),
    path('seeblood/',views.available,name='see_blood'),
    path('myprofile/',views.get_profile,name='get_profile'),
    path('request_donation/',views.request_donation,name='donor_request'),
    path('donor_donation_requests/',views.donor_donation_request),
    path('donation_request/<int:pk>/',views.update_donation_request,name='respond_donation_request'),
    path('recipient_donation_response/',views.recipient_donation_response)
]
