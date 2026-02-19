// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const email = typeof body.email === "string" ? body.email : "";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, message: "Érvénytelen email" },
//         { status: 400 },
//       );
//     }

//     const secret = process.env.NIU_HASH_SECRET;
//     if (!secret) {
//       return NextResponse.json(
//         { success: false, message: "Hiányzó NIU_HASH_SECRET" },
//         { status: 500 },
//       );
//     }

//     const ts = Math.floor(Date.now() / 1000);

//     const hash = crypto
//       .createHmac("sha256", secret)
//       .update(`${email}|${ts}`)
//       .digest("hex");

//     const subscribeUrl =
//       process.env.NIU_SUBSCRIBE_URL ??
//       "https://dev.niu.hu/api/external/feliratkozas";

//     const apiRes = await fetch(subscribeUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${secret}`, // ✅ TOKEN HEADERBEN
//       },
//       body: JSON.stringify({
//         ...body,
//         email,
//         ts, // timestamp maradhat body-ban
//       }),
//     });

//     const data = await apiRes.json().catch(() => null);

//     return NextResponse.json(data ?? { success: apiRes.ok }, {
//       status: apiRes.status,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: `Hibás kérés ${error}` },
//       { status: 400 },
//     );
//   }
// }
