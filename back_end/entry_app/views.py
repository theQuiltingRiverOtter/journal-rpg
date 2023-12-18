from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from .models import Entry
from .serializers import EntrySerializer


# Create your views here.
class AllEntries(APIView):
    def get(self, request):
        try:
            entries = request.user.entries.all()
            ser_entries = EntrySerializer(entries, many=True)
            return Response(ser_entries.data, status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class SingleEntry(APIView):
    def get(self, request, entry_id):
        try:
            entry = request.user.entries.get(id=entry_id)
            if entry:
                ser_entry = EntrySerializer(entry)
                return Response(ser_entry.data, status=HTTP_204_NO_CONTENT)
            return Response("entry not found", status=HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response("something went wrong", status=HTTP_400_BAD_REQUEST)

    def put(self, request, entry_id):
        entry = request.user.entries.get(id=entry_id)
        if entry:
            ser_entry = EntrySerializer(entry, data=request.data, partial=True)
            if ser_entry.is_valid():
                ser_entry.save()
                return Response(ser_entry.data, status=HTTP_204_NO_CONTENT)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        return Response("Entry not found", status=HTTP_404_NOT_FOUND)

    def delete(self, request, entry_id):
        entry = Entry.objects.get(id=entry_id)
        if entry:
            entry.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response("Entry does not exist", status=HTTP_404_NOT_FOUND)
