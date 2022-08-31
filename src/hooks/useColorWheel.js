/* eslint-disable no-plusplus */
import { W3Color } from './useW3Colors';

function mixColors(from, to, n) {
  const arr = [];
  const fromObj = new W3Color(to);
  const toObj = new W3Color(from);
  let z;
  let r;
  let g;
  let b;
  let resultObj;
  r = fromObj.red;
  g = fromObj.green;
  b = fromObj.blue;

  for (let i = 1; i < n; i++) {
    z = i / n;
    r = z * fromObj.red + (1 - z) * toObj.red;
    g = z * fromObj.green + (1 - z) * toObj.green;
    b = z * fromObj.blue + (1 - z) * toObj.blue;
    resultObj = new W3Color(`rgb(${r},${g},${b})`);
    arr.push(resultObj.toHexString());
  }

  return arr;
}

let canvas;
let ctx;
let lastend;
let myColor;
let radius;
let rybNo;
let rybRule = -1;

let col1;
let col2;
let col3;
let col4;
let col5;

function clearLine() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  lastend = 0;
  myColor = ['#ffffff'];
  for (let i = 0; i < myColor.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2.5,
      lastend,
      lastend + (Math.PI * 2 * ((360 / myColor.length) / 360)),
      true,
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    lastend += Math.PI * 2 * ((360 / myColor.length) / 360);
  }
}

function drawLine(degrees) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.height / 2, canvas.height / 2);
  ctx.beginPath();
  ctx.lineWidth = radius * 0.07;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 0);
  ctx.rotate(degrees * Math.PI);
  ctx.lineTo(0, -(radius * 0.75));
  ctx.stroke();
  ctx.rotate(-(degrees) * Math.PI);
}

function draw5Shades(n) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`color${i}`).style.backgroundColor = window[`col${i}`];
    const col = new W3Color(window[`col${i}`]);
    if (col.isDark()) {
      document.getElementById(`colorvalue${i}`).style.color = '#ffffff';
      document.getElementById(`colorvalue${i}`).style.opacity = '0.6';
    } else {
      document.getElementById(`colorvalue${i}`).style.color = '#1f2d3d';
      document.getElementById(`colorvalue${i}`).style.opacity = '0.4';
    }
    document.getElementById(`colorvalue${i}`).innerHTML = col.toHexString().toUpperCase();
    document.getElementById(`colorvalue${i}`).innerHTML = col.toHexString().toUpperCase();
    if (n === -1 || n === 2) {
      document.getElementById(`sethue${i}`).value = (col.hue);
    }
    if (n === -1 || n === 0) {
      document.getElementById(`setsat${i}`).value = (col.sat * 100);
    }
    if (n === -1 || n === 1) {
      document.getElementById(`setlight${i}`).value = (col.lightness * 100);
    }
  }
}

function drawCanvas() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < myColor.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2,
      lastend,
      lastend + (Math.PI * 2 * ((360 / myColor.length) / 360)),
      false,
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    lastend += Math.PI * 2 * ((360 / myColor.length) / 360);
  }
}

function detectEdge() {
  let y;
  const x = navigator.userAgent;

  if (x.indexOf('Edge') > -1) {
    y = document.getElementById('slidecontainer').getElementsByClassName('slider');
    for (let i = 0; i < y.length; i++) {
      y[i].style.height = '24px';
    }
  }
}

function drawWebPage() {
  let x = document.getElementsByClassName('txcolor1');
  let l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.color = col1;
  }

  x = document.getElementsByClassName('txcolor2');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.color = col2;
  }

  x = document.getElementsByClassName('txcolor3');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.color = col3;
    x[i].style.color = col4;
  }

  x = document.getElementsByClassName('txcolor4');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.color = col4;
    x[i].style.color = col5;
  }

  x = document.getElementsByClassName('txcolor5');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.color = col5;
    x[i].style.color = col2;
  }

  x = document.getElementsByClassName('bgcolor1');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col1;
  }

  x = document.getElementsByClassName('bgcolor2');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col2;
    x[i].style.backgroundColor = col3;
  }

  x = document.getElementsByClassName('bgcolor3');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col3;
  }

  x = document.getElementsByClassName('bgcolor4');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col4;
  }

  x = document.getElementsByClassName('bgcolor5');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col5;
  }

  x = document.getElementsByClassName('borderrightcolor3');
  l = x.length;

  for (let i = 0; i < l; i++) {
    x[i].style.borderColor = col3;
  }
}

function getRYB() {
  const ryb = [];

  ryb[0] = '#fe2712'; // red
  ryb[6] = '#fb9902'; // orange
  ryb[12] = '#fefe33'; // yellow
  ryb[18] = '#66b032'; // green
  ryb[24] = '#0247fe'; // blue
  ryb[30] = '#8601af'; // violet

  let arr = mixColors(ryb[0], ryb[6], 6);
  let n = 0;

  for (let i = 1; i < 6; i++) {
    ryb[i] = arr[n];
    n++;
  }
  arr = mixColors(ryb[6], ryb[12], 6);
  n = 0;
  for (let i = 7; i < 12; i++) {
    ryb[i] = arr[n];
    n++;
  }
  arr = mixColors(ryb[12], ryb[18], 6);
  n = 0;
  for (let i = 13; i < 18; i++) {
    ryb[i] = arr[n];
    n++;
  }
  arr = mixColors(ryb[18], ryb[24], 6);
  n = 0;
  for (let i = 19; i < 24; i++) {
    ryb[i] = arr[n];
    n++;
  }
  arr = mixColors(ryb[24], ryb[30], 6);
  n = 0;
  for (let i = 25; i < 30; i++) {
    ryb[i] = arr[n];
    n++;
  }
  arr = mixColors(ryb[30], ryb[0], 6);
  n = 0;
  for (let i = 31; i < 36; i++) {
    ryb[i] = arr[n];
    n++;
  }
}

const ryb = getRYB();
const oRyb = ryb.slice();

function changeRule(n) {
  let c;
  let t1;
  let t2;
  let a1;
  let a2;
  let x;
  let sc1;
  let sc2;
  let col1light;
  const col5light = 0.12;
  let col4light;

  const satval = document.getElementById('satval').value;
  const lightval = document.getElementById('lightval').value;
  rybRule = n;
  col1light = 0.9;

  for (let i = 0; i < 5; i++) {
    document.getElementById('rulelist').getElementsByTagName('li')[i].style.backgroundColor = '';
  }

  document.getElementById('rulelist').getElementsByTagName('li')[n].style.backgroundColor = '#f1f1f1';

  if (n === 0) {
    x = new W3Color(ryb[rybNo]);
    col3 = x.toHexString();
    col1light = 0.93;
    x.lightness = (col1light * (lightval / 100));
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col1 = x.toHexString();
    x = new W3Color(ryb[rybNo]);
    x.lighter(20);
    col2 = x.toHexString();
    x = new W3Color(ryb[rybNo]);
    x.darker(20);
    col4 = x.toHexString();
    x = new W3Color(ryb[rybNo]);
    x.lightness = (col5light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col5 = x.toHexString();
    clearLine();
    drawLine((rybNo * (2 / 36)));
  }

  if (n === 1) {
    a1 = rybNo - 3;
    if (a1 < 0) a1 = 36 + a1;
    a2 = rybNo + 3;
    if (a2 > 35) a2 -= 36;
    col3 = ryb[rybNo];
    col2 = ryb[a1];
    col4 = ryb[a2];
    x = new W3Color(ryb[a1]);
    x.lightness = (col1light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col1 = x.toHexString();
    x = new W3Color(ryb[a2]);
    x.lightness = (col5light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col5 = x.toHexString();
    clearLine();
    drawLine((rybNo * (2 / 36)));
    drawLine((a1 * (2 / 36)));
    drawLine((a2 * (2 / 36)));
  }

  if (n === 2) {
    col3 = ryb[rybNo];
    c = rybNo + 18;
    if (c > 35) c -= 36;
    col2 = ryb[c];
    x = new W3Color(ryb[rybNo]);
    x.lightness = (col5light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col5 = x.toHexString();
    x = new W3Color(ryb[c]);
    x.lightness = (col1light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col1 = x.toHexString();
    x = new W3Color(ryb[rybNo]);
    col4light = 0.4;
    x.lightness = (col4light * (lightval / 100));
    x.sat = (satval * 8) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col4 = x.toHexString();
    clearLine();
    drawLine((rybNo * (2 / 36)));
    drawLine((c * (2 / 36)));
  }

  if (n === 3) {
    col3 = ryb[rybNo];
    t1 = rybNo + 12;
    if (t1 > 35) t1 -= 36;
    t2 = rybNo + 24;
    if (t2 > 35) t2 -= 36;
    col2 = ryb[t2];
    col4 = ryb[t1];
    x = new W3Color(ryb[rybNo]);
    x.lightness = (col5light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col5 = x.toHexString();
    x = new W3Color(ryb[t2]);
    x.lightness = (col1light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col1 = x.toHexString();
    clearLine();
    drawLine((rybNo * (2 / 36)));
    drawLine((t1 * (2 / 36)));
    drawLine((t2 * (2 / 36)));
  }
  if (n === 4) {
    col3 = ryb[rybNo];
    sc1 = rybNo + 15;
    if (sc1 > 35) sc1 -= 36;
    sc2 = rybNo + 21;
    if (sc2 > 35) sc2 -= 36;
    col4 = ryb[sc2];
    col2 = ryb[sc1];
    x = new W3Color(ryb[sc2]);
    x.lightness = (col5light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col5 = x.toHexString();
    x = new W3Color(ryb[sc1]);
    x.lightness = (col1light * (lightval / 100));
    x.sat = (satval * 7) / 1000;
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    col1 = x.toHexString();
    clearLine();
    drawLine((rybNo * (2 / 36)));
    drawLine((sc1 * (2 / 36)));
    drawLine((sc2 * (2 / 36)));
  }
  draw5Shades(-1);
  drawWebPage();
}

export function xxxdrawWebPage() {
  let x = document.getElementsByClassName('txcolor1');
  let l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.color = col1;
  }
  x = document.getElementsByClassName('txcolor2');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.color = col2;
  }
  x = document.getElementsByClassName('txcolor3');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.color = col3;
  }
  x = document.getElementsByClassName('txcolor4');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.color = col4;
  }
  x = document.getElementsByClassName('txcolor5');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.color = col5;
  }
  x = document.getElementsByClassName('bgcolor1');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col1;
  }
  x = document.getElementsByClassName('bgcolor2');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col2;
  }
  x = document.getElementsByClassName('bgcolor3');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col3;
  }
  x = document.getElementsByClassName('bgcolor4');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col4;
  }
  x = document.getElementsByClassName('bgcolor5');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.backgroundColor = col5;
  }
  x = document.getElementsByClassName('borderrightcolor3');
  l = x.length;
  for (let i = 0; i < l; i++) {
    x[i].style.borderColor = col3;
  }
}

export function initCanvas(rn) {
  let d;
  rybNo = rn;
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  lastend = 1.474 * Math.PI;
  myColor = ryb;
  drawCanvas();
  clearLine();
  detectEdge();
  radius = (canvas.height / 2) * 0.90;

  document.getElementById('can').onclick = function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rgb = ctx.getImageData(x, y, 1, 1).data;
    const c = new W3Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);

    for (let i = 0; i < ryb.length; i++) {
      if (c.toHexString() === ryb[i]) {
        d = i;
        break;
      }
    }

    rybNo = d;
    x = new W3Color(ryb[rybNo]);
    changeRule(rybRule);
  };

  document.getElementById('can').onmousemove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rgb = ctx.getImageData(x, y, 1, 1).data;
    const c = new W3Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    document.getElementById('can').style.cursor = 'default';

    for (let i = 0; i < ryb.length; i++) {
      if (c.toHexString() === ryb[i]) {
        document.getElementById('can').style.cursor = 'pointer';
      }
    }
  };
}

export function satlight() {
  let x;
  const lightval = document.getElementById('lightval').value;
  const satval = document.getElementById('satval').value;

  for (let i = 0; i < oRyb.length; i++) {
    x = new W3Color(oRyb[i]);
    x.lightness *= (lightval / 100);
    x.sat *= (satval / 100);
    x = new W3Color(`hsl(${x.hue},${x.sat},${x.lightness})`);
    ryb[i] = x.toHexString();
  }

  drawCanvas();
  changeRule(rybRule);
}

export function setsatlight(y, n) {
  const hueval = document.getElementById(`sethue${n}`).value;
  const lightval = document.getElementById(`setlight${n}`).value;
  const satval = document.getElementById(`setsat${n}`).value;
  const colX = new W3Color(window[`col${n}`]);
  colX.hue = hueval;
  colX.lightness = lightval / 100;
  colX.sat = satval / 100;

  const colY = new W3Color(`hsl(${colX.hue},${colX.sat},${colX.lightness})`);
  window[`col${n}`] = colY.toHexString();
  draw5Shades(y);
  drawWebPage();
}

export function displayDots() {
  const x = document.getElementsByClassName('fade');
  for (let i = 0; i < x.length; i++) {
    document.getElementById('dotcontainer').innerHTML += `<span class='dot' onclick='displayWebPage(${i + 1})'></span>&nbsp;`;
  }
}

let currentwebpage = 1;

export function displayWebPage(n) {
  const x = document.getElementsByClassName('fade');

  for (let i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = '';
    document.getElementById(`webpage${i + 1}`).style.display = 'none';
  }

  if (x.length > 0) {
    currentwebpage += n;

    if (currentwebpage > (x.length)) {
      currentwebpage = x.length;
    }

    if (currentwebpage < 1) {
      currentwebpage = 1;
    }

    document.getElementById(`webpage${currentwebpage}`).style.display = 'block';
  }
}

let wheelspin;
let wheelspincounter;
let wheelspinspeed;
let wheelstopspeed;

function spinspinspin() {
  wheelspincounter++;
  if (wheelspincounter > 50) {
    wheelspinspeed += wheelstopspeed;
    wheelstopspeed *= 1.1;
  }
  if (wheelspinspeed > 200) {
    window.clearTimeout(wheelspin);
    return;
  }
  rybNo += 1;
  if (rybNo > 35) {
    rybNo = 0;
  }
  wheelspin = window.setTimeout(() => {
    changeRule(rybRule);
    spinspinspin();
  }, wheelspinspeed);
}

export function colorwheelspin() {
  wheelspincounter = 0;
  wheelspinspeed = 30;
  wheelstopspeed = 1;
  spinspinspin();
}
