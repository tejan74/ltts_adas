# Copyright (C) 2018 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import views
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_auth.registration.views import RegisterView as _RegisterView
from allauth.account import app_settings as allauth_settings
from furl import furl

from . import signature

from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.core.mail import send_mail

import smtplib, ssl

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from cvat.settings.development import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD 

@method_decorator(name='post', decorator=swagger_auto_schema(
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=[
            'url'
        ],
        properties={
            'url': openapi.Schema(type=openapi.TYPE_STRING)
        }
    ),
    responses={'200': openapi.Response(description='text URL')}
))
class SigningView(views.APIView):
    """
    This method signs URL for access to the server.

    Signed URL contains a token which authenticates a user on the server.
    Signed URL is valid during 30 seconds since signing.
    """
    def post(self, request):
        url = request.data.get('url')
        if not url:
            raise ValidationError('Please provide `url` parameter')

        signer = signature.Signer()
        url = self.request.build_absolute_uri(url)
        sign = signer.sign(self.request.user, url)

        url = furl(url).add({signature.QUERY_PARAM: sign}).url
        return Response(url)


class RegisterView(_RegisterView):
    def get_response_data(self, user):
        data = self.get_serializer(user).data
        data['email_verification_required'] = allauth_settings.EMAIL_VERIFICATION == \
            allauth_settings.EmailVerificationMethod.MANDATORY
        # subject ='welcome to adastool'

        # message =f'hi {user.username}, Welcome to ADAS tool'

        # # email_from = settings.development.EMAIL_HOST_USER

        email_from = 'keshavadk@gmail.com'

        recipient_list =user.email

        # send_mail(subject, message,email_from,recipient_list)

        # print("checking mail ",email_from,user)

        
        # EMAIL_HOST = 'smtp.gmail.com'
        # EMAIL_HOST_USER = 'adasltts@gmail.com'
        # EMAIL_HOST_PASSWORD = 'ibahsrokbbtuzsxs'
        # EMAIL_PORT = 587

        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Welcome from ADAS LTTS team"
        msg['From'] = EMAIL_HOST_USER
        msg['To'] = recipient_list

        # Create the body of the message (a plain-text and an HTML version).
        # text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.python.org"
        html = """\
        <html>
        <head></head>
        <body>
            <p>Hi <strong>{0}</strong> <br>
            Welcome to ADAS tool. You are now part of adas tool.<br>

            Thank you. 
            
            </p>
        </body>
        </html>
        """.format(user.username)
        # print("\n\n\n\n\n\n\trying for user",user)
        # Record the MIME types of both parts - text/plain and text/html.
        # part1 = MIMEText(text, 'plain')
        part2 = MIMEText(html, 'html')

        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        # msg.attach(part1)
        msg.attach(part2)

        port = 465  # For SSL
        # password = input("Type your password and press enter: ")

        # Create a secure SSL context
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)

        # Send the message via local SMTP server.
        # s = smtplib.SMTP('localhost')
        # # sendmail function takes 3 arguments: sender's address, recipient's address
        # # and message to send - here it is sent as one string.
        
            server.sendmail(email_from, recipient_list, msg.as_string())
            server.quit()

        data['email_verification_required'] = allauth_settings.EMAIL_VERIFICATION == \
        allauth_settings.EmailVerificationMethod.MANDATORY
        return data


class GoogleLogin(SocialLoginView):
    print("Signing in")
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter


# class LogoutView(views.APIView):
#     def post(self,request):
#         print(">>>>>>>>>>>>>>>>>session expiry>>>>>>>>>>>>>>>>>>>>>.")
#         try:
#             request.user.auth_token.delete()
#         except (AttributeError, ObjectDoesNotExist):
#             pass
#         django_logout(request)

#         response = Response({"detail": _("Successfully logged out.")},
#                             status=status.HTTP_200_OK)
#         from rest_framework_jwt.settings import api_settings as jwt_settings
#         if jwt_settings.JWT_AUTH_COOKIE:
#             response.delete_cookie(jwt_settings.JWT_AUTH_COOKIE)
#         return response