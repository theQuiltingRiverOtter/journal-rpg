from rest_framework import serializers
from .models import GameProfile
from entry_app.serializers import EntrySerializer


class ProfileSerializer(serializers.ModelSerializer):
    entries = serializers.SerializerMethodField()

    class Meta:
        model = GameProfile
        fields = ["id", "player_name", "game_name", "user", "entries"]

    def get_entries(self, instance):
        entries = instance.entries.all()
        ser_entries = [EntrySerializer(entry).data for entry in entries]
        return ser_entries
