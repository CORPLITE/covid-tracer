<template>
  <div>
    <p class="title is-4">{{ $t('message.printOut') }}</p>
    <div class="doc-template">
      <canvas id="doc-template-canvas" ref="doc-template-canvas"></canvas>
    </div>
    <b-field class="padding-med" group-multiline>
      <b-button class="is-primary" @click="download()">{{
        $t('message.download')
      }}</b-button>
    </b-field>
  </div>
</template>

<style lang="scss">
.doc-template {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.23);
}

#doc-template-canvas {
  width: 100%;
}
</style>

<script>
import FontFaceObserver from 'fontfaceobserver';

export default {
  name: 'DocumentTemplate',
  components: {},
  props: {
    qrData: {
      type: String,
      required: true,
    },
    qrImage: {
      type: String,
      required: true,
    },
    documentTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  watch: {
    qrImage: function (newVal, oldVal) {
      // Show QR image on canvas
      const canvas = this.$refs['doc-template-canvas'];
      const canvasContext = canvas.getContext('2d');

      // Create QR image element
      let qrImage = new Image();
      qrImage.src = newVal;

      // Find coordinates for QR image
      const qrImageSize = canvas.width * 0.4;
      const xCoord = canvas.width / 2 - qrImageSize / 2; // Centre align QR image
      const yCoord = canvas.height * 0.32 + qrImageSize / 2;

      qrImage.onload = function () {
        canvasContext.drawImage(
          qrImage,
          xCoord,
          yCoord,
          qrImageSize,
          qrImageSize,
        );
      };
    },
  },
  mounted: function () {
    const canvas = this.$refs['doc-template-canvas'];

    // Scale canvas based on device pixel ratio to make image less blurry
    // See: https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    const dpi = window.devicePixelRatio;
    // Calculated by getting the original image ratio
    const imageRatio = 1.415126;
    const styleWidth = canvas.offsetWidth;
    const styleHeight = canvas.offsetWidth * imageRatio;

    // Set canvas width and height using dpi of screen
    const canvasContext = canvas.getContext('2d');
    canvas.setAttribute('width', styleWidth * dpi);
    canvas.setAttribute('height', styleHeight * dpi);

    // Add white background to exported canvas image
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Add Document Template Image
    const docTemplateImage = new Image();
    // FIXME: Figure out a way to use an SVG file below
    docTemplateImage.src = '/static/Document-Template-Blank.png';
    // Load image onto canvas once image has been loaded
    docTemplateImage.onload = function () {
      // FIXME: Fix blurry image here.
      // ATM we just resize the original image to the canvas size in function below.
      canvasContext.drawImage(
        docTemplateImage,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    };

    // Add business title when font is loaded
    const font = new FontFaceObserver('SF Pro Display');
    font.load().then(() => {
      canvasContext.fillStyle = '#8E999B';
      const fontSize = canvas.height * 0.04;
      canvasContext.font = `lighter ${fontSize}px SF Pro Display`;
      const textPosition = {
        x: canvas.width * 0.15, // Left align text
        y: canvas.height * 0.25,
      };
      canvasContext.fillText(
        this.documentTitle,
        textPosition.x,
        textPosition.y,
      );
    });
  },
  methods: {
    download() {
      const canvas = this.$refs['doc-template-canvas'];
      const pngDataURL = canvas.toDataURL('image/png');
      const filename = 'COVIDTracer-Document.png';

      const a = document.createElement('a');
      a.href = pngDataURL;
      a.setAttribute('download', filename);
      a.click();
    },
  },
};
</script>
