import json
import datetime

from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.core.context_processors import csrf
from django.contrib import messages
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from diary.models import DiaryEntry
from userprofile.models import UserProfile
from django.contrib.auth.models import User


# Create your views here.

# day based archive view


@login_required
def diary(request, user_profile_id):
    # user_profile_id = request.GET["user_profile_id"]
    if DiaryEntry.objects.get(entry_date=datetime.date.today()):
        curr_entry = DiaryEntry.objects.get(entry_date=datetime.date.today())
    else:
        u = DiaryEntry(user_profile_id=user_profile_id, entry_date=datetime.date.today(), notes="")
        u.save()
    return render_to_response('diary/base_diary.html', {'user_profile_id': user_profile_id,
                                                        'username': request.user.username})

@login_required
def ajax_get_date(request):
    if request.is_ajax() and request.method == "GET":
        response = {}
        request_date = request.GET["date"]
        request_user = request.GET["userId"]

        if DiaryEntry.objects.filter(entry_date=request_date).exists():
            entry = DiaryEntry.objects.get(entry_date=request_date)
            response.update({"whole_foods": entry.whole_foods, "processed_foods": entry.processed_foods,
                             "notes": entry.notes})
            return HttpResponse(json.dumps(response), content_type="application/json")
        else:
            new_entry = DiaryEntry(user_profile_id=request_user, entry_date=request_date, notes="")
            new_entry.save()
            response.update(new_entry)
            return HttpResponse(json.dumps(response), content_type="application/json")

        # if DiaryEntry.objects.get(entry_date=request_date):
        #     entry = DiaryEntry.objects.get(entry_date=request_date)
        #     # , user_profile=request_user
        #     response.update({"whole_foods": entry.whole_foods, "processed_foods": entry.processed_foods,
        #                      "notes": entry.notes})
        #     return HttpResponse(json.dumps(response), content_type="application/json")
        # else:
        #     # user_profile_id = UserProfile.objects.get(user_profile_id=request_user)
        #     # new_entry = DiaryEntry(user_profile_id=user_profile_id, entry_date=request_date, notes="")
        #     print("getting to this part!")
        #     new_entry = DiaryEntry(user_profile_id=request_user, entry_date=request_date, notes="")
        #     new_entry.save()
        #     response.update({new_entry})
        #     return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        return Http404

# def ajax_post_items (request):
#     if request.is_ajax() and request.POST:
