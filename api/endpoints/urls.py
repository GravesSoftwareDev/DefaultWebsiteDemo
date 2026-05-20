from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProductViewSet, ContactViewSet

router = DefaultRouter()

router.register('products', ProductViewSet)
router.register('contacts', ContactViewSet)

urlpatterns = [
    path('',include(router.urls))
]
