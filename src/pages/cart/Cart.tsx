import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Box, Typography, Button, Divider, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const shopContext = useContext(ShopContext);
  if (!shopContext) return null;

  const { cartItems, addToCart, removeFromCart, clearItemFromCart, getTotalCartPrice, products } = shopContext;

  if (!products.length) return <Typography>Loading cart...</Typography>;

  if (Object.keys(cartItems).length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your cart is empty
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Shop Now
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {Object.entries(cartItems).map(([id, quantity]) => {
        const product = products.find((p) => p.id === Number(id));
        if (!product) return null;

        return (
          <Card key={id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2, mb: 2 }}>
            {/* Product Image */}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{ width: 80, height: 80, objectFit: "contain", marginRight: 2 }}
            />

            {/* Product Info */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)} x {quantity}
              </Typography>
            </Box>

            {/* Buttons for modifying cart */}
            <Box>
              <Button variant="outlined" onClick={() => addToCart(product.id)} sx={{ mx: 1 }}>
                +
              </Button>
              <Button variant="outlined" onClick={() => removeFromCart(product.id)} sx={{ mx: 1 }}>
                -
              </Button>
              <Button variant="contained" color="error" onClick={() => clearItemFromCart(product.id)}>
                Remove
              </Button>
            </Box>
          </Card>
        );
      })}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" align="right">
        Total: ${getTotalCartPrice().toFixed(2)}
      </Typography>
      <Box sx={{ textAlign: "right", marginTop: 2 }}>
        <Link to="/">
          <Button variant="outlined" sx={{ marginRight: 2 }}>
            Continue Shopping
          </Button>
        </Link>
       
      </Box>
    </Box>
  );
};

export default Cart;
