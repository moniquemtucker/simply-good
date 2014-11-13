from django.shortcuts import render_to_response

# Create your views here.

# entry detail page for current day


def diary(request):

    return render_to_response('diary/base_diary.html')

# day based archive view



