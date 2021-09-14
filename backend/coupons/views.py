from coupons.models import Coupons
from coupons.serializers import CouponSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

class CouponList(generics.ListCreateAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (IsAuthenticated,)


class CouponDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Coupons.objects.all()
    serializer_class = CouponSerializer
    permission_classes = (IsAuthenticated,)