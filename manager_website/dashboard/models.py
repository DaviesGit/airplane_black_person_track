from django.db import models


# Create your models here.

class BlackPerson(models.Model):
    name = models.CharField(max_length=512, default=None)
    sex = models.CharField(max_length=512, default=None)
    age = models.CharField(max_length=512, default=None)
    native_place = models.CharField(max_length=512, default=None)
    political_outlook = models.CharField(max_length=512, default=None)
    email = models.CharField(max_length=512, default=None)
    telephone = models.CharField(max_length=512, default=None)
    id_card = models.CharField(max_length=512, default=None)
    address = models.CharField(max_length=512, default=None)
    domicile = models.CharField(max_length=512, default=None)
    is_fugitive = models.CharField(max_length=512, default=None)
    is_crime = models.CharField(max_length=512, default=None)
    comment = models.CharField(max_length=512, default=None)
