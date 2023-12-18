from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
)
from .models import User
from .serializers import UserSerializer


# Create your views here.
class SignUp(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": user.display_name, "token": token.key}, status=HTTP_201_CREATED
        )


class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        print(user)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.display_name})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)


class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class LogOut(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class Info(UserPermissions):
    def get(self, request):
        user_info = UserSerializer(request.user)
        if user_info:
            return Response(user_info.data, status=HTTP_200_OK)
        else:
            return Response("user not found", status=HTTP_404_NOT_FOUND)


class SuperUser(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        super_user = User.objects.create_user(**request.data)
        super_user.is_staff = True
        super_user.is_superuser = True
        super_user.save()
        token = Token.objects.create(user=super_user)
        return Response(
            {"super_user": super_user.email, "token": token.key},
            status=HTTP_201_CREATED,
        )
