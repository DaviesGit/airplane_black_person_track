# Generated by Django 2.1.2 on 2018-11-02 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blackperson',
            name='address',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='comment',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='domicile',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='email',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='id_card',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='is_crime',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='is_fugitive',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='native_place',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='political_outlook',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='sex',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AddField(
            model_name='blackperson',
            name='telephone',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AlterField(
            model_name='blackperson',
            name='age',
            field=models.CharField(default=None, max_length=512),
        ),
        migrations.AlterField(
            model_name='blackperson',
            name='name',
            field=models.CharField(default=None, max_length=512),
        ),
    ]
