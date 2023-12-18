from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from .models import OneDayThymeProfile, OneDayThyme
from .serializers import OneDayThymeProfileSerializer, OneDayThymeSerializer
from entry_app.models import Entry
from entry_app.serializers import EntrySerializer
import random
from .utils import get_prompts


# Create your views here.
class NewThymeEntry(APIView):
    def post(self, request, thyme_id, day):
        try:
            data = request.data.copy()
            data["user"] = request.user
            user_game_profile = request.user.game_profiles.filter(
                game_name="One Day at a Thyme"
            ).first()
            data["game_profile"] = user_game_profile
            thyme_profile = OneDayThymeProfile.objects.get(id=thyme_id)
            thyme_instance = OneDayThyme.objects.filter(
                profile=thyme_profile, day=day
            ).first()
            new_thyme_entry = Entry.objects.create(**data)
            new_thyme_entry.save()
            thyme_instance.entries.add(new_thyme_entry)
            thyme_instance.save()
            ser_thyme_entry = EntrySerializer(new_thyme_entry)
            return Response(ser_thyme_entry.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class ThymeProfiles(APIView):
    def get(self, request):
        try:
            user_game_profile = request.user.game_profiles.filter(
                game_name="One Day at a Thyme"
            ).first()
            thyme_profiles = OneDayThymeProfile.objects.filter(
                game_profile=user_game_profile
            )
            ser_thyme_profiles = OneDayThymeProfileSerializer(thyme_profiles, many=True)
            return Response(ser_thyme_profiles.data)
        except Exception as e:
            print(e)
            return Response("Somethin went wrong", status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            user_game_profile = request.user.game_profiles.filter(
                game_name="One Day at a Thyme"
            ).first()
            data = request.data.copy()
            if "game_profile" not in data or data["game_profile"] == "":
                data["game_profile"] = user_game_profile
            new_thyme_profile = OneDayThymeProfile.objects.create(**data)
            new_thyme_profile.save()
            ser_thyme_profile = OneDayThymeProfileSerializer(new_thyme_profile)

            return Response(ser_thyme_profile.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class SingleThymProfile(APIView):
    def get(self, request, thyme_id):
        try:
            thyme_prof = OneDayThymeProfile.objects.get(id=thyme_id)
            ser_thyme_prof = OneDayThymeProfileSerializer(thyme_prof)
            return Response(ser_thyme_prof.data)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_404_NOT_FOUND)

    def put(self, request, thyme_id):
        thyme_prof = OneDayThymeProfile.objects.get(id=thyme_id)
        if thyme_prof:
            ser_thyme_prof = OneDayThymeProfileSerializer(
                thyme_prof, data=request.data, partial=True
            )
            if ser_thyme_prof.is_valid():
                ser_thyme_prof.save()
                return Response(ser_thyme_prof.data, status=HTTP_200_OK)
            return Response(ser_thyme_prof.errors, status=HTTP_400_BAD_REQUEST)
        return Response(
            "One Day at a Thyme game instance does not exist", status=HTTP_404_NOT_FOUND
        )

    def delete(self, request, thyme_id):
        thyme_prof = OneDayThymeProfile.objects.get(id=thyme_id)
        if thyme_prof:
            thyme_prof.delete()
            return Response(
                "One Day at a Thyme game instance deleted",
                status=HTTP_204_NO_CONTENT,
            )
        return Response(
            "One Day at a Thyme game instance doesn't exist", status=HTTP_404_NOT_FOUND
        )


class ThymeDay(APIView):
    def get(self, request, thyme_id):
        try:
            user_game_profile = request.user.game_profiles.filter(
                game_name="One Day at a Thyme"
            ).first()
            thyme_profiles = OneDayThymeProfile.objects.filter(
                game_profile=user_game_profile
            )
            oneDayThyme = OneDayThyme.objects.filter(profile=thyme_id)
            ser_thyme_days = OneDayThymeSerializer(oneDayThyme, many=True)
            return Response(ser_thyme_days.data)
        except Exception as e:
            print(e)
            return Response("Somethin went wrong", status=HTTP_400_BAD_REQUEST)

    def post(self, request, thyme_id):
        try:
            thyme_profile = OneDayThymeProfile.objects.get(id=thyme_id)
            data = request.data.copy()
            data["profile"] = thyme_profile

            data["total_prompts"] = random.randint(1, 6)
            data["prompts"] = get_prompts(data["total_prompts"])
            new_thyme_instance = OneDayThyme.objects.create(**data)
            new_thyme_instance.save()
            ser_thyme_instance = OneDayThymeSerializer(new_thyme_instance)
            return Response(ser_thyme_instance.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class SingleThymeDay(APIView):
    def get(self, request, thyme_id, day_id):
        try:
            thyme_profile = OneDayThymeProfile.objects.get(id=thyme_id)
            thyme_instance = OneDayThyme.objects.filter(
                profile=thyme_profile, id=day_id
            ).first()
            ser_thyme_instance = OneDayThymeSerializer(thyme_instance)
            return Response(ser_thyme_instance.data)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_404_NOT_FOUND)

    def put(self, request, thyme_id, day_id):
        thyme_profile = OneDayThymeProfile.objects.get(id=thyme_id)
        thyme_instance = OneDayThyme.objects.filter(
            profile=thyme_profile, id=day_id
        ).first()
        if thyme_instance:
            ser_thyme_instance = OneDayThymeSerializer(
                thyme_instance, data=request.data, partial=True
            )
            if ser_thyme_instance.is_valid():
                ser_thyme_instance.save()
                return Response(thyme_instance.data, status=HTTP_200_OK)
            return Response(thyme_instance.errors, status=HTTP_400_BAD_REQUEST)
        return Response("That day or profile doesn't exist", status=HTTP_404_NOT_FOUND)

    def delete(self, request, thyme_id, day_id):
        thyme_profile = OneDayThymeProfile.objects.get(id=thyme_id)
        thyme_instance = OneDayThyme.objects.filter(
            profile=thyme_profile, id=day_id
        ).first()
        if thyme_instance:
            thyme_instance.delete()
            return Response("Day deleted", status=HTTP_204_NO_CONTENT)
        return Response("Day or profile doesn't exist", status=HTTP_404_NOT_FOUND)
