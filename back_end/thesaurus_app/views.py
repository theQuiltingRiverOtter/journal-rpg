from rest_framework.views import APIView
from rest_framework.response import Response
import requests


# Create your views here.
class Thesaurus_View(APIView):
    def get(self, request, word):
        url = f"https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{word}?key=fe592132-d889-4627-9e56-d7a3d26fa98f"
        response = requests.get(url)
        print(response.json())
        return Response(response.json())
