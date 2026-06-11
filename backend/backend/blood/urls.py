from django.urls import path
from .import views

urlpatterns=[
    path('',views.login,name='login'),
    path('register/',views.register,name='register'),
    path('request/', views.request, name='request'),
    path('seerequest/',views.see_request,name="see_request"),
    path('listblood/',views.available,name='list_blood'),
    path('seeblood/',views.available,name='see_blood')

]