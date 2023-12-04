from django.db import models
from profile_app.models import GameProfile
from entry_app.models import Entry
from django.core import validators as v


# Create your models here.
class AloneAmongStars(models.Model):
    planet_name = models.CharField()
    game_profile = models.ForeignKey(GameProfile)
    total_prompts = models.PositiveIntegerField(validators=[v.MaxValueValidator(6)])
    entries = models.ManyToManyField(Entry)
