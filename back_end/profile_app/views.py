from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from .models import GameProfile
from .serializers import ProfileSerializer


# Create your views here.
class Profiles(APIView):
    def get(self, request):
        try:
            ser_profiles = ProfileSerializer(
                request.user.game_profiles.all(), many=True
            )
            return Response(ser_profiles.data)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            data = request.data.copy()
            data["user"] = request.user
            print(data)
            new_profile = GameProfile.objects.create(**data)
            new_profile.save()
            ser_profile = ProfileSerializer(new_profile)
            return Response(ser_profile.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class SingleProfile(APIView):
    def get(self, request, profile_id):
        try:
            ser_profile = ProfileSerializer(GameProfile.objects.get(id=profile_id))
            return Response(ser_profile.data, status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_404_NOT_FOUND)

    def put(self, request, profile_id):
        profile = GameProfile.objects.get(id=profile_id)
        if profile:
            ser_profile = ProfileSerializer(profile, data=request.data, partial=True)
            if ser_profile.is_valid():
                ser_profile.save()
                return Response(ser_profile.data, status=HTTP_200_OK)
            return Response(ser_profile.errors, status=HTTP_400_BAD_REQUEST)
        return Response("Profile does not exist", status=HTTP_404_NOT_FOUND)

    def delete(self, request, profile_id):
        print(profile_id)
        profile = GameProfile.objects.get(id=profile_id)
        if profile:
            profile.delete()
            return Response("Profile deleted", status=HTTP_204_NO_CONTENT)
        return Response("Profile does not exist", status=HTTP_404_NOT_FOUND)


class AloneProfile(APIView):
    def get(self, request):
        try:
            ser_profile = ProfileSerializer(
                request.user.game_profiles.filter(
                    game_name="Alone Among the Stars"
                ).first()
            )
            return Response(ser_profile.data)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class ThymeProfile(APIView):
    def get(self, request):
        try:
            ser_profile = ProfileSerializer(
                request.user.game_profiles.filter(
                    game_name="One Day at a Thyme"
                ).first()
            )
            return Response(ser_profile.data)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
