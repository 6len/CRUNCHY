import {
  chunk,
  flatten,
  flattenDeep,
  forEach,
  map,
  orderBy,
  sortBy,
  take,
} from "lodash";
import * as React from "react";
import {
  ForwardedRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { getConvolutionColors } from "./Utils";

type CanvasSettings = {
  pixelatePercent: number;
  setDimensions: {
    width: number;
    height: number;
  };
  colorSwapActive: string;
  customColor: boolean;
  customColors: any[];
  imageSmoothing: boolean;
};

export type CanvasProps = {
  image: string;
  settings: CanvasSettings;
};

export const defaultPreviewSettings = {
  pixelatePercent: 0.2,
  colorAmount: 5,
  colorSwapActive: "none",
  customColor: false,
  customColors: [],
  imageSmoothing: false,
};

const ReactCanvas = ({ image, settings }, ref) => {
  const [preview, setPreview] = useState("");
  const [previewSettings, setPreviewSettings] = useState(
    defaultPreviewSettings
  );
  const cloneRef = useRef(ref);

  React.useEffect(() => {
    setPreviewSettings(settings);

    drawImage(ref, image, settings);
    setPreview(image);
  }, [image, settings]);

  React.useEffect(() => {
    setPreviewSettings(settings);

    let canvas = ref.current;
    let ctx = canvas.getContext("2d");

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawImage(ref, image, settings);
  }, []);

  // -----------------------------------------------------------//
  // Gets the context from the ref
  const getContext = () => {
    return cloneRef.current.getContext("2d");
  };

  // -----------------------------------------------------------//
  // Gets the x most common colors in the image
  const commonColors = (n: number) => {
    let r, g, b, a;

    const colorMap = new Map();
    const ctx = getContext();

    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    for (var i = 0; i + 3 < imageData.data.length; i += 4) {
      r = imageData.data[i];
      g = imageData.data[i + 1];
      b = imageData.data[i + 2];
      a = imageData.data[i + 3];
      const key = `${r} ${g} ${b} ${a}`;
      const occurences = colorMap.get(key);
      colorMap.set(key, occurences ? occurences + 1 : 1);
    }

    const colors = orderBy([...colorMap], (item) => item[1], ["desc"]);
    const colorsFinalMap = map(colors, (item) => {
      return item[0].split(" ");
    });

    return take(colorsFinalMap, n);
  };

  // -----------------------------------------------------------//
  // Draws the image on the canvas
  const drawImage = (
    canvasRef: MutableRefObject<any>,
    preview: string,
    settings: CanvasSettings
  ) => {
    const can = canvasRef.current;
    const ctx = can.getContext("2d");
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, 400, 400);
    canvas.width = 400;
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const scale =
        img.height <= img.width
          ? Math.max(canvas.height / img.height, canvas.width / img.width)
          : Math.min(canvas.height / img.height, canvas.width / img.width);

      const imageHeight = img.height * scale;

      const imageWidth = img.width * scale;
      canvas.width = imageWidth;

      const percent = settings.pixelatePercent;

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      const cloneCanvas = setUpClone(img);
      cloneRef.current = cloneCanvas;
      const cloneCtx = cloneCanvas.getContext("2d");

      cloneCtx.imageSmoothingEnabled = false;

      document.body.appendChild(cloneCanvas);

      cloneCtx.drawImage(
        img,
        0,
        0,
        imageWidth * percent,
        imageHeight * percent
      );

      if (settings.colorSwapActive != "none") {
        convertImageColors(settings);
      }
      if (settings.imageSmoothing) {
        smoothImage();
      }

      ctx.drawImage(
        cloneCanvas,
        0,
        0,
        imageWidth * percent,
        imageHeight * percent,
        0,
        0,
        imageWidth,
        imageHeight
      );

      document.body.removeChild(cloneCanvas);
    };

    img.src = preview;
    ctx.imageSmoothingEnabled = false;
  };

  const setUpClone = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;

    const scale =
      img.height <= img.width
        ? Math.max(canvas.height / img.height, canvas.width / img.width)
        : Math.min(canvas.height / img.height, canvas.width / img.width);

    const imageHeight = img.height * scale;

    const imageWidth = img.width * scale;

    ctx.imageSmoothingEnabled = false;

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    canvas.style.visibility = "hidden";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";

    return canvas;
  };

  const convertImageColors = (settings) => {
    const palette =
      settings.colorSwapActive == "auto"
        ? commonColors(settings.colorAmount)
        : take(settings.customColors, settings.colorAmount);
    const ctx = getContext();

    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var i = 0; i + 3 < imageData.data.length; i += 4) {
      const newColor = findSimilarColor(
        [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]],
        palette
      );

      imageData.data[i] = newColor[0];
      imageData.data[i + 1] = newColor[1];
      imageData.data[i + 2] = newColor[2];
    }

    ctx.putImageData(
      imageData,
      0,
      0,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    return true;
  };

  const getColorSimilarity = (current, replace) => {
    let d = 0;
    let max;

    for (let i = 0, max = current.length; i < max; i++) {
      d += (current[i] - replace[i]) * (current[i] - replace[i]);
    }
    return Math.sqrt(d);
  };

  const findSimilarColor = (currentColor, palette) => {
    let selectedColor = [];
    let currentSim = getColorSimilarity(currentColor, palette[0]);
    let nextColor;
    palette.forEach((color) => {
      nextColor = getColorSimilarity(currentColor, color);
      if (nextColor <= currentSim) {
        selectedColor = color;
        currentSim = nextColor;
      }
    });

    return selectedColor;
  };

  const smoothImage = () => {
    const ctx = getContext();
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const imageDataMap = chunk(chunk(imageData.data, 4), ctx.canvas.width);
    const convolutionColors = flattenDeep(
      getConvolutionColors(imageDataMap, ctx.canvas.height, ctx.canvas.width)
    );

    for (var i = 0; i + 3 < imageData.data.length; i += 4) {
      imageData.data[i] = convolutionColors[i];
      imageData.data[i + 1] = convolutionColors[i + 1];
      imageData.data[i + 2] = convolutionColors[i + 2];
    }

    ctx.putImageData(
      imageData,
      0,
      0,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
  };

  return (
    <canvas ref={ref} height={400} width={400} style={{ height: "400px" }} />
  );
};

export default React.forwardRef(ReactCanvas);
