/**
 * 设置rgba颜色的透明度
 */
export const setRgbaAlpha = (rgba: string, opacity: number): string => {

  if (!rgba) {
    return rgba;
  }
  rgba = rgba.toLowerCase();

  if (!rgba.startsWith("rgba(") || !rgba.endsWith(")")) {
    return rgba;
  }

  rgba = rgba.replace("rgba(", "").replace(")", "");
  const array = rgba.split(',');
  if (array.length == 3) {
    array.push(String(opacity));
  } else if (array.length == 4) {
    array.splice(3, 1, String(opacity));
  }

  rgba = "rgba(" + array.join(",") + ")";
  return rgba;
}
