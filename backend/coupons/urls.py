from django.urls import include, path
from .views import CouponList, CouponDetail, CouponCreate
from rest_framework.authtoken import views

urlpatterns = [
    path('', CouponList.as_view()),
    path('create/', CouponCreate.as_view()),
    path('<int:pk>/', CouponDetail.as_view())
]