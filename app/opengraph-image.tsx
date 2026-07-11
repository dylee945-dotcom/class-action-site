import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site.config";

export const alt = SITE_CONFIG.SITE_NAME;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1D35",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#C9A96E",
            color: "#0B1D35",
            fontSize: 56,
            fontWeight: 900,
            marginBottom: 36,
          }}
        >
          N
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_CONFIG.SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#C9A96E",
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          {SITE_CONFIG.FIRM_NAME} · {SITE_CONFIG.LAWYER_NAME}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
