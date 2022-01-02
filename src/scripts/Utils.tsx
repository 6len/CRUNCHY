import { cloneDeep, isUndefined, map, orderBy, take } from "lodash";

export const teamSplit = (data: any[]): { team1: any[]; team2: any[] } => {
  const clonedData = cloneDeep(data);
  const half = Math.ceil(data.length / 2);
  return { team1: clonedData.splice(0, half), team2: clonedData.splice(-half) };
};

export const hexToRgb = (hex) => {
  var res = hex.match(/[a-f0-9]{2}/gi);
  return res && res.length === 3
    ? res.map(function (v) {
        return parseInt(v, 16);
      })
    : null;
};

export const rgbToHex = (rgb) => {
  return (
    "#" +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  );
};

export const getConvolutionColors = (
  imageDataMap: any[][][],
  height: number,
  width: number
) =>
  map(imageDataMap, (item, index) =>
    map(item, (innerItem, innerIndex) => {
      let surrounding = [];

      for (
        let dx = index > 0 ? -1 : 0;
        dx <= (index < height - 1 ? 1 : 0);
        ++dx
      ) {
        for (
          let dy = innerIndex > 0 ? -1 : 0;
          dy <= (innerIndex < width - 1 ? 1 : 0);
          ++dy
        ) {
          if (dx !== 0 || dy !== 0) {
            surrounding.push(imageDataMap[index + dx][innerIndex + dy]);
          }
        }
      }

      surrounding.push(imageDataMap[index][innerIndex]);

      return getSmoothColors(surrounding);
    })
  );

const getSmoothColors = (values) => {
  let r, g, b, a;

  const colorMap = new Map();

  for (let i = 0; i < values.length; i++) {
    if (!isUndefined(values[i])) {
      r = values[i][0];
      g = values[i][1];
      b = values[i][2];
      a = values[i][3];

      const key = `${r} ${g} ${b} ${a}`;
      const occurences = colorMap.get(key);
      colorMap.set(key, occurences ? occurences + 1 : 1);
    }
  }

  const colors = orderBy([...colorMap], (item) => item[1], ["desc"]);
  const colorsFinalMap = map(colors, (item) => {
    return item[0].split(" ");
  });

  return take(colorsFinalMap, 1)[0];
};

//if (index === 0 && innerIndex === 0) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex + 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex + 1],
//         ]);
//       } else if (index === 0 && innerIndex === width - 1) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex - 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex - 1],
//         ]);
//       } else if (index === 0) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex + 1],
//           imageDataMap[index][innerIndex - 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex + 1],
//           imageDataMap[index + 1][innerIndex - 1],
//         ]);
//       } else if (index === height - 1 && innerIndex === 0) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex + 1],
//           imageDataMap[index - 1][innerIndex],
//           imageDataMap[index - 1][innerIndex + 1],
//         ]);
//       } else if (index === 0 && innerIndex === width - 1) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex - 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex - 1],
//         ]);
//       } else if (index === 0) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex + 1],
//           imageDataMap[index][innerIndex - 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex + 1],
//           imageDataMap[index + 1][innerIndex - 1],
//         ]);
//       } else if (innerIndex === 0) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex + 1],
//           imageDataMap[index - 1][innerIndex],
//           imageDataMap[index - 1][innerIndex + 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex + 1],
//         ]);
//       } else if (innerIndex === width - 1) {
//         return getSmoothColors([
//           imageDataMap[index][innerIndex],
//           imageDataMap[index][innerIndex - 1],
//           imageDataMap[index - 1][innerIndex],
//           imageDataMap[index - 1][innerIndex - 1],
//           imageDataMap[index + 1][innerIndex],
//           imageDataMap[index + 1][innerIndex - 1],
//         ]);
