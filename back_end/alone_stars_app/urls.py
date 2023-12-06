from django.urls import path
from .views import AloneProfiles, SingleAloneProfile, NewAloneEntry

urlpatterns = [
    path("", AloneProfiles.as_view(), name="alone_profiles"),
    path("<int:alone_id>/", SingleAloneProfile.as_view(), name="single_alone_profile"),
    path("<int:alone_id>/new_entry/", NewAloneEntry.as_view(), name="new_alone_entry"),
]
