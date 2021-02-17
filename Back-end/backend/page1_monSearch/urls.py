from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from django.conf.urls import url, include

app_name = "page1_monSearch"

router = routers.DefaultRouter()
router.register(r'', views.MonSearchViewSet)
urlpatterns = [
    url('api-auth/', include("rest_framework.urls")),
    url(r"^$", include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)