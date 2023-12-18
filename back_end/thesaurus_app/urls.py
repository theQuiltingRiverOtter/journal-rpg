from django.urls import path
from .views import Thesaurus_View

urlpatterns = [path("<str:word>", Thesaurus_View.as_view(), name="thesaurus")]
