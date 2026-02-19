import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email megadása kötelező!" },
        { status: 400 },
      );
    }

    const secret = process.env.NIU_HASH_SECRET;
    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message: "Szerver hiba: HIÁNYZÓ NIU_HASH_SECRET env.",
        },
        { status: 500 },
      );
    }

    const ts = Math.floor(Date.now() / 1000);

    // A pontos formátumot igazítsd az elvárt specifikációhoz!
    const raw = `${email}|${ts}`;

    const full = crypto.createHmac("sha256", secret).update(raw).digest("hex");

    // "rövid hash" – pl. első 16 hex karakter
    const hash = full.slice(0, 16);

    return NextResponse.json({ success: true, hash, ts });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e?.message ?? "Ismeretlen hiba" },
      { status: 500 },
    );
  }
}
