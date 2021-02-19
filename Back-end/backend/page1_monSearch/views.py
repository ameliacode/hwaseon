from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import MonSearchSerializer
from .models import MonthlySearch

# Create your views here.
class MonSearchViewSet(viewsets.ModelViewSet):
    queryset = MonthlySearch.objects.all()
    serializer_class = MonSearchSerializer

    def