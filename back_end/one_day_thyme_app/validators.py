from django.core.exceptions import ValidationError


def validate_location(location):
    error_message = "Not a valid location"
    choices = ["mountainside", "woods", "swamp", "desert", "beneath hill", "by sea"]
    if location in choices:
        return location
    else:
        raise ValidationError(error_message, params={"location": location})
