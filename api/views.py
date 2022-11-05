from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http.response import JsonResponse

from .serializers import *


@api_view(('GET','POST'))
def authors_list(request):
   if request.method == 'GET':
      authors     = Author.objects.all()
      serializer  = AuthorSerializer(authors, many=True)
      return Response(serializer.data)

   if request.method == 'POST':
      serializer     = AuthorSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(('GET','POST'))
def books_list(request):
   if request.method == 'GET':
      books       = Book.objects.all()
      serializer  = BookSerializer(books, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

   if request.method == 'POST':
      serializer     = BookSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(('GET','POST'))
def categories_list(request):
   if request.method == 'GET':
      categories     = Category.objects.all()
      serializer     = CategorySerializer(categories, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
      
   if request.method == 'POST':
      serializer     = CategorySerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)