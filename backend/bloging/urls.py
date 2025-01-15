from django.urls import path
from .views import Login_in, Sign_up, Get_Products, Add_Product, Update_Product, Delete_Product, Get_Product, Like_Toggle, Get_Likes, Create_Comment, Get_Comments

urlpatterns = [
    path('login/', Login_in.as_view()),
    path('sign_up/', Sign_up.as_view()),
    
    path('products/', Get_Products.as_view()),
    path('products/<int:id>/', Get_Product.as_view()),
    path('add_product/', Add_Product.as_view()),
    path('update_product/<int:id>/', Update_Product.as_view()),
    path('delete_product/<int:id>/', Delete_Product.as_view()),
    path('toggle_like/<int:id>/', Like_Toggle.as_view()),
    path('likes/<int:id>/', Get_Likes.as_view()),
    path('comments/<int:id>/', Get_Comments.as_view()),
    path('comment/<int:id>/', Create_Comment.as_view()),
    
]
