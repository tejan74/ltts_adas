# Copyright (C) 2018-2021 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.conf import settings
from allauth.account import app_settings as allauth_settings
from allauth.account.models import EmailAddress
from cvat.apps.restrictions.models import UserAgreementStatus

from . import AUTH_ROLE

def create_user(sender, instance, created, **kwargs):
    from django.contrib.auth.models import Group
    try:
        if instance.is_superuser and instance.is_staff:
                db_group = Group.objects.get(name=AUTH_ROLE.ADMIN)
                instance.groups.add(db_group)


        for group_name in settings.DJANGO_AUTH_DEFAULT_GROUPS:
                db_group = Group.objects.get(name=getattr(AUTH_ROLE, group_name))
                instance.groups.add(db_group)
    except:
            pass   

    # create and verify EmailAddress for superuser accounts
    if allauth_settings.EMAIL_REQUIRED:
            EmailAddress.objects.get_or_create(user=instance, email=instance.email, primary=True, verified=True)
            
    UserAgreementStatus.objects.get_or_create(user=instance, accepted_status=False)
            
            