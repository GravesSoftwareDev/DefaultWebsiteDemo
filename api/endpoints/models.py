from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Generic Product Model
class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    published = models.BooleanField(default=False)
    release_date = models.DateField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    price = models.CharField(max_length=10)

    class Meta:
        ordering = ['published','created','price']

# Images for Product Gallery
class ProductImg(models.Model):
    product = models.ForeignKey(
        Product,
        related_name = 'gallery',
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default = 0)

    class Meta:
        ordering = ['-order']

# Contact info gathered from a contact form
class Contact(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField()
    phone_num = PhoneNumberField(blank=True)
    message = models.TextField()
    created = models.DateField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-read','-created']