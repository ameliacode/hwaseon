from django.db import models

# Create your models here.

class MonthlySearch(models.Model):
    keyword = models.CharField(max_length=40)
    pc = models.IntegerField()
    mobile = models.IntegerField()
    pc_mobile = models.IntegerField()
    comp1 = models.IntegerField()

    blog = models.IntegerField()
    cafe = models.IntegerField()
    blog_cafe = models.IntegerField()
    comp2 = models.IntegerField()

    def __str__(self):
        return self.keyword
