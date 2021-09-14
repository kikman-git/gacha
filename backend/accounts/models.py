from django.db import models
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import EmailValidator
# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, username, password):
        user = self.model(username=username, )

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, password):
        user = self.create_user(username=username, password=password)
        user.is_superuser = True
        user.save()




class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    gaccha_chances = models.IntegerField(null=True)
    rakuten_point = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()




    USERNAME_FIELD = 'username'
    #REQUIRED_FIELDS is essntial text besides USENAME_FIELD and password
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


    # def __get_label(self, field):
    #     return text_type(self._meta.get_field(field).verbose_name)

    # @property
    # def email_label(self):
    #     return self.__get_label('email')


