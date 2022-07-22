
# List of Categories
> https://api-lens.herokuapp.com/category

# List of Products
> https://api-lens.herokuapp.com/products

# List of Available Size
> https://api-lens.herokuapp.com/size

# Product wrt Category
> https://api-lens.herokuapp.com/products?Category_Id=2

# Products wrt Size
> https://api-lens.herokuapp.com/products?Size_Id=3

# Products wrt Category & Size
> https://api-lens.herokuapp.com/filter/4?Size_Id=3

# Products wrt Category & Cost
>https://api-lens.herokuapp.com/filter/1?low=900&high=1200

>https://api-lens.herokuapp.com/filter/4?low=600&high=1000&Size_Id=3

# Sort on basis of cost
> https://api-lens.herokuapp.com/filter/2?sort=-1

# Details of Products
> https://api-lens.herokuapp.com/details/6

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
