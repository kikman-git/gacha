from django.urls import include, path
from .views import RegisterView, CustomAuthToken
from rest_framework.authtoken import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', CustomAuthToken.as_view())
]