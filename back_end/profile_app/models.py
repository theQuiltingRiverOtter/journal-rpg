from django.db import models


# Create your models here.
class GameProfile(models.Model):
    player_name = models.CharField()
    game_name = models.CharField()
