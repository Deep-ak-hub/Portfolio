import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const sequenceDir = path.join(process.cwd(), "public", "sequence");
    
    if (!fs.existsSync(sequenceDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(sequenceDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ext === ".webp" || ext === ".png" || ext === ".jpg" || ext === ".jpeg";
      })
      .sort((a, b) => {
        const matchA = a.match(/frame_(\d+)/);
        const matchB = b.match(/frame_(\d+)/);
        const numA = matchA ? parseInt(matchA[1], 10) : 0;
        const numB = matchB ? parseInt(matchB[1], 10) : 0;
        return numA - numB;
      });

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to read sequence directory:", error);
    return NextResponse.json(
      { error: "Failed to read sequence" },
      { status: 500 }
    );
  }
}
