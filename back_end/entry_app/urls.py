from django.urls import path
from .views import AllEntries, SingleEntry

urlpatterns = [
    path("", AllEntries.as_view(), name="alone_profiles"),
    path("<int:entry_id>", SingleEntry.as_view(), name="single_alone_profile"),
]
