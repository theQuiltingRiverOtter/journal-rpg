from rest_framework import serializers
from .models import OneDayThyme, OneDayThymeProfile
from entry_app.serializers import EntrySerializer


class OneDayThymeProfileSerializer(serializers.ModelSerializer):
    days = serializers.SerializerMethodField()

    class Meta:
        model = OneDayThymeProfile
        fields = [
            "id",
            "house_description",
            "home_location",
            "game_profile",
            "start_date",
            "days",
        ]

    def get_days(self, instance):
        days = instance.days.all()
        ser_days = [OneDayThymeSerializer(day).data for day in days]
        return ser_days


class OneDayThymeSerializer(serializers.ModelSerializer):
    entries = serializers.SerializerMethodField()

    class Meta:
        model = OneDayThyme
        fields = ["id", "profile", "total_prompts", "entries", "prompts", "day"]

    def get_entries(self, instance):
        entries = instance.entries.all()
        ser_entries = [EntrySerializer(entry).data for entry in entries]
        return ser_entries
