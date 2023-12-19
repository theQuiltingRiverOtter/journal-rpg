from rest_framework.views import APIView
from rest_framework.response import Response
from journal_rpg_proj.settings import env
import requests


# Create your views here.
class Thesaurus_View(APIView):
    def get(self, request, word):
        key = env.get("THESAURUS_KEY")
        url = f"https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{word}?key={key}"
        response = requests.get(url)
        print(response.json())
        return Response(response.json())
