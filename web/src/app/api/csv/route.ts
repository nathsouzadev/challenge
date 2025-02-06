import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = await fetch(`${process.env.SERVICE_UPLOAD}/csv`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
