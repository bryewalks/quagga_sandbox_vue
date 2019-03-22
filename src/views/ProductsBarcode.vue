<template>
  <div class="products-barcode">
  <button id="barcode-scanner" v-on:click="runQuagga"> UNLEASH THE QUAGGA </button>
</div>
</template>

<style>
#barcode-scanner canvas.drawingBuffer, #barcode-scanner video.drawingBuffer {
  display: none;
}

#barcode-scanner canvas, #barcode-scanner video {
  width: 100%;
  height: auto;
}
</style>

<script>
  import Quagga from "quagga";

  export default {
    created() {
    },

    mounted() {

    },
    
    methods: {
      runQuagga: function() {
        Quagga.init({
          inputStream : {
            name : "Live",
            type : "LiveStream",
            numOfWorkers: navigator.hardwareConcurrency,
            target: document.querySelector('#barcode-scanner')  
          },
          decoder: {
              readers : ['upc_reader']
          }
        },function(err) {
            if (err) { console.log(err); return }
            Quagga.initialized = true;
            Quagga.start();
        })

        if ('#barcode-scanner'.length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

          var last_result = [];

          if (Quagga.initialized == undefined) {
            Quagga.onDetected(function(result) {
            var last_code = result.codeResult.code;
            last_result.push(last_code);

          if(last_result.length > 5) {
            var counts = {};
            last_result.forEach(function(value) {
                if(!counts[value]) {
                    counts[value] = 0;
                }
                counts[value]++;
            });
            console.log(counts);
            Quagga.stop();
            
            console.log(counts.sort(function(a, b) {return a - b}));
            return counts;
            }

            console.log(counts);
            // console.log(counts)
            // counts.forEach(function(){

            // });
            // console.log(last_code)
              // if (last_result.length > 20) {
              //   code = orderByOccurrence(last_result)[0];
              //   last_result = [];
              //   Quagga.stop();
                // below should be an axios post call
                // $.ajax({
                //   type: "POST",
                //   url: '/products/get_barcode',
                //   data: { upc: code }
                // });
              // }
            });
          }        
        }

      },


      orderByOccurrence: function(arr) {
        var counts = {};
        arr.forEach(function(value) {
            if(!counts[value]) {
                counts[value] = 0;
            }
            counts[value]++;
        });
      },






      startQuagga: function() {
        Quagga.init({
          inputStream : {
            name : "Live",
            type : "LiveStream",
            numOfWorkers: navigator.hardwareConcurrency,
            target: document.querySelector('#barcode-scanner')  
          },
          decoder: {
              readers : ['ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader']
          }
        },function(err) {
            if (err) { console.log(err); return }
            Quagga.initialized = true;
            Quagga.start();
        });
      },

      findBarcodes: function() {
        if ('#barcode-scanner'.length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

          var last_result = [];

          if (Quagga.initialized == undefined) {
            Quagga.onDetected(function(result) {
            var last_code = result.codeResult.code;
            last_result.push(last_code);
              if (last_result.length > 20) {
                code = orderByOccurrence(last_result)[0];
                last_result = [];
                Quagga.stop();
                // below should be an axios post call
                // $.ajax({
                //   type: "POST",
                //   url: '/products/get_barcode',
                //   data: { upc: code }
                // });
              }
            });
          }        
        }
      }

      
      
    }
  }
</script>

<!-- <template>
  <div class="products-barcode">   
    <div>
      <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader']"></v-quagga>
    </div>
  </div>
</template>

<script>
import Quagga from "quagga";

export default {
  data () {
    return {
      readerSize: {
        width: 640,
        height: 480
      },
      detecteds: []
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
      console.log( data.codeResult.code)
      console.log( data.codeResult.format)

    }

    // processIt (result) {
    //   var drawingCtx = Quagga.canvas.ctx.overlay,
    //     drawingCanvas = Quagga.canvas.dom.overlay;

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
    //       result.boxes.filter(function (box) {
    //         return box !== result.box;
    //       }).forEach(function (box) {
    //         Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
    //       });
    //     }
    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
    //     }
    //   }
    // },

  }
}
</script> -->