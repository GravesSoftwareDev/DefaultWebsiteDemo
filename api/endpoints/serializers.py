from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import ProductImg, Product, Contact

phone_validator = RegexValidator(
    regex=r'^\+?1?\s*\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$',
    message='Enter a valid phone number, e.g. 4171231234 or (417) 123-1234.'
)

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImg
        fields = ['id','image','alt_text','order']

class ProductSerializer(serializers.ModelSerializer):
    gallery = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id','hero_image','title','description','published','price','gallery','created','updated','release_date']
        read_only_fields = ['id','created','updated']

class ContactSerializer(serializers.ModelSerializer):
    phone_num = serializers.CharField(
        required=False,
        allow_blank=True,
        validators=[phone_validator]
    )

    class Meta:
        model = Contact
        fields = ['id','first_name','last_name','email','phone_num','message','created','read']