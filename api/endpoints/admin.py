from django.contrib import admin
from .models import Product, ProductImg, Contact

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title','description','published','release_date','price']
    list_filter = ['published']
    search_fields = ['title','release_date','price']
    date_hierarchy = 'release_date'
    ordering = ['published','created','price']

@admin.register(ProductImg)
class ProductImgAdmin(admin.ModelAdmin):
    list_display = ['product','alt_text','order']
    list_filter = ['product']
    ordering = ['product','order']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['first_name','last_name','email','phone_num','read']
    list_filter = ['read']
    search_fields = ['first_name','last_name']
    ordering = ['read','first_name','last_name']

