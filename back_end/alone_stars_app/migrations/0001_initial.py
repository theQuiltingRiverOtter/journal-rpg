# Generated by Django 5.0 on 2023-12-05 03:13

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('entry_app', '0002_remove_entry_game_profile_alter_entry_posted_date_and_more'),
        ('profile_app', '0002_gameprofile_user_alter_gameprofile_game_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='AloneAmongStars',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('planet_name', models.CharField(validators=[django.core.validators.MinLengthValidator(2)])),
                ('total_prompts', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(6)])),
                ('entries', models.ManyToManyField(to='entry_app.entry')),
                ('game_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profile_app.gameprofile')),
            ],
        ),
    ]
