
from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):

    name = models.CharField(max_length=100)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


class BlacklistedToken(models.Model):
    token = models.CharField(
        max_length=255,
        unique=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

