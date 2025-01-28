import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Product from "./Product";
import { Grid } from "@mui/material";

const Shop: React.FC = () => {
  const shopContext = useContext(ShopContext);
  if (!shopContext) return null;

  const { products } = shopContext;

  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Shop;
