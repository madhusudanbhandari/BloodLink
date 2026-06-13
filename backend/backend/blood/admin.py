from django.contrib import admin
from .models import MyUser,DonorProfile,RecipientProfile,BloodRequest,AvailableBlood,DonationRequest

# Register your models here.

@admin.register(MyUser)
class UserAdmin(admin.ModelAdmin):
    list_display=['username','email','gender']

@admin.register(DonorProfile)
class DonorAdmin(admin.ModelAdmin):
    list_display=['get_name','get_email']

    def get_name(self,obj):
        return obj.user.username
    
    def get_email(self,obj):
        return obj.user.email
    
    get_name.short_description="Name"
    get_email.short_description="Email"

@admin.register(RecipientProfile)
class RecipientAdmin(admin.ModelAdmin):
    list_display=['get_name','get_email']

    def get_name(self,obj):
        return obj.user.username
    
    def get_email(self,obj):
        return obj.user.email
        
    get_name.short_description="Name"
    get_email.short_description="Email"

@admin.register(BloodRequest)
class RequestAdmin(admin.ModelAdmin):
    list_display=['get_name','blood_group','urgency_level']

    def get_name(self,obj):
        return obj.recipient.user.username

@admin.register(AvailableBlood)
class AvailableAdmin(admin.ModelAdmin):
    list_display=['get_name','blood_group','location']

    def get_name(self,obj):
        return obj.donor.user.username
    
@admin.register(DonationRequest)
class DonationRequestAdmin(admin.ModelAdmin):
    list_display=['get_recipient','get_available_blood']

    def get_recipient(self,obj):
        return obj.recipient.user.username
    
    def get_available_blood(self,obj):
        return obj.available_blood.blood_group