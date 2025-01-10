from django.urls import path
from .views import Login_in, Sign_up, Get_Products, Add_Product, Update_Product, Delete_Product

urlpatterns = [
    path('login/', Login_in.as_view()),
    path('sign_up/', Sign_up.as_view()),
    
    path('products/', Get_Products.as_view()),
    path('add_product/', Add_Product.as_view()),
    path('update_product/<int:id>/', Update_Product.as_view()),
    path('delete_product/<int:id>/', Delete_Product.as_view()),
]
