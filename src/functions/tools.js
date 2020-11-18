export function getEmailFromString(v) {
  var e = v.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  if (e === null) {
    return "";
  }
  return e;
}

export function openLinkIfValid(v) {
  if (v !== "") {
    window.open(v, "_blank");
  }
}

export function decode(v) {
  return decodeURIComponent(JSON.parse('"' + v + '"'));
}

export function intFormat(v, zeroValue = "Not Shown", addStr="") {
  if (isNaN(v)) return "";
  var l = ((Math.log(Math.abs(v) + 1) * 0.43429448190325176) | 0) + 1;
  if (v === 0) {
    return zeroValue+addStr;
  }
  // if (l >= 9) {
  //   return (v / 100000000).toFixed(1) + "억"+addStr;
  // }
  // if (l >= 5) {
  //   return (v / 10000).toFixed(0) + "만"+addStr;
  // }
  // if (l >= 4) {
  //   return (v / 1000).toFixed(0) + "천"+addStr;
  // }
  if (l >= 10) {
    return (v / 1000000000).toFixed(0) + "B"+ addStr;
  }
  if (l >= 7) {
    return (v / 1000000).toFixed(0) + "M"+addStr;
  }
  if (l >= 4) {
    return (v / 1000).toFixed(0) + "K"+addStr;
  }
  return parseFloat(v).toFixed(0)+addStr;
}

export function sumNaN(...v) {
  var ret = 0;
  var x;
  for (x of v) {
    if (!isNaN(x)) ret = ret + x;
  }
  if (ret === 0) {
    return NaN;
  }
  return ret;
}

export function checkValidStyle(v) {
  if (v === "" || v === false) {
    return { filter: "opacity(0.3)" };
  }
}
