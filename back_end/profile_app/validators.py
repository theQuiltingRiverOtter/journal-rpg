from django.core.exceptions import ValidationError


def validate_game_name(game_name):
    error_message = "Not a valid game choice"
    choices = ["Alone Among the Stars", "One Day at a Thyme"]
    if game_name in choices:
        return game_name
    else:
        raise ValidationError(error_message, params={"game_name": game_name})
