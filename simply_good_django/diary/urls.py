__author__ = 'Monique Tucker'

from django.conf.urls import patterns, include, url

from diary import views

urlpatterns = patterns('',
    # url(r'^$', views.diary, name='diary'),
    # url(r'^add_diary_entry/$', views.add_diary_entry, name='add_diary_entry'),
    url(r'^$', views.add_diary_entry, name='add_diary_entry'),
    url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='diary_detail'),
)