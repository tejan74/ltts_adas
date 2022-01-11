# Copyright (C) 2020 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.conf import settings
from cvat.apps.restrictions.models import UserAgreementStatus
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.generics import GenericAPIView
from django.http.response import JsonResponse


from cvat.apps.restrictions.serializers import AgreementStatusSerializer

class RestrictionsViewSet(viewsets.ViewSet):
    serializer_class = None
    permission_classes = [IsAuthenticated]
    # authentication_classes = []

    # To get nice documentation about ServerViewSet actions it is necessary
    # to implement the method. By default, ViewSet doesn't provide it.
    def get_serializer(self, *args, **kwargs):
        pass

    # @staticmethod
    # @swagger_auto_schema(
    #     method='get',
    #     operation_summary='Method provides user agreements that the user must accept to register',
    #     responses={'200': UserAgreementSerializer})
    # @action(detail=False, methods=['GET'], serializer_class=UserAgreementSerializer, url_path='user-agreements')
    # def user_agreements(request):
    #     print("test nowww")
    #     user_agreements = settings.RESTRICTIONS['user_agreements']
    #     serializer = UserAgreementSerializer(data=user_agreements, many=True)
    #     serializer.is_valid(raise_exception=True)
    #     return Response(data=serializer.data)

    # @staticmethod
    # @action(detail=False, methods=['GET'], renderer_classes=(TemplateHTMLRenderer,),
    #     url_path='terms-of-use')
    # def terms_of_use(request):
    #     return Response(template_name='restrictions/terms_of_use.html')

    @staticmethod
    @swagger_auto_schema(
        method='patch',
        operation_summary='Method provides user agreements that the user must update',
        responses={'200': AgreementStatusSerializer})
    @action(detail=False, methods=['PATCH'], serializer_class=AgreementStatusSerializer)
    def user_agreements(request):
        try:
            user_id = request.user.id
            print("user details",user_id)
            agreement = UserAgreementStatus.objects.get(user_id=user_id)
            # user_agreements = settings.RESTRICTIONS['user_agreements']
            # print("chekcing user_agreements", user_agreements)
            serializer = AgreementStatusSerializer(agreement, data=request.data)
            if serializer.is_valid():
                serializer.save() 
                return Response(data=serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

    @staticmethod
    @swagger_auto_schema(
        method='get',
        operation_summary='Method provides user agreements that the user must update',
        responses={'200': AgreementStatusSerializer})
    @action(detail=False, methods=['GET'], serializer_class=AgreementStatusSerializer)
    def user_agreement(request):
        user_id = request.GET.get('user_id')
        print("userr",user_id)
        agreement = UserAgreementStatus.objects.get(user_id=user_id)
        if request.method == 'GET': 
            serializer = AgreementStatusSerializer(agreement)
            # tutorial_serializer = AgreementStatusSerializer(agreement)
            # data = AgreementStatusSerializer.serialize('json',AgreementStatusSerializer.data) 
            print("agreemennts",serializer.data)
            return Response(serializer.data) 

