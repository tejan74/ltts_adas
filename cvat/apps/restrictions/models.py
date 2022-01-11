from django.db import models
from django.contrib.auth.models import User



class UserAgreementStatus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accepted_status = models.BooleanField(default=False)
    # accepted_date = models.DateTimeField()
    # accepted_time = models.DateTimeField()
    accepted_date = models.DateTimeField(auto_now_add=True)
    accepted_time = models.DateTimeField(auto_now_add=True)