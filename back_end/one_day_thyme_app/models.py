from django.db import models
from profile_app.models import GameProfile
from entry_app.models import Entry
from django.core import validators as v
from datetime import date
from django.contrib.postgres.fields import ArrayField
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
    total_prompts = models.PositiveIntegerField(validators=[v.MaxValueValidator(6)])
    prompts = ArrayField(models.CharField(), default=list)
    entries = models.ManyToManyField(Entry, blank=True)
    day = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.profile} ${self.total_prompts} ${len(self.prompts)} ${self.entries.count()} ${self.day}"
