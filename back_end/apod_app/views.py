from rest_framework.views import APIView
from rest_framework.response import Response
import requests


# Create your views here.
class APOD_View(APIView):
    def get(self, request):
        url = f"https://api.nasa.gov/planetary/apod?api_key=GMQInfiIXgwjqHxYTM77CZJQwB0NRfcEAeyCNDy3&thumbs=True"
        response = requests.get(url)
        return Response(response.json())
