from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'simply_good_django.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # from exercise: url(r'^$', 'signups.views.home', name='home'),
    url(r'^$', include('signups.urls', namespace='signups')),
    url(r'^admin/', include(admin.site.urls)),
)
