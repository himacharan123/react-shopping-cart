import React, { useContext } from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const Product: React.FC<ProductProps> = ({ id, title, price, category, image }) => {
  const shopContext = useContext(ShopContext);
  const addToCart = shopContext?.addToCart;

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(id);
      alert(`${title} has been added to your cart!`);
    } else {
      alert("Unable to add product to cart. Please try again.");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 200,
          objectFit: "contain",
          padding: 2,
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small" variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={Link}
          to={`/view-product/${id}`}
        >
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
