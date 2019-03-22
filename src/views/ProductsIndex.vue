<template>
  <div class="products-index">
    <div class="container"> 
      <h1>All products</h1>
      <div v-for="product in products">
        <h2>Name: {{ product.name }}</h2>
        <p>Barcode: {{ product.barcode }}</p>
        <p>Price: {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      products: []
    };
  },
  created: function() {
    axios.get("/api/products")
    .then(response => {
      this.products = response.data;
    });
  },
  methods: {}
};
</script>
