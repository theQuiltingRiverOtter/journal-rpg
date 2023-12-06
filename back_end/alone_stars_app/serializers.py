from rest_framework import serializers
from .models import AloneAmongStars
from entry_app.serializers import EntrySerializer


class AloneSerializer(serializers.ModelSerializer):
    entries = serializers.SerializerMethodField()

    class Meta:
        model = AloneAmongStars
        fields = [
            "id",
            "planet_name",
            "game_profile",
            "total_prompts",
            "prompts",
            "entries",
        ]

    def get_entries(self, instance):
        entries = instance.entries.all()
        ser_entries = [EntrySerializer(entry).data for entry in entries]
        return ser_entries
