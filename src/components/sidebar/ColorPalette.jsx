import React, { useState, useEffect } from "react";
import colorPaletteData from "../assets/json/colorPalate.json";
import { setColorPalateAction } from "../../stateManagement/actions/themeAction";
import { useDispatch, useSelector } from "react-redux";

const ColorPalette = () => {
  const { templateNo } = useSelector((state) => state.template);
  const dispatch = useDispatch();

  const defaultPalettes = {
    "1": {
      first: "#1a1d29",
      second: "#e6e6e6",
      third: "#c5c5ff",
    },
    "2": {
      first: "#F2D7EE",
      second: "#262626",
      third: "#4F4A7C",
    },
    "3": {
      first: "#dde5e7",
      second: "#67727e",
      third: "#d4674c",
    },
  };

  const [selectedColors, setSelectedColors] = useState(defaultPalettes[templateNo] || {
    first: "#f6f0f0",
    second: "#0567a8",
    third: "#60e3d5",
  });

  useEffect(() => {
    setSelectedColors(defaultPalettes[templateNo] || {
      first: "#f6f0f0",
      second: "#0567a8",
      third: "#60e3d5",
    });
  }, [templateNo]);

  useEffect(() => {
    dispatch(setColorPalateAction(selectedColors));
  }, [selectedColors, dispatch]);

  const handleColorPalette = (e) => {
    const target = e.target;
    const paletteDiv = target.closest(".palette-wrapper");
    const colorInputs = paletteDiv.querySelectorAll('input[type="color"]');

    const colors = Array.from(colorInputs).map((input) => input.value);
    const selectedColorsObj = {
      first: colors[0],
      second: colors[1],
      third: colors[2],
    };

    setSelectedColors(selectedColorsObj);
    console.log(selectedColorsObj);
  };

  return (
    <div className="palette__box--wrapper">
      <div className="column">
        {colorPaletteData?.map((palette) => (
          <div
            className="palette-wrapper"
            id={palette.id}
            key={palette.id}
            onClick={handleColorPalette}
          >
            <input type="color" disabled value={palette.color1} />
            <input type="color" disabled value={palette.color2} />
            <input type="color" disabled value={palette.color3} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
