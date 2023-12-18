from django.urls import path
from .views import APOD_View

urlpatterns = [path("", APOD_View.as_view(), name="APOD")]
