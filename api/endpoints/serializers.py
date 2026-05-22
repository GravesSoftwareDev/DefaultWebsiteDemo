from rest_framework import serializers
from .models import ProductImg, Product, Contact

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImg
        fields = ['id','image','alt_text','order']

class ProductSerializer(serializers.ModelSerializer):
    gallery = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id','hero_image','title','description','published','price','gallery','created','updated','release_date']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id','first_name','last_name','email','phone_num','message','created','read']