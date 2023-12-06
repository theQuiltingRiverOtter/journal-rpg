from django.db import models
from django.contrib.postgres.fields import ArrayField
from profile_app.models import GameProfile
from entry_app.models import Entry
from user_app.models import User
from django.core import validators as v


# Create your models here.
class AloneAmongStars(models.Model):
    planet_name = models.CharField(validators=[v.MinLengthValidator(2)])
    game_profile = models.ForeignKey(GameProfile, on_delete=models.CASCADE)
    total_prompts = models.PositiveIntegerField(validators=[v.MaxValueValidator(6)])
    entries = models.ManyToManyField(Entry)
    prompts = ArrayField(models.CharField(), default=list)

    def __str__(self):
        return f"planet_name: {self.planet_name}, game_profile: {self.game_profile}, total_prompts: {self.total_prompts}"
