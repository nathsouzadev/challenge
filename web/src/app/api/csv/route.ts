import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = await fetch(`${process.env.SERVICE_UPLOAD}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);

    return NextResponse.json({ message: "CSV Uploaded" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
