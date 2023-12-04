from django.db import models
from user_app.models import User
from profile_app.models import GameProfile
from alone_stars_app.models import AloneAmongStars


# Create your models here.
class Entry(models.Model):
    posted_date = models.DateTimeField()
    content = models.TextField()
    prompt = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="entries")
    game_profile = models.ManyToManyField(GameProfile, related_name="entries")
    # alone_game_instance = models.ForeignKey(
    #     null=True,
    #     blank=True,
    #     to=AloneAmongStars,
    #     on_delete=models.CASCADE,
    #     related_name="entries",
    # )
    # thyme_game_instance = models.ForeignKey(
    #     null=True,
    #     blank=True,
    #     to=OneDayThyme,
    #     on_delete=models.CASCADE,
    #     related_name="entries",
    # )
