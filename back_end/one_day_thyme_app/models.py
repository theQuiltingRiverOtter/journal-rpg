from django.db import models
from profile_app.models import GameProfile
from entry_app.models import Entry
from django.core import validators as v
from datetime import date

from .validators import validate_location


# Create your models here.
class OneDayThymeProfile(models.Model):
    house_description = models.TextField(default="Unknown")
    home_location = models.CharField(validators=[validate_location])
    game_profile = models.ForeignKey(GameProfile, on_delete=models.CASCADE)
    start_date = models.DateField(default=date.today)


class OneDayThyme(models.Model):
    profile = models.ForeignKey(
        OneDayThymeProfile, on_delete=models.CASCADE, related_name="days"
    )
    day = models.PositiveIntegerField(default=1)
    total_prompts = models.PositiveIntegerField(validators=[v.MaxValueValidator(6)])
    entries = models.ManyToManyField(Entry)
