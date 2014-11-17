from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.contrib import messages
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator



from diary.models import DiaryEntry
from diary.forms import DiaryEntryForm
from django.contrib.auth.models import User


# Create your views here.

# entry detail page for current day
# day based archive view


@login_required
def diary(request, user_profile_id):
    u = DiaryEntry.objects.get_or_create(request)
    return render_to_response('diary/base_diary.html', {'user_profile_id': user_profile_id, 'username': request.user.username})


def ajax_get_date(request):
    if request.is_ajax() and request.POST:
        data = {}
        blog = BlogPost.objects.get(pk=request.POST.get("blogId", ''))

# @login_required
# def add_diary_entry(request):
#     if request.method == 'POST':
#         form = DiaryEntryForm(request.POST, instance=request.user.profile)
#         # entry_date = request.POST.get('entry_date', '')
#         # DiaryEntry.objects.get_or_create(entry_date=entry_date)
#         if form.is_valid():
#             print 'is valid'
#             form.save()
#             # DiaryEntry.objects.get_or_create()
#             return HttpResponseRedirect('/diary/')
#         else:
#             print form.errors
#     else:
#         form = DiaryEntryForm(instance=request.user.profile)
#     token = {}
#     token.update(csrf(request))
#     token['form'] = form
#     return render_to_response('diary/base_diary.html', token)
#
#
# class DetailView(generic.DetailView):
#     model = DiaryEntry
#     template_name = 'diary/diary_detail.html'
#
#     @method_decorator(login_required)
#     def dispatch(self, *args, **kwargs):
#         return super(DetailView, self).dispatch(*args, **kwargs)
#     # def get_queryset(self):
#     #     return DiaryEntry.objects()