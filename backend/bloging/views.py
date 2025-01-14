from .models import User_Auth, Product, Like
from .serializers import UserSerializer, ProductSerializer, LikeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import authenticate



class Sign_up (APIView) : 
    permission_classes = [AllowAny]
    def post (self, request) : 
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Get the user data from the validated data
            user = serializer.save()

            # Hash the password before saving
            user.set_password(request.data.get("password"))
            user.save() 
            return Response({"success":True, **serializer.data}, status=status.HTTP_201_CREATED)
        else : 
            return Response({"error": "Something wants wrong!"}, status=status.HTTP_400_BAD_REQUEST)
        
     
        
class Login_in(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Set the token in the response as a cookie (for browser use)
            response = Response(
                {
                    "success": True,
                    "access_token": access_token,
                },
                status=status.HTTP_200_OK,
            )
            response.set_cookie("access_token", access_token, httponly=True)
            return response
        else:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            
            
class Logout(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        try:
            # Get the refresh token from the request
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"success": True, "message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token or an error occurred."}, status=status.HTTP_400_BAD_REQUEST)
# -----------------------------------------------------------------------------------------


class Get_Products (APIView) : 
    permission_classes = [AllowAny]
    def get(self, request) : 
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class Get_Product (APIView) : 
    permission_classes = [AllowAny]
    
    def get (self, request, id) : 
        try:
            product = Product.objects.get(id=id)
            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist : 
            return Response({'error': "Product does not exist!"}, status=status.HTTP_400_BAD_REQUEST)

    
    
    
class Add_Product (APIView) : 
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post (self, request) : 
        print(f"User ID: {request.user.id}")  
        product = request.data
        product['author'] = request.user.id
        serializer = ProductSerializer(data=product)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response({"error": "Something wants wrong!"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class Update_Product (APIView): 
    def put (self, request, id) : 
        product = Product.objects.get(id=id)
        if product : 
            serializer= ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid() : 
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else : 
                return Response({"error": "Something wants wrong!"}, status=status.HTTP_400_BAD_REQUEST)
            
        else : 
            return Response({'error': "Does not exist this product"})
        
        
        
class Delete_Product (APIView) : 
    def get (self, request, id) : 
        try : 
            product = Product.objects.get(id=id) 
        except Product.DoesNotExist: 
            return Response({'error': "Does not exist!"})
        
        
        product.delete()
        
        return Response({"message": "Product delete Successfully"})
                
                
# -----------------------------------------------------------------------------------------

class Like_Toggle (APIView) : 
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, id) : 
        user = request.user
        print("user===>", user)
        try: 
            product = Product.objects.get(id=id)
        except Product.DoesNotExist: 
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        
        like, created = Like.objects.get_or_create(product=product)
        print('like', like)
        
        
        print('like.users.all', like.users.all())
        if user in like.users.all() :
            
            like.users.remove(user) 
            
            return Response({"message": "Unliked the product."}, status=status.HTTP_200_OK)
        else: 
             # User hasn't liked this product yet, so we like it
            like.users.add(user)
            return Response({"message": "Liked the product."}, status=status.HTTP_200_OK)
        
        
        
class Get_Likes (APIView) : 
    permission_classes = [AllowAny]
    def get (self, request, id) : 
        try:
            like_obj = Like.objects.get(product=id) 
            # total_likes = like_obj.users.count()
            # response_Data = {
            #     "product_id" : like_obj.product.id,
            #     "totalLikes" :  total_likes
            # }
            serializer = LikeSerializer(like_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Like.DoesNotExist : 
            return Response({'error': "Likes doest not exist!"})
        
