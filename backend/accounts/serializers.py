from rest_framework import serializers
from .models import UserAccount
from rest_framework.validators import UniqueValidator


# class UserSerializer(serializers.ModelSerializer):
#     Meta:
#         model = UserAccount

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'password', 'gaccha_chances', 'rakuten_point', "confirm_password"]
        validators = [
            
        ]


    def validate(self, attrs):
        print('validate')
        print(attrs)
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})





        return attrs


    def create(self, validated_data):
        print('you are here1')
        user = UserAccount.objects.create(
            username=validated_data['username'],
            gaccha_chances=10,
            rakuten_point=0
        )

        
        user.set_password(validated_data['password'])
        user.save()


        return user