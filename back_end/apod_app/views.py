from rest_framework.views import APIView
from rest_framework.response import Response
from journal_rpg_proj.settings import env
import requests


# Create your views here.
class APOD_View(APIView):
    def get(self, request):
        key = env.get("APOD_KEY")
        url = f"https://api.nasa.gov/planetary/apod?api_key={key}&thumbs=True"
        response = requests.get(url)
        return Response(response.json())
