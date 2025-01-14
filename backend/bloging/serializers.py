from .models import User_Auth, Product, Like
from rest_framework import serializers


from rest_framework import serializers
from .models import User_Auth  # Import your custom user model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Auth
        fields = '__all__'  # Include only relevant fields
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only
    
class ProductSerializer (serializers.ModelSerializer) :
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta: 
        model = Product
        fields = ["image", "description", "name", "author", 'author_name', 'id']
        
        
        
class LikeSerializer (serializers.ModelSerializer) : 
    class Meta : 
        model = Like
        fields = '__all__'