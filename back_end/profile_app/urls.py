from django.urls import path
from .views import Profiles, SingleProfile, AloneProfile

urlpatterns = [
    path("", Profiles.as_view(), name="profiles"),
    path("<int:profile_id>", SingleProfile.as_view(), name="single_profile"),
    path("alone/", AloneProfile.as_view(), name="alone_profile"),
]
