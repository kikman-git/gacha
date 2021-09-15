from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
from .models import UserAccount
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response



class RegisterView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'gacha_chances' : user.gaccha_chances,
            'rakuten_point' : user.rakuten_point
        })