<template>
  <div class="products-show">
    <div>
      <h2>Name: {{product.name}}</h2>
      <p>Price: {{product.price}}</p>
      <p>Barcode: {{product.barcode}}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        product: {
                  name: "",
                  price: "",
                  barcode: ""
        }
      }
    },

    created: function() {
      axios.get("/api/products/" + this.$route.params.id )
      .then(response => {
        this.product = response.data;
      });
    },

    methods: {},
    }

</script>