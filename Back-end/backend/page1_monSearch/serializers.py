from rest_framework import serializers
from .models import MonthlySearch

class MonSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlySearch
        fields = ("pc","mobile","pc_mobile","comp1", "blog","cafe","blog_cafe","comp2")