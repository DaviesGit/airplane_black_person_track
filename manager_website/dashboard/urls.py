from django.urls import path, re_path

from . import views

urlpatterns = [
    path('update_data', views.update_data, name='update_data'),
    # path('<path:path>', views.all_file, name='all_file'),
    re_path(r'.+\.html', views.all_html, name='all_html'),
]
