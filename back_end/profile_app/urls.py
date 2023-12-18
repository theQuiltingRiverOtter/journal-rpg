from django.urls import path
from .views import Profiles, SingleProfile, AloneProfile, ThymeProfile, AllGames

urlpatterns = [
    path("", Profiles.as_view(), name="profiles"),
    path("<int:profile_id>/", SingleProfile.as_view(), name="single_profile"),
    path("games/", AllGames.as_view(), name="all_games"),
    path("alone/", AloneProfile.as_view(), name="alone_profile"),
    path("thyme/", ThymeProfile.as_view(), name="thyme_profile"),
]
