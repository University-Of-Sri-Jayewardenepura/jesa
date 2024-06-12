import connectMongoDB from "@/lib/mongodb";
import ExternalApplicant from "@/models/externalApplicant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        
        const newApplicant = new ExternalApplicant(body);
        
        await newApplicant.save();
        
        return new NextResponse(JSON.stringify({ message: "Applicant saved successfully" }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Error saving applicant"}), { status: 500 });
    }
}