from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProductViewSet, ProductImgViewSet, ContactViewSet

router = DefaultRouter()

router.register('products', ProductViewSet, basename='product')
router.register('product-images', ProductImgViewSet, basename='product-image')
router.register('contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls))
]
