from django.urls import path
from .views import (
    ThymeProfiles,
    SingleThymProfile,
    ThymeDay,
    SingleThymeDay,
    NewThymeEntry,
)

urlpatterns = [
    path("", ThymeProfiles.as_view(), name="thyme_profiles"),
    path("<int:thyme_id>/", SingleThymProfile.as_view(), name="single_thyme_profile"),
    path("<int:thyme_id>/day/", ThymeDay.as_view(), name="thyme_days"),
    path(
        "<int:thyme_id>/day/<int:day>/",
        SingleThymeDay.as_view(),
        name="single_thyme_day",
    ),
    path("<int:thyme_id>/new_entry/", NewThymeEntry.as_view(), name="new_thyme_entry"),
]
