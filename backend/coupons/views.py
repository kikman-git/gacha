from django.http.response import JsonResponse
from coupons.models import Coupons
from coupons.serializers import CouponSerializer
from rest_framework import generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permission import AuthenticatedUserOnly
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
import json

class CouponCreate(generics.CreateAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (AuthenticatedUserOnly,)


    def valid_request(self, request):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        token =self.request.auth.key
        user = Token.objects.get(key=token).user
        if body_data['user'] == str(user.id):
            return True
        else:
            PermissionDenied()



class CouponList(generics.ListAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (AuthenticatedUserOnly,)

    def get(self, request):
        try:
            token =self.request.auth.key
            user = Token.objects.get(key=token).user
            coupons =  Coupons.objects.filter(user=user)
            serializer = CouponSerializer(coupons, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(e)
            raise PermissionDenied()


class CouponDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (AuthenticatedUserOnly,)