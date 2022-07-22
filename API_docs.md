//Page 1

# List of Categories
> http://localhost:9870/category

# List of Products
> http://localhost:9870/products

# List of Available Size
> http://localhost:9870/size

# Product wrt Category
> http://localhost:9870/products?Category_Id=2

//Page 2

# Products wrt Size
> http://localhost:9870/products?Size_Id=3

# Products wrt Category & Size
> http://localhost:9870/filter/4?Size_Id=3

# Products wrt Category & Cost
>http://localhost:9870/filter/1?low=900&high=1200

>http://localhost:9870/filter/2?low=600&high=3000&Size_Id=3

# Sort on basis of cost
> http://localhost:9870/filter/3&sort=-1

//Page 3

# Details of Products
> http://localhost:9870/details/9

# Get Products
> (Post)localhost:9870/select
{"id":[2,5,10]}

# Place Order
> (Post)localhost:9870/placeOrder
{
    "order_id" : 3,
    "name" : "Nikhil",
    "email" : "nhk172@gmail.com",
    "address" : "Hno 2,gali no 4 Sector 7",
    "phone" : 970087233,
    "cost" : 1203,
    "Items" : [
            5,
            5,
            2
    ],
    "status" : "Pending"
}
