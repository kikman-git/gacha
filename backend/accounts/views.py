from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
from .models import UserAccount
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status


class RegisterView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = UserAccount.objects.get(id=serializer.data['id'])
            token, created = Token.objects.get_or_create(user=user)
            serializer_data = {**serializer.data, "token": token.key}
            return Response(serializer_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
            "user_uuid": user.user_uuid,
            'username': user.username,
            'gacha_chances' : user.gacha_chances,
            'rakuten_point' : user.rakuten_point
        })