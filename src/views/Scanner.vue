<template>
    <div id="barcode-scanner"></div>
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
    data() {
        return {
            lastResult: null,
            finalResult: "",
            backCamID: null
        }
    },
    created() {
        var _this = this; 

        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            //alert("Doesn't work");
            return;

            navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                devices.forEach(function(device) {
                    //alert( JSON.stringify(device) );
                    if( device.kind == "videoinput" && device.label.match(/back/) != null ){
                        // alert("Back found!");
                        _this.backCamID = device.deviceId;
                        console.log("device id", device)
                        alert("backCamID", _this.backCamID);
                    }
                });
            })
            .catch(function(err) {
                alert("Error");
            });

            if(_this.backCamID == null){
                    _this.backCamID = ""; // fallback value
                    console.log("backCamID is null")
                }
        }
    },
   mounted() {
      var _this = this;
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          numOfWorkers: navigator.hardwareConcurrency,
          target: document.querySelector('#barcode-scanner'),
          constraints: {
                          width: 640,
                          height: 460
                      },  
        },
        decoder: {
            readers : ['ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader']
        }
      },function(err) {
          if (err) { console.log(err); return }
          Quagga.initialized = true;
          Quagga.start();
      });
      
        Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
            drawingCtx.clearRect(
                0,
                0,
                parseInt(drawingCanvas.getAttribute("width")),
                parseInt(drawingCanvas.getAttribute("height"))
            );
            result.boxes
                .filter(function(box) {
                return box !== result.box;
                })
                .forEach(function(box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                    color: "green",
                    lineWidth: 2
                });
                });
            }

            if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                color: "#00F",
                lineWidth: 2
            });
            }

            if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
                result.line,
                { x: "x", y: "y" },
                drawingCtx,
                { color: "red", lineWidth: 3 }
            );
            }
        }
        });

        Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        console.log(code)
        console.log(result.codeResult.format)
        if (_this.lastResult !== code) {
            _this.lastResult = code;
        }
        _this.finalResult = code;
        });
    }
   }
</script>