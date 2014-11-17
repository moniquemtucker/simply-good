__author__ = 'Monique Tucker'

from django.conf.urls import patterns, include, url

from diary import views

urlpatterns = patterns('',
    url(r'^(?P<user_profile_id>\d+)/$', views.diary, name='diary'),
    url(r'^get_date/$', views.ajax_get_date, name='get_date'),
    # url(r'^$', views.diary, name='diary'),
    # url(r'^$', views.add_diary_entry, name='add_diary_entry'),
    # url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='diary_detail'),
)