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

export function intFormat(v, e, z = "비공개") {
  if (isNaN(v)) return "";
  var l = ((Math.log(Math.abs(v) + 1) * 0.43429448190325176) | 0) + 1;
  if (v === 0) {
    return z;
  }
  if (l >= 9) {
    return (v / 100000000).toFixed(1) + "억";
  }
  if (l >= 5) {
    return (v / 10000).toFixed(0) + "만";
  }
  if (l >= 4) {
    return (v / 1000).toFixed(0) + "천";
  }
  return parseFloat(v + e).toFixed(0);
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
