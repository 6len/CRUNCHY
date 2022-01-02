import * as React from "react";
import ContentContainer from "../ContentContainer";
import { useEffect, useRef, useState } from "react";
import ContentTitle from "../ContentTitle";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  RadioGroup,
  Slider,
  Typography,
} from "@material-ui/core";
import GithubButton from "../GithubButton";
import DescriptionContainer from "../DescriptionContainer";
import ReactCanvas, {
  Canvas,
  defaultPreviewSettings,
  drawImage,
} from "../../scripts/ImageProcessing";
import Radio from "@material-ui/core/Radio";
import { ColorPicker, createColor } from "material-ui-color";
import { map, take } from "lodash";
import { hexToRgb, rgbToHex } from "../../scripts/Utils";
import { saveAs } from "file-saver";

var randomColor = require("randomcolor");

type ImageProps = {
  // @ts-ignore
  handleOnDrag: (event: DragEvent<T>) => void;
  // @ts-ignore
  handleOnDrop: (event: DragEvent<T>) => void;
  handleFile: (file: any) => void;
};
export const ImageUploader = ({
  handleOnDrag,
  handleOnDrop,
  handleFile,
}: ImageProps) => {
  const fileInput = useRef(null);

  return (
    <div className="wrapper">
      <div
        className="drop_zone"
        onDragOver={handleOnDrag}
        onDrop={handleOnDrop}
        onClick={() => fileInput.current.click()}
      >
        <p>Upload an image..</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
};
const PhixelPanel = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [settings, setSettings] = React.useState(defaultPreviewSettings);

  const [pixelPower, setPixelPower] = React.useState(5);
  const [colorAmount, setColorAmount] = React.useState(
    defaultPreviewSettings.colorAmount
  );
  const [colorSwapActive, setColorSwapActive] = React.useState(
    defaultPreviewSettings.colorSwapActive
  );
  const [colorPalette, setColorPalette] = React.useState(
    map(
      randomColor({
        count: 32,
      }),
      (item) => hexToRgb(item)
    )
  );

  const [imageSmoothing, setImageSmoothing] = React.useState(
    defaultPreviewSettings.imageSmoothing
  );

  const canvasRef = useRef(null);

  const randomPalette = () => {
    return map(
      randomColor({
        count: 32,
      }),
      (item) => hexToRgb(item)
    );
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    saveAs(canvas.toDataURL(), "phixel.png");
  };

  const newRandomPalette = (palette) => {
    setColorPalette(palette);
    setSettings({ ...settings, customColors: palette });
  };

  const handleColorChange = (color, index) => {
    const newPalette = [
      ...colorPalette.slice(0, index),
      color.rgb,
      ...colorPalette.slice(index + 1),
    ];

    setColorPalette(newPalette);
  };

  const handleFile = (file) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setSettings({ ...settings, customColors: colorPalette });
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const handlePixelPowerSliderChange = (event, newValue) => {
    setPixelPower(newValue);
  };

  const handlePixelPowerInputChange = (event) => {
    setPixelPower(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handlePixelPowerBlur = () => {
    if (pixelPower < 1) {
      setPixelPower(1);
    } else if (pixelPower > 100) {
      setPixelPower(100);
    }

    setSettings({ ...settings, pixelatePercent: 1 / pixelPower });
  };

  const handleColorAmountSliderChange = (event, newValue) => {
    setColorAmount(newValue);
  };

  const handleColorAmountInputChange = (event) => {
    setColorAmount(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleColorAmountBlur = () => {
    if (colorAmount < 1) {
      setColorAmount(1);
    } else if (colorAmount > 32) {
      setColorAmount(32);
    }

    setSettings({ ...settings, colorAmount: colorAmount });
  };

  const handleColorSwapChange = (value) => {
    setSettings({
      ...settings,
      colorSwapActive: value,
    });
    setColorSwapActive(value);
  };

  const handleToggleImageSmoothing = () => {
    setSettings({ ...settings, imageSmoothing: !imageSmoothing });
    setImageSmoothing(!imageSmoothing);
  };

  const createPalettes = (amount) =>
    take(colorPalette, amount).map((item, index) => (
      <ColorPicker
        value={rgbToHex(colorPalette[index])}
        defaultValue={"#000000"}
        onChange={(c) => handleColorChange(c, index)}
        hideTextfield
      />
    ));
  // useEffect(() => {
  //   drawInitialImage(canvasRef, preview);
  // }, [preview]);

  return (
    <div>
      <ContentContainer>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ContentTitle color="#94931D">Phixel</ContentTitle>
          <GithubButton url="https://github.com/6len/MUCAPI" />
        </Grid>
        <Typography variant="h6"> Image to pixelart converter </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid
            item
            container
            xs={12}
            md={6}
            alignItems={"flex-start"}
            justify={"flex-start"}
          >
            <Grid item md={12}>
              <ImageUploader
                handleOnDrag={handleDrag}
                handleOnDrop={handleDrop}
                handleFile={handleFile}
              />
            </Grid>
            <Grid item container md={12}>
              <Typography id="input-slider" gutterBottom>
                Pixelate Power
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={typeof pixelPower === "number" ? pixelPower : 1}
                    onChange={handlePixelPowerSliderChange}
                    onChangeCommitted={handlePixelPowerBlur}
                    aria-labelledby="input-slider"
                    min={1}
                    max={100}
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={pixelPower}
                    margin="dense"
                    onChange={handlePixelPowerInputChange}
                    onBlur={handlePixelPowerBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container md={12}>
              <Typography id="input-slider" gutterBottom>
                Color Amount
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Color Palette"
                      row
                      name="controlled-radio-buttons-group"
                      value={colorSwapActive}
                      onChange={(e) => handleColorSwapChange(e.target.value)}
                    >
                      <FormControlLabel
                        value="none"
                        control={<Radio />}
                        label="None"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="Auto"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="custom"
                        control={<Radio />}
                        label="Custom"
                        labelPlacement="top"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={typeof colorAmount === "number" ? colorAmount : 1}
                    onChange={handleColorAmountSliderChange}
                    onChangeCommitted={handleColorAmountBlur}
                    aria-labelledby="input-slider"
                    min={1}
                    max={32}
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={colorAmount}
                    margin="dense"
                    onChange={handleColorAmountInputChange}
                    onBlur={handleColorAmountBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 32,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
              {colorSwapActive === "custom" && (
                <Grid item container xs>
                  {createPalettes(colorAmount)}
                  <Grid item>
                    <Button
                      onClick={() =>
                        setSettings({ ...settings, customColors: colorPalette })
                      }
                    >
                      Use Palette
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => newRandomPalette(randomPalette())}>
                      New Palette
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Image Smoothing"
                control={
                  <Checkbox
                    checked={imageSmoothing}
                    onChange={handleToggleImageSmoothing}
                  />
                }
              />
            </Grid>
            <Grid item container xs={12} justify={"center"}>
              <Grid item>
                <Button onClick={handleDownload} disabled={preview === ""}>
                  Download
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            justify={"center"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              {preview && (
                <div className={"imageDiv"}>
                  <img src={preview} alt={preview} className={"previewImage"} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              <div className={"imageDiv"}>
                <ReactCanvas
                  ref={canvasRef}
                  image={preview}
                  settings={settings}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};
export default PhixelPanel;
