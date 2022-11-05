from django.urls import path
from .views import *

urlpatterns = [
   path("authors", authors_list, name="authors"),
   path("books", books_list, name="books"),
   path("categories", categories_list, name="categories"),
]
