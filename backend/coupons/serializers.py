from rest_framework import serializers
from .models import Coupons
from rest_framework.validators import UniqueValidator


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupons
        fields = ['id', 'value', 'user', 'genre', 'status', 'expire_date']