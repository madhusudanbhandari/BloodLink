from django.contrib import admin
from .models import MyUser,DonorProfile,RecipientProfile

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
        return obj.user.username
    
    get_name.short_description="Name"
    get_email.short_description="Email"

@admin.register(RecipientProfile)
class RecipientAdmin(admin.ModelAdmin):
    list_display=['get_name','get_email']

    def get_name(self,obj):
        return obj.user.username
    
    def get_email(self,obj):
        return obj.user.username
    
    get_name.short_description="Name"
    get_email.short_description="Email"
