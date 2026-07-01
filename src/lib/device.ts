import { useState } from "react";

export type DeviceType = "ios" | "android" | "desktop";

function detect(): DeviceType {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

/** Detects the visitor's platform so we can highlight the matching store badge. */
export function useDeviceType(): DeviceType {
  const [device] = useState<DeviceType>(detect);
  return device;
}
