from rest_framework import serializers
from .models import Coupons
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from rest_framework.response import responses
from django.http import JsonResponse, HttpResponse
from collections import OrderedDict
import json

class CouponSerializer(serializers.ModelSerializer):
    is_coupon = serializers.BooleanField(write_only=True, required=False)
    class Meta:
        model = Coupons
        fields = ['id', 'value', 'user', 'genre', 'status', 'expire_date']


    def __init__(self, *args, **kwargs):
        self.Meta.fields = list(self.Meta.fields)
        self.Meta.fields.append('is_coupon')
        super(CouponSerializer, self).__init__(*args, **kwargs)

    def validate(self, attrs):
        is_coupon = attrs.get('is_coupon') == None
        if is_coupon:
            return attrs
        else:
            request = self.context.get("request")
            token =request.auth.key
            user = Token.objects.get(key=token).user
            user.gacha_chances -= 1
            user.save()
            raise serializers.ValidationError("this is not coupon")


    def create(self, validated_data):
        request = self.context.get("request")
        token =request.auth.key
        user = Token.objects.get(key=token).user
        user.gacha_chances -= 1
        user.save()
        is_coupon = validated_data.get('is_coupon') == None
        if validated_data["user"].id == user.id and is_coupon:

            return Coupons.objects.create(**validated_data)
        else:
            validated_data.pop('is_coupon')
            validated_data["user"] = user
            return Coupons.objects.create(**validated_data)