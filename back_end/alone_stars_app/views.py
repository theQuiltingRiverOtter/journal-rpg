from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from .models import AloneAmongStars
from .serializers import AloneSerializer
from entry_app.models import Entry
from entry_app.serializers import EntrySerializer
from random import randint
from .utils import get_planet_name, get_alone_prompts


class NewAloneEntry(APIView):
    def post(self, request, alone_id):
        try:
            data = request.data.copy()
            data["user"] = request.user
            user_game_profile = request.user.game_profiles.filter(
                game_name="Alone Among the Stars"
            ).first()
            data["game_profile"] = user_game_profile
            alone_profile = AloneAmongStars.objects.get(id=alone_id)
            new_alone_entry = Entry.objects.create(**data)
            new_alone_entry.save()
            alone_profile.entries.add(new_alone_entry)
            alone_profile.save()
            ser_alone_entry = EntrySerializer(new_alone_entry)
            return Response(ser_alone_entry.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


# Create your views here.
class AloneProfiles(APIView):
    def get(self, request):
        try:
            user_game_profile = request.user.game_profiles.filter(
                game_name="Alone Among the Stars"
            ).first()
            alone_profiles = AloneAmongStars.objects.filter(
                game_profile=user_game_profile
            )
            ser_alone = AloneSerializer(alone_profiles, many=True)
            return Response(ser_alone.data)
        except Exception as e:
            print(e)
            return Response("Somethin went wrong", status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            user_game_profile = request.user.game_profiles.filter(
                game_name="Alone Among the Stars"
            ).first()

            data = request.data.copy()
            if "game_profile" not in data or data["game_profile"] == "":
                data["game_profile"] = user_game_profile
            data["total_prompts"] = randint(1, 6)
            data["planet_name"] = get_planet_name()
            data["prompts"] = get_alone_prompts(data["total_prompts"])
            new_alone_profile = AloneAmongStars.objects.create(**data)
            new_alone_profile.save()
            ser_alone_profile = AloneSerializer(new_alone_profile)
            return Response(ser_alone_profile.data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class SingleAloneProfile(APIView):
    def get(self, request, alone_id):
        try:
            alone_prof = AloneAmongStars.objects.get(id=alone_id)
            ser_alone_prof = AloneSerializer(alone_prof)
            return Response(ser_alone_prof.data, status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_404_NOT_FOUND)

    def put(self, request, alone_id):
        alone_prof = AloneAmongStars.objects.get(id=alone_id)
        if alone_prof:
            ser_alone_prof = AloneSerializer(
                alone_prof, data=request.data, partial=True
            )
            if ser_alone_prof.is_valid():
                ser_alone_prof.save()
                return Response(ser_alone_prof.data, status=HTTP_200_OK)
            return Response(ser_alone_prof.errors, status=HTTP_400_BAD_REQUEST)
        return Response(
            "Along Among stars instance does not exist", status=HTTP_404_NOT_FOUND
        )

    def delete(self, request, alone_id):
        alone_prof = AloneAmongStars.objects.get(id=alone_id)
        if alone_prof:
            alone_prof.delete()
            return Response(
                "Alone Among the Stars Game instance deleted",
                status=HTTP_204_NO_CONTENT,
            )
        return Response(
            "Alone Among Stars Game Instance doesn't exist", status=HTTP_404_NOT_FOUND
        )
