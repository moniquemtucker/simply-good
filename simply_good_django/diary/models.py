from django.db import models
from userprofile.models import UserProfile
# Create your models here.


# class DiaryEntry(models.Model):
#     user_profile = models.ForeignKey(UserProfile)
#     entry_date = models.DateField()
#     whole_foods = models.IntegerField(default=0)
#     processed_foods = models.IntegerField(default=0)
#     notes = models.TextField()
#
#     def __unicode__(self):
#         return "%s %s" % (self.userprofile.UserProfile, self.entry_date)
#
#
# class DiaryDate(models.Model):
#     pass

# https://docs.python.org/2/library/time.html#time.strftime
# For example, if you have a field title that has unique_for_date="pub_date",
# then Django would not allow the entry of two records
# with the same title and pub_date.
# Should my code be this?
# user_profile = models.OneToOneField(UserProfile,unique_for_date="entry_date")
# entry_date = models.DateField()
