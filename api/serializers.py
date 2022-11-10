from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
   class Meta:
      model    = Author
      fields   = '__all__'

class BookSerializer(serializers.ModelSerializer):

   author_name    = serializers.ReadOnlyField(source='author.name')
   category_name  = serializers.ReadOnlyField(source='category.name')

   class Meta:
      model    = Book
      fields   = ('id', 'name', 'cover', 'language', 'pages', 'descreption', 'added_date', 'author', 'category', 'author_name', 'category_name')

class CategorySerializer(serializers.ModelSerializer):
   class Meta:
      model    = Category
      fields   = '__all__'

class BookCustomSerializer(serializers.ModelSerializer):
   class AuthorCustomSerializer(serializers.ModelSerializer):
      class Meta:
         model = Author
         fields   = '__all__'
      
   author = AuthorCustomSerializer()

   class Meta:
      model = Book
      fields = '__all__'