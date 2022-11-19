from django.contrib.auth import get_user_model # If used custom user model
from rest_framework import serializers
from .models import *

UserModel = get_user_model()

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

class UserSerializer(serializers.ModelSerializer):
   
   class Meta:
      model = User
      fields = ('id', 'username', 'password')
      write_only_fields = ('password',)
      read_only_fields = ('id',)

   def create(self, validated_data):
      user = UserModel.objects.create(username=validated_data['username'])
      user.set_password(validated_data['password'])
      user.save()

      return user