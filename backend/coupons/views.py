from coupons.models import Coupons
from coupons.serializers import CouponSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

class CouponList(generics.ListCreateAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (AllowAny,)


class CouponDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (AllowAny,)