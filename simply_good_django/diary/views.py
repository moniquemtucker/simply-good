import json

from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.core.context_processors import csrf
from django.contrib import messages
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator



from diary.models import DiaryEntry
from django.contrib.auth.models import User


# Create your views here.

# entry detail page for current day
# day based archive view


@login_required
def diary(request, user_profile_id):
    u = DiaryEntry.objects.get_or_create(request)
    return render_to_response('diary/base_diary.html', {'user_profile_id': user_profile_id,
                                                        'username': request.user.username})


def ajax_get_date(request):
    if request.is_ajax() and request.method == "GET":
        response = {}
        request_date = request.GET["date"]
        request_user = request.GET["userId"]
        if DiaryEntry.objects.get(entry_date=request_date):
            entry = DiaryEntry.objects.get(entry_date=request_date)
            # , user_profile=request_user
            response.update({"whole_foods": entry.whole_foods, "processed_foods": entry.processed_foods,
                             "notes": entry.notes})
            return HttpResponse(json.dumps(response), content_type="application/json")
        else:
            new_entry = DiaryEntry(id=request.GET(["userId"]))
            new_entry.save()
            response.update({new_entry})
            return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        return Http404

# def ajax_post_items (request):
#     if request.is_ajax() and request.POST:
