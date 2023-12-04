from django.urls import path
from .views import SignUp, LogIn, LogOut, Info, SuperUser

urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", LogIn.as_view(), name="login"),
    path("logout/", LogOut.as_view(), name="logout"),
    path("info/", Info.as_view(), name="info"),
    path("super/secret/signup/", SuperUser.as_view(), name="superuser"),
]
