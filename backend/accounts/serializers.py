from django.core.validators import validate_ipv4_address
from rest_framework import serializers
from .models import UserAccount
from rest_framework.validators import UniqueValidator


# class UserSerializer(serializers.ModelSerializer):
#     Meta:
#         model = UserAccount

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)
    friend_uuid = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'password', 'gacha_chances', 'rakuten_point', "confirm_password", "user_uuid"]
        validators = [
            
        ]

    def __init__(self, *args, **kwargs):
        self.Meta.fields = list(self.Meta.fields)
        self.Meta.fields.append('friend_uuid')
        super(RegisterSerializer, self).__init__(*args, **kwargs)


    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})





        return attrs


    def create(self, validated_data):
        friend_uuid = validated_data.get('friend_uuid')
        if friend_uuid is not None and UserAccount.objects.filter(user_uuid=validated_data["friend_uuid"]).exists():
            user = UserAccount.objects.get(user_uuid=validated_data["friend_uuid"])
            user.gacha_chances += 1
            user.save()

        user = UserAccount.objects.create(
            username=validated_data['username'],
            gacha_chances=10,
            rakuten_point=0
        )

        
        user.set_password(validated_data['password'])
        user.save()


        return user