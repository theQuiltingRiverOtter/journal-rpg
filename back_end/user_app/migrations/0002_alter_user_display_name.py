# Generated by Django 5.0 on 2023-12-11 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(max_length=35, unique=True),
        ),
    ]
