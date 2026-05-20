from rest_framework import viewsets, permissions
from .models import Product, Contact
from .serializers import ProductSerializer, ContactSerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Product.objects.all()
        return Product.objects.filter(published=True)
    
class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Contact.objects.all()
        return Contact.objects.none()