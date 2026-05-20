import * as React from "react";

export type WelcomeEmailProps = {
  recipientName?: string;
  siteUrl?: string;
};

export default function WelcomeEmail({
  recipientName,
  siteUrl = "https://startup.niu.hu",
}: WelcomeEmailProps) {
  const greeting = recipientName ? `Kedves ${recipientName}!` : "Üdvözlünk!";

  return (
    <html lang="hu">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Üdvözlünk a Startup Ecosystemben</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 2,
          backgroundColor: "#0b1027",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#ffffff",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{ backgroundColor: "#0b1027", padding: "32px 0" }}
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={{
                  backgroundColor: "#120937",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "32px 40px 8px",
                      backgroundColor: "#1a0f4a",
                    }}
                  >
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      role="presentation"
                      style={{ marginBottom: 16 }}
                    >
                      <tr>
                        <td
                          style={{
                            paddingRight: 8,
                            verticalAlign: "middle",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: 8,
                              height: 8,
                              borderRadius: 9999,
                              backgroundColor: "#afe200",
                            }}
                          />
                        </td>
                        <td
                          style={{
                            fontFamily:
                              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            fontSize: 12,
                            color: "rgba(255,255,255,0.8)",
                            letterSpacing: 0.4,
                            verticalAlign: "middle",
                          }}
                        >
                          NIU · Newsletter
                        </td>
                      </tr>
                    </table>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 28,
                        fontWeight: 800,
                        letterSpacing: -0.4,
                        color: "#ffffff",
                      }}
                    >
                      Stay in the loop
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "28px 40px 32px" }}>
                    <h2
                      style={{
                        margin: "0 0 16px",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      {greeting}
                    </h2>
                    <p
                      style={{
                        margin: "0 0 14px",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.78)",
                      }}
                    >
                      Köszönjük, hogy feliratkoztál a Hungarian Startup
                      Ecosystem hírlevelére. Mostantól elsőként értesülsz a
                      legfrissebb pályázatokról, eseményekről és a hazai startup
                      szcéna híreiről.
                    </p>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.78)",
                      }}
                    >
                      Fedezd fel az ökoszisztémát az alábbi linken:
                    </p>

                    <table cellPadding={0} cellSpacing={0} role="presentation">
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#afe200",
                            borderRadius: 10,
                          }}
                        >
                          <a
                            href={siteUrl}
                            style={{
                              display: "inline-block",
                              padding: "13px 28px",
                              color: "#0b1027",
                              fontSize: 14,
                              fontWeight: 800,
                              textDecoration: "none",
                              letterSpacing: 0.2,
                            }}
                          >
                            Explore the ecosystem →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "20px 40px 28px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: 0.3,
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      Ezt a levelet azért kaptad, mert feliratkoztál a Hungarian
                      Startup Ecosystem hírlevelére. Ha nem te voltál, kérjük
                      hagyd figyelmen kívül.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
