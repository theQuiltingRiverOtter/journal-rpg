from django.db import models
from user_app.models import User
from profile_app.models import GameProfile
from django.utils import timezone


# Create your models here.
class Entry(models.Model):
    posted_date = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    prompt = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="entries")
    game_profile = models.ForeignKey(
        GameProfile, on_delete=models.CASCADE, related_name="entries", default=1
    )
