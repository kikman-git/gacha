from django.urls import include, path
from .views import RegisterView
from rest_framework.authtoken import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('api-token-auth/', views.obtain_auth_token)
]