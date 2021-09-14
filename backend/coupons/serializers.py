from rest_framework import serializers
from .models import Coupons
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupons
        fields = ['id', 'value', 'user', 'genre', 'status', 'expire_date']


    def create(self, validated_data):
        request = self.context.get("request")
        token =request.auth.key
        user = Token.objects.get(key=token).user
        if validated_data["user"].id == user.id:
            return Coupons.objects.create(**validated_data)
        else:
            validated_data["user"] = user
            return Coupons.objects.create(**validated_data)