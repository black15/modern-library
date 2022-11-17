from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
   class Meta:
      model    = Author
      fields   = '__all__'

class BookSerializer(serializers.ModelSerializer):

   author_name    = serializers.ReadOnlyField(source='author.name')
   category_name  = serializers.ReadOnlyField(source='category.name')
   comment_text   = serializers.ReadOnlyField(source='comment.body')

   class Meta:
      model    = Book
      fields   = ('id', 'name', 'cover', 'language', 'pages', 'descreption', 'added_date', 'author', 'category', 'author_name', 'category_name', 'comment_text')

class CategorySerializer(serializers.ModelSerializer):
   class Meta:
      model    = Category
      fields   = '__all__'

class CommentSerializer(serializers.ModelSerializer):
   username    = serializers.ReadOnlyField(source='user.username')
   
   class Meta:
      model   = Comment
      fields  = ('id', 'book', 'user', 'username', 'body', 'created_on')