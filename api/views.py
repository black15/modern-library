from django.http.response import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *

user = get_user_model()

# ------------------ Token & Refresh Views ------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ------------------ Authors Views ------------------
@api_view(('GET','POST'))
def authors_list(request):
   if request.method == 'GET':
      authors     = Author.objects.all()
      serializer  = AuthorSerializer(authors, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

   if request.method == 'POST':
      serializer     = AuthorSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(('GET', 'PUT', 'DELETE'))
def author_details(request, pk):
   try:
      author      =  Author.objects.get(pk=pk)
   except Author.DoesNotExist:
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
      
   if request.method == 'GET':
      serializer  = AuthorSerializer(author)
      return Response(serializer.data, status=status.HTTP_200_OK)
   if request.method == 'PUT':
      serializer  = AuthorSerializer(author, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
   if request.method == 'DELETE':
      author.delete()
      return Response({'message': True}, status=status.HTTP_204_NO_CONTENT)

# ------------------ Book By Author ------------------
@api_view(('GET',))
def book_by_author(request, pk):
   if request.method == 'GET':
      books       = Book.objects.filter(author=pk)
      serializer  = BookSerializer(books, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
   return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(('GET',))
def search_book_author(request, query):
   if request.method == 'GET':
      books       = Book.objects.filter(author__name__contains=query) | Book.objects.filter(name__contains=query)
      print(books)
      serializer  = BookSerializer(books, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
   return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
# ------------------ Books Views ------------------
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

@api_view(('GET', 'PUT', 'DELETE'))
def book_details(request, pk):
   try:
      book      =  Book.objects.get(pk=pk)
   except Book.DoesNotExist:
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
      
   if request.method == 'GET':
      serializer  = BookSerializer(book)
      return Response(serializer.data, status=status.HTTP_200_OK)
   if request.method == 'PUT':
      serializer  = BookSerializer(book, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
   if request.method == 'DELETE':
      book.delete()
      return Response({'message': True}, status=status.HTTP_204_NO_CONTENT)


# ------------------ Categories Views ------------------
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

@api_view(('GET', 'PUT', 'DELETE'))
def category_details(request, pk):
   try:
      category      =  Category.objects.get(pk=pk)
   except Category.DoesNotExist:
      return Response({'message': False}, status=status.HTTP_404_NOT_FOUND)
      
   if request.method == 'GET':
      serializer  = CategorySerializer(category)
      return Response(serializer.data, status=status.HTTP_200_OK)
   if request.method == 'PUT':
      serializer  = CategorySerializer(category, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
   if request.method == 'DELETE':
      category.delete()
      return Response({'message': True}, status=status.HTTP_204_NO_CONTENT)

# ------------------ Comments ------------------
@api_view(('GET',))
def book_comments(request, book_id):
   if request.method == 'GET':
      comments     = Comment.objects.filter(book=book_id)
      serializer   = CommentSerializer(comments, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(('POST',))
def add_comment(request, book_id):
   if request.method == 'POST':
      serializer     = CommentSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(('PUT', 'DELETE',))
def comment_option(request, pk):
   try:
      comment      =  Comment.objects.get(pk=pk)
   except Category.DoesNotExist:
      return Response({'message': False}, status=status.HTTP_404_NOT_FOUND)

   if request.method == 'PUT':
      serializer  = CommentSerializer(comment, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
      return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
   if request.method == 'DELETE':
      comment.delete()
      return Response({'message': True}, status=status.HTTP_204_NO_CONTENT)