from rest_framework import serializers
from .models import User
from profile_app.serializers import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    game_profiles = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["display_name", "email", "age", "game_profiles"]

    def get_game_profiles(self, instance):
        game_profiles = instance.game_profiles.all()
        ser_game_profiles = [ProfileSerializer(game).data for game in game_profiles]
        return ser_game_profiles
