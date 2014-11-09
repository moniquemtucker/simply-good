__author__ = 'Monique Tucker'

from django.conf.urls import patterns, include, url

from diary import views

urlpatterns = patterns('',
    url(r'^$', views.diary, name='diary'),
)