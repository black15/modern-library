from django.urls import path
from .views import *

urlpatterns = [
   path("authors", authors_list, name="authors"),
   path("authors/<int:pk>", author_details, name="author_details"),

   path("books", books_list, name="books"),
   path("books/<int:pk>", book_details, name="book_details"),

   path("categories", categories_list, name="categories"),
   path("categories/<int:pk>", category_details, name="category_details"),
]
