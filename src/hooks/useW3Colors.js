/* eslint-disable no-plusplus */
/* w3color.js ver.1.18 by w3schools.com (Do not remove this line) */

function emptyObject() {
  return {
    red: 0,
    green: 0,
    blue: 0,
    hue: 0,
    sat: 0,
    lightness: 0,
    whiteness: 0,
    blackness: 0,
    cyan: 0,
    magenta: 0,
    yellow: 0,
    black: 0,
    ncol: 'R',
    opacity: 1,
    valid: false,
  };
}

function hueToNcol(hue) {
  const obj = {
    hue,
    str: '',
  };

  while (hue >= 360) {
    obj.hue -= 360;
  }

  if (hue < 60) { obj.str = `R${hue / 0.6}`; }
  if (hue < 120) { obj.str = `Y${(hue - 60) / 0.6}`; }
  if (hue < 180) { obj.str = `G${(hue - 120) / 0.6}`; }
  if (hue < 240) { obj.str = `C${(hue - 180) / 0.6}`; }
  if (hue < 300) { obj.str = `B${(hue - 240) / 0.6}`; }
  if (hue < 360) { obj.str = `M${(hue - 300) / 0.6}`; }

  return obj.str;
}

function rgbToHwb(r, g, b) {
  const obj = { r, g, b };
  let h;

  obj.r /= 255;
  obj.g /= 255;
  obj.b /= 255;

  const max = Math.max(obj.r, obj.g, obj.b);
  const min = Math.min(obj.r, obj.g, obj.b);
  const chroma = max - min;

  if (chroma === 0) {
    h = 0;
  } else if (obj.r === max) {
    h = (((obj.g - obj.b) / chroma) % 6) * 360;
  } else if (obj.g === max) {
    h = ((((obj.b - obj.r) / chroma) + 2) % 6) * 360;
  } else {
    h = ((((obj.r - obj.g) / chroma) + 4) % 6) * 360;
  }

  const w = min;
  const bl = 1 - max;

  return { h, w, b: bl };
}

function rgbToCmyk(r, g, b) {
  const obj = { r, g, b };

  let c;
  let m;
  let y;

  obj.r /= 255;
  obj.g /= 255;
  obj.b /= 255;

  const max = Math.max(obj.r, obj.g, obj.b);
  const k = 1 - max;

  if (k === 1) {
    c = 0;
    m = 0;
    y = 0;
  } else {
    c = (1 - obj.r - k) / (1 - k);
    m = (1 - obj.g - k) / (1 - k);
    y = (1 - obj.b - k) / (1 - k);
  }
  return {
    c, m, y, k,
  };
}

function toHex(n) {
  let hex = n.toString(16);
  while (hex.length < 2) { hex = `0${hex}`; }
  return hex;
}

function w3trim(x) {
  return x.replace(/^\s+|\s+$/g, '');
}

function isHex(x) {
  return ('0123456789ABCDEFabcdef'.indexOf(x) > -1);
}

function roundDecimals(c) {
  return {
    red: Number(c.red.toFixed(0)),
    green: Number(c.green.toFixed(0)),
    blue: Number(c.blue.toFixed(0)),
    hue: Number(c.hue.toFixed(0)),
    sat: Number(c.sat.toFixed(2)),
    lightness: Number(c.lightness.toFixed(2)),
    whiteness: Number(c.whiteness.toFixed(2)),
    blackness: Number(c.blackness.toFixed(2)),
    cyan: Number(c.cyan.toFixed(2)),
    magenta: Number(c.magenta.toFixed(2)),
    yellow: Number(c.yellow.toFixed(2)),
    black: Number(c.black.toFixed(2)),
    ncol: c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1))),
    opacity: Number(c.opacity.toFixed(2)),
  };
}

function hueToRgb(t1, t2, hue) {
  const obj = { t1, t2, hue };

  if (obj.hue < 0) obj.hue += 6;
  if (obj.hue >= 6) obj.hue -= 6;

  if (obj.hue < 1) return (t2 - t1) * obj.hue + t1;
  if (obj.hue < 3) return t2;
  if (obj.hue < 4) return (t2 - t1) * (4 - obj.hue) + t1;

  return obj.t1;
}

function rgbToHsl(r, g, b) {
  let i;
  let s;
  let maxcolor;
  let h;
  const rgb = [];

  rgb.push(r / 255);
  rgb.push(g / 255);
  rgb.push(b / 255);
  let [min] = rgb;
  let [max] = rgb;
  maxcolor = 0;

  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) { min = rgb[i + 1]; }
    if (rgb[i + 1] >= max) { max = rgb[i + 1]; maxcolor = i + 1; }
  }

  if (maxcolor === 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor === 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor === 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (Number.isNaN(h)) { h = 0; }
  h *= 60;
  if (h < 0) { h += 360; }
  const l = (min + max) / 2;
  if (min === max) {
    s = 0;
  } else if (l < 0.5) {
    s = (max - min) / (max + min);
  } else {
    s = (max - min) / (2 - max - min);
  }

  // s = s;

  return { h, s, l };
}

function colorObject(rgb, a, h, s) {
  let color;

  if (!rgb) { return emptyObject(); }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const hue = (h || hsl.h);
  const sat = (s || hsl.s);
  const ncol = hueToNcol(hue);
  color = {
    red: rgb.r,
    green: rgb.g,
    blue: rgb.b,
    hue,
    sat,
    lightness: hsl.l,
    whiteness: hwb.w,
    blackness: hwb.b,
    cyan: cmyk.c,
    magenta: cmyk.m,
    yellow: cmyk.y,
    black: cmyk.k,
    ncol,
    opacity: a || 1,
    valid: true,
  };

  color = roundDecimals(color);

  return color;
}
function getColorArr(x) {
  if (x === 'names') {
    return ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
  }

  return ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];
}

function hslToRgb(hue, sat, light) {
  const t2 = light <= 0.5
    ? light * (sat + 1)
    : light + sat - (light * sat);
  const hueX = hue / 60;

  const t1 = light * 2 - t2;
  const r = hueToRgb(t1, t2, hueX + 2) * 255;
  const g = hueToRgb(t1, t2, hueX) * 255;
  const b = hueToRgb(t1, t2, hueX - 2) * 255;

  return { r, g, b };
}

function hwbToRgb(hue, white, black) {
  const params = { hue, white, black };
  const rgbArr = [];
  const rgb = hslToRgb(hue, 1, 0.50);
  const tot = white + black;

  rgbArr[0] = rgb.r / 255;
  rgbArr[1] = rgb.g / 255;
  rgbArr[2] = rgb.b / 255;

  if (tot > 1) {
    params.white = Number((white / tot).toFixed(2));
    params.black = Number((black / tot).toFixed(2));
  }

  for (let i = 0; i < 3; i++) {
    rgbArr[i] *= (1 - (params.white) - (params.black));
    rgbArr[i] += (params.white);
    rgbArr[i] = Number(rgbArr[i] * 255);
  }

  return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] };
}

function cmykToRgb(c, m, y, k) {
  const r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
  const g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
  const b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);

  return { r, g, b };
}

function ncolToRgb(ncol, white, black) {
  const params = { ncol, white, black };
  let letter;
  let percent;
  let h = ncol;

  if (Number.isNaN(ncol.substr(0, 1))) {
    letter = ncol.substr(0, 1).toUpperCase();
    percent = ncol.substr(1);

    if (percent === '') { percent = 0; }

    percent = Number(percent);

    if (Number.isNaN(percent)) { return false; }
    if (letter === 'R') { h = 0 + (percent * 0.6); }
    if (letter === 'Y') { h = 60 + (percent * 0.6); }
    if (letter === 'G') { h = 120 + (percent * 0.6); }
    if (letter === 'C') { h = 180 + (percent * 0.6); }
    if (letter === 'B') { h = 240 + (percent * 0.6); }
    if (letter === 'M') { h = 300 + (percent * 0.6); }
    if (letter === 'W') {
      h = 0;
      params.white = 1 - (percent / 100);
      params.black = (percent / 100);
    }
  }

  return hwbToRgb(h, params.white, params.black);
}

function ncsToRgb(ncs) {
  const param = { ncs };
  let black1;
  let chroma1;
  let red1;
  let factor1;
  let blue1;
  let red2;
  let green1;
  let green2;
  let blue2;
  let max;
  let factor2;
  let grey;
  let r;
  let g;
  let b;

  param.ncs = w3trim(param.ncs)
    .toUpperCase()
    .replace('(', '')
    .replace(')', '')
    .replace('NCS', 'NCS ')
    .replace(/ {2}/g, ' ');

  if (param.ncs.indexOf('NCS') === -1) { param.ncs = `NCS ${param.ncs}`; }

  param.ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);

  if (ncs === null) return false;

  const black = parseInt(ncs[1], 10);
  const chroma = parseInt(ncs[2], 10);
  const bc = ncs[3];
  if (bc !== 'N' && bc !== 'Y' && bc !== 'R' && bc !== 'B' && bc !== 'G') { return false; }

  const percent = parseInt(ncs[4], 10) || 0;
  if (bc !== 'N') {
    black1 = (1.05 * black - 5.25);
    chroma1 = chroma;
    if (bc === 'Y' && percent <= 60) {
      red1 = 1;
    } else if ((bc === 'Y' && percent > 60) || (bc === 'R' && percent <= 80)) {
      if (bc === 'Y') {
        factor1 = percent - 60;
      } else {
        factor1 = percent + 40;
      }
      red1 = ((Math.sqrt(14884 - factor1 ** 2)) - 22) / 100;
    } else if ((bc === 'R' && percent > 80) || (bc === 'B')) {
      red1 = 0;
    } else if (bc === 'G') {
      factor1 = (percent - 170);
      red1 = ((Math.sqrt(33800 - factor1 ** 2)) - 70) / 100;
    }
    if (bc === 'Y' && percent <= 80) {
      blue1 = 0;
    } else if ((bc === 'Y' && percent > 80) || (bc === 'R' && percent <= 60)) {
      if (bc === 'Y') {
        factor1 = (percent - 80) + 20.5;
      } else {
        factor1 = (percent + 20) + 20.5;
      }
      blue1 = (104 - (Math.sqrt(11236 - factor1 ** 2))) / 100;
    } else if ((bc === 'R' && percent > 60) || (bc === 'B' && percent <= 80)) {
      if (bc === 'R') {
        factor1 = (percent - 60) - 60;
      } else {
        factor1 = (percent + 40) - 60;
      }
      blue1 = ((Math.sqrt(10000 - factor1 ** 2)) - 10) / 100;
    } else if ((bc === 'B' && percent > 80) || (bc === 'G' && percent <= 40)) {
      if (bc === 'B') {
        factor1 = (percent - 80) - 131;
      } else {
        factor1 = (percent + 20) - 131;
      }
      blue1 = (122 - (Math.sqrt(19881 - factor1 ** 2))) / 100;
    } else if (bc === 'G' && percent > 40) {
      blue1 = 0;
    }
    if (bc === 'Y') {
      green1 = (85 - (17 / 20) * percent) / 100;
    } else if (bc === 'R' && percent <= 60) {
      green1 = 0;
    } else if (bc === 'R' && percent > 60) {
      factor1 = (percent - 60) + 35;
      green1 = (67.5 - (Math.sqrt(5776 - factor1 ** 2))) / 100;
    } else if (bc === 'B' && percent <= 60) {
      factor1 = (1 * percent - 68.5);
      green1 = (6.5 + (Math.sqrt(7044.5 - factor1 ** 2))) / 100;
    } else if ((bc === 'B' && percent > 60) || (bc === 'G' && percent <= 60)) {
      green1 = 0.9;
    } else if (bc === 'G' && percent > 60) {
      factor1 = (percent - 60);
      green1 = (90 - ((1 / 8) * factor1)) / 100;
    }
    factor1 = (red1 + green1 + blue1) / 3;
    red2 = ((factor1 - red1) * ((100 - chroma1) / 100)) + red1;
    green2 = ((factor1 - green1) * ((100 - chroma1) / 100)) + green1;
    blue2 = ((factor1 - blue1) * ((100 - chroma1) / 100)) + blue1;
    if (red2 > green2 && red2 > blue2) {
      max = red2;
    } else if (green2 > red2 && green2 > blue2) {
      max = green2;
    } else if (blue2 > red2 && blue2 > green2) {
      max = blue2;
    } else {
      max = (red2 + green2 + blue2) / 3;
    }
    factor2 = 1 / max;
    r = parseInt((red2 * factor2 * ((100 - black1) / 100)) * 255, 10);
    g = parseInt((green2 * factor2 * ((100 - black1) / 100)) * 255, 10);
    b = parseInt((blue2 * factor2 * ((100 - black1) / 100)) * 255, 10);
    if (r > 255) { r = 255; }
    if (g > 255) { g = 255; }
    if (b > 255) { b = 255; }
    if (r < 0) { r = 0; }
    if (g < 0) { g = 0; }
    if (b < 0) { b = 0; }
  } else {
    grey = parseInt((1 - black / 100) * 255, 10);
    if (grey > 255) { grey = 255; }
    if (grey < 0) { grey = 0; }
    r = grey;
    g = grey;
    b = grey;
  }
  return {
    r,
    g,
    b,
  };
}

export function toColorObject(c) {
  const param = { c: w3trim(c.toLowerCase()) };
  let typ;
  let arr = [];
  let arrlength;
  let i;
  let opacity;
  let match;
  let a;
  let hue;
  let sat;
  let rgb;
  let colornames = [];
  let colorhexs = [];

  const x = param.c.substr(0, 1).toUpperCase();
  const y = param.c.substr(1);
  a = 1;

  if ((x === 'R' || x === 'Y' || x === 'G' || x === 'C' || x === 'B' || x === 'M' || x === 'W') && !Number.isNaN(y)) {
    if (!(param.c.length === 6 && param.c.indexOf(',') === -1)) {
      param.c = `ncol(${param.c})`;
    }
  }

  if (param.c.length !== 3 && param.c.length !== 6 && !Number.isNaN(param.c)) { param.c = `ncol(${param.c})`; }
  if (param.c.indexOf(',') > 0 && param.c.indexOf('(') === -1) { param.c = `ncol(${param.c})`; }
  if (param.c.substr(0, 3) === 'rgb' || param.c.substr(0, 3) === 'hsl' || param.c.substr(0, 3) === 'hwb' || param.c.substr(0, 4) === 'ncol' || param.c.substr(0, 4) === 'cmyk') {
    if (param.c.substr(0, 4) === 'ncol') {
      if (param.c.split(',').length === 4 && param.c.indexOf('ncola') === -1) {
        param.c = param.c.replace('ncol', 'ncola');
      }
      typ = 'ncol';
      param.c = param.c.substr(4);
    } else if (param.c.substr(0, 4) === 'cmyk') {
      typ = 'cmyk';
      param.c = param.c.substr(4);
    } else {
      typ = param.c.substr(0, 3);
      param.c = param.c.substr(3);
    }
    arrlength = 3;
    opacity = false;
    if (param.c.substr(0, 1).toLowerCase() === 'a') {
      arrlength = 4;
      opacity = true;
      param.c = param.c.substr(1);
    } else if (typ === 'cmyk') {
      arrlength = 4;
      if (param.c.split(',').length === 5) {
        arrlength = 5;
        opacity = true;
      }
    }
    param.c = param.c.replace('(', '');
    param.c = param.c.replace(')', '');
    arr = param.c.split(',');
    if (typ === 'rgb') {
      if (arr.length !== arrlength) {
        return emptyObject();
      }
      for (i = 0; i < arrlength; i++) {
        if (arr[i] === '' || arr[i] === ' ') { arr[i] = '0'; }
        if (arr[i].indexOf('%') > -1) {
          arr[i] = arr[i].replace('%', '');
          arr[i] = Number(arr[i] / 100);
          if (i < 3) { arr[i] = Math.round(arr[i] * 255); }
        }
        if (Number.isNaN(arr[i])) { return emptyObject(); }
        if (parseInt(arr[i], 10) > 255) { arr[i] = 255; }
        if (i < 3) { arr[i] = parseInt(arr[i], 10); }
        if (i === 3 && Number(arr[i]) > 1) { arr[i] = 1; }
      }
      rgb = { r: arr[0], g: arr[1], b: arr[2] };
      if (opacity === true) { a = Number(arr[3]); }
    }
    if (typ === 'hsl' || typ === 'hwb' || typ === 'ncol') {
      while (arr.length < arrlength) { arr.push('0'); }
      if (typ === 'hsl' || typ === 'hwb') {
        if (parseInt(arr[0], 10) >= 360) { arr[0] = 0; }
      }
      for (i = 1; i < arrlength; i++) {
        if (arr[i].indexOf('%') > -1) {
          arr[i] = arr[i].replace('%', '');
          arr[i] = Number(arr[i]);
          if (Number.isNaN(arr[i])) { return emptyObject(); }
          arr[i] /= 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) { arr[i] = 1; }
        if (Number(arr[i]) < 0) { arr[i] = 0; }
      }
      if (typ === 'hsl') { rgb = hslToRgb(arr[0], arr[1], arr[2]); hue = Number(arr[0]); sat = Number(arr[1]); }
      if (typ === 'hwb') { rgb = hwbToRgb(arr[0], arr[1], arr[2]); }
      if (typ === 'ncol') { rgb = ncolToRgb(arr[0], arr[1], arr[2]); }
      if (opacity === true) { a = Number(arr[3]); }
    }
    if (typ === 'cmyk') {
      while (arr.length < arrlength) { arr.push('0'); }
      for (i = 0; i < arrlength; i++) {
        if (arr[i].indexOf('%') > -1) {
          arr[i] = arr[i].replace('%', '');
          arr[i] = Number(arr[i]);
          if (Number.isNaN(arr[i])) { return emptyObject(); }
          arr[i] /= 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) { arr[i] = 1; }
        if (Number(arr[i]) < 0) { arr[i] = 0; }
      }
      rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
      if (opacity === true) { a = Number(arr[4]); }
    }
  } else if (param.c.substr(0, 3) === 'ncs') {
    rgb = ncsToRgb(param.c);
  } else {
    match = false;
    colornames = getColorArr('names');
    for (i = 0; i < colornames.length; i++) {
      if (param.c.toLowerCase() === colornames[i].toLowerCase()) {
        colorhexs = getColorArr('hexs');
        match = true;
        rgb = {
          r: parseInt(colorhexs[i].substr(0, 2), 16),
          g: parseInt(colorhexs[i].substr(2, 2), 16),
          b: parseInt(colorhexs[i].substr(4, 2), 16),
        };
        break;
      }
    }
    if (match === false) {
      param.c = param.c.replace('#', '');
      if (param.c.length === 3) {
        param.c = param.c.substr(0, 1).concat(
          param.c.substr(0, 1),
          param.c.substr(1, 1),
          param.c.substr(1, 1),
          param.c.substr(2, 1),
          param.c.substr(2, 1),
        );
      }

      for (i = 0; i < param.c.length; i++) {
        if (!isHex(param.c.substr(i, 1))) { return emptyObject(); }
      }
      arr[0] = parseInt(param.c.substr(0, 2), 16);
      arr[1] = parseInt(param.c.substr(2, 2), 16);
      arr[2] = parseInt(param.c.substr(4, 2), 16);
      for (i = 0; i < 3; i++) {
        if (Number.isNaN(arr[i])) { return emptyObject(); }
      }
      rgb = {
        r: arr[0],
        g: arr[1],
        b: arr[2],
      };
    }
  }
  return colorObject(rgb, a, hue, sat);
}

export class W3Color {
  constructor(color, elmnt) {
    if (typeof color === 'object') {
      this.color = color;
    }

    this.attachValues(toColorObject(color));

    if (elmnt) {
      this.elmnt.style.backgroundColor = this.toRgbString();
    }
  }

  toRgbString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  toRgbaString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
  }

  toHwbString() {
    return `hwb(${this.hue}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%)`;
  }

  toHwbStringDecimal() {
    return `hwb(${this.hue}, ${this.whiteness}, ${this.blackness})`;
  }

  toHwbaString() {
    return `hwba(${this.hue}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%, ${this.opacity})`;
  }

  toHslString() {
    return `hsl(${this.hue}, ${Math.round(this.sat * 100)}%, ${Math.round(this.lightness * 100)}%)`;
  }

  toHslStringDecimal() {
    return `hsl(${this.hue}, ${this.sat}, ${this.lightness})`;
  }

  toHslaString() {
    return `hsla(${this.hue}, ${Math.round(this.sat * 100)}%, ${Math.round(this.lightness * 100)}%, ${this.opacity})`;
  }

  toCmykString() {
    return `cmyk(${Math.round(this.cyan * 100)}%, ${Math.round(this.magenta * 100)}%, ${Math.round(this.yellow * 100)}%, ${Math.round(this.black * 100)}%)`;
  }

  toCmykStringDecimal() {
    return `cmyk(${this.cyan}, ${this.magenta}, ${this.yellow}, ${this.black})`;
  }

  toNcolString() {
    return `${this.ncol}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%`;
  }

  toNcolStringDecimal() {
    return `${this.ncol}, ${this.whiteness}, ${this.blackness}`;
  }

  toNcolaString() {
    return `${this.ncol}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%, ${this.opacity}`;
  }

  toName() {
    let r; let g; let b; const
      colorhexs = getColorArr('hexs');
    for (let i = 0; i < colorhexs.length; i++) {
      r = parseInt(colorhexs[i].substr(0, 2), 16);
      g = parseInt(colorhexs[i].substr(2, 2), 16);
      b = parseInt(colorhexs[i].substr(4, 2), 16);
      if (this.red === r && this.green === g && this.blue === b) {
        return getColorArr('names')[i];
      }
    }
    return '';
  }

  toHexString() {
    const r = toHex(this.red);
    const g = toHex(this.green);
    const b = toHex(this.blue);
    return `#${r}${g}${b}`;
  }

  toRgb() {
    return {
      r: this.red, g: this.green, b: this.blue, a: this.opacity,
    };
  }

  toHsl() {
    return {
      h: this.hue, s: this.sat, l: this.lightness, a: this.opacity,
    };
  }

  toHwb() {
    return {
      h: this.hue, w: this.whiteness, b: this.blackness, a: this.opacity,
    };
  }

  toCmyk() {
    return {
      c: this.cyan, m: this.magenta, y: this.yellow, k: this.black, a: this.opacity,
    };
  }

  toNcol() {
    return {
      ncol: this.ncol, w: this.whiteness, b: this.blackness, a: this.opacity,
    };
  }

  isDark(n) {
    const m = (n || 128);
    return (((this.red * 299 + this.green * 587 + this.blue * 114) / 1000) < m);
  }

  saturate(n) {
    const x = (n / 100 || 0.1);
    this.sat += x;
    if (this.sat > 1) { this.sat = 1; }
    const rgb = hslToRgb(this.hue, this.sat, this.lightness);
    const color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  }

  desaturate(n) {
    const x = (n / 100 || 0.1);
    this.sat -= x;
    if (this.sat < 0) { this.sat = 0; }
    const rgb = hslToRgb(this.hue, this.sat, this.lightness);
    const color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  }

  lighter(n) {
    const x = (n / 100 || 0.1);
    this.lightness += x;
    if (this.lightness > 1) { this.lightness = 1; }
    const rgb = hslToRgb(this.hue, this.sat, this.lightness);
    const color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  }

  darker(n) {
    const x = (n / 100 || 0.1);
    this.lightness -= x;
    if (this.lightness < 0) { this.lightness = 0; }
    const rgb = hslToRgb(this.hue, this.sat, this.lightness);
    const color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  }

  attachValues(color) {
    this.red = color.red;
    this.green = color.green;
    this.blue = color.blue;
    this.hue = color.hue;
    this.sat = color.sat;
    this.lightness = color.lightness;
    this.whiteness = color.whiteness;
    this.blackness = color.blackness;
    this.cyan = color.cyan;
    this.magenta = color.magenta;
    this.yellow = color.yellow;
    this.black = color.black;
    this.ncol = color.ncol;
    this.opacity = color.opacity;
    this.valid = color.valid;
  }
}

/*
function w3color(color, elmnt) {
  if (!(this instanceof w3color)) { return new w3color(color, elmnt); }
  if (typeof color === 'object') { return color; }
  this.attachValues(toColorObject(color));
  if (elmnt) { elmnt.style.backgroundColor = this.toRgbString(); }
}
*/
/*
function w3SetColorsByAttribute() {
  let z; let i; let
    att;
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    att = z[i].getAttribute('data-w3-color');
    if (att) {
      z[i].style.backgroundColor = w3color(att).toRgbString();
    }
  }
}
*/
