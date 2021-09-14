from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
from .models import UserAccount
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer