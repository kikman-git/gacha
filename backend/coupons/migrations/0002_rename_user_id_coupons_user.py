# Generated by Django 3.2.7 on 2021-09-14 03:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coupons',
            old_name='user_id',
            new_name='user',
        ),
    ]
