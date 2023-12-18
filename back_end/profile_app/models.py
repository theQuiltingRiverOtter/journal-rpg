from django.db import models
from user_app.models import User
from .validators import validate_game_name


# Create your models here.
class GameProfile(models.Model):
    player_name = models.CharField()
    game_name = models.CharField(validators=[validate_game_name])
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="game_profiles", default=1
    )
    public = models.BooleanField(default=False)
