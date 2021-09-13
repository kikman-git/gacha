from django.db import models
from accounts.models import UserAccount
# Create your models here.
class Coupons(models.Model): 
    # Choices for genre
    genreChoices  = (
        ('GEN', "Genernal coupons that can be used for every product"),
    )

    # Choices for value
    valueChoices = (
        ('10%', "10% discount"),
        ('100y', "100y discount"),
        ('200y', "200y discount"),
        ('500y', "500y discount"),
        ('1000y', "1000y discount"),
        ('10000y', "10000y discount"),
    )

    genre = models.CharField(max_length=300, choices = genreChoices)
    value = models.CharField(max_length=150, choices = valueChoices)
    user_id = models.ForeignKey(UserAccount, on_delete = models.CASCADE)
    expire_date = models.DateField()
    status = models.BooleanField()

    
