from rest_framework import permissions
from rest_framework.authtoken.models import Token


class AuthenticatedUserOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        token =request.auth.key
        user = Token.objects.get(key=token).user
        return obj.user == user