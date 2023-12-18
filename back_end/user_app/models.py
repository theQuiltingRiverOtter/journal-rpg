from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(unique=True, max_length=35)
    age = models.PositiveIntegerField(default=18)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
