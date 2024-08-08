import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function GET() {
  try {
    console.log("running email validator");

    return NextResponse.json({ success: true, hello: "true" }, { status: 200 });
  } catch (error) {
    console.log("Error while saving data: " + error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
