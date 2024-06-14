import connectMongoDB from "@/lib/mongodb";
import InternalApplicant from "@/models/internalApplicant";
import BaseApplicant from "@/models/BaseApplicant";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import { GENDER, UNIVERSITY, ACADEMICYEAR, FACULTY, DEGREE, AWARDS } from '@/app/constants/index';


const enumValues = <T extends Record<string, string>>(enumObject: T): [string, ...string[]] => {
    const values = Object.values(enumObject);
    return [values[0], ...values.slice(1)];
};

const internalApplicantSchema = z.object({
    Name: z.string().min(1),
    Gender: z.enum(enumValues(GENDER)),
    Email: z.string().email(),
    Whatsapp: z.string().min(9), 
    University: z.enum(enumValues(UNIVERSITY)),
    UniversityRegisterId: z.string().min(1),
    AcademicYear: z.enum(enumValues(ACADEMICYEAR)),
    Faculty: z.enum(enumValues(FACULTY)),
    Degree: z.enum(enumValues(DEGREE)),
    OtherDegree:z.string().optional(),
    IsPastParticipant: z.boolean(),
    Award1: z.enum(enumValues(AWARDS)),
    Award2: z.enum(enumValues(AWARDS)).optional(),
    Award3: z.enum(enumValues(AWARDS)).optional(), 
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validity = internalApplicantSchema.safeParse(body);

        if (!validity.success) {
            return NextResponse.json({ error: validity.error }, { status: 400 });
        }

        if(!(body.University==UNIVERSITY.SRI_JAYEWARDENEPURA)){
            return new NextResponse(JSON.stringify({ message: "You are not belongs to this form!"}), { status: 401 });            
        }

        if (!body.IsPastParticipant && body.Award3) {
            return new NextResponse(JSON.stringify({ message: "Only past year participants can apply for 3 awards" }), { status: 401 });
        }

        if (body.Award1==body.Award2) {
            return new NextResponse(JSON.stringify({ message: "Oops! You cannot select same award again!" }), { status: 401 });
        }

        if (body.Award1==body.Award3) {
            return new NextResponse(JSON.stringify({ message: "Oops! You cannot select same award again!" }), { status: 401 });
        }

        if (body.Award3==body.Award2 && body.Award2 != null ) {
            return new NextResponse(JSON.stringify({ message: "Oops! You cannot select same award again!" }), { status: 401 });
        }

        await connectMongoDB();

        const duplicateCheck = await InternalApplicant.find({Email:body.Email})

        if (duplicateCheck.length > 0) {
           return new NextResponse(JSON.stringify({ message: "Hmm... Please Check Email Address" }), { status: 409 });
       }

        // Create BaseApplicant
        const baseApplicant = new BaseApplicant({ University: body.University });
        await baseApplicant.save();

        // Retrieve the _id of the created BaseApplicant
        const baseApplicantId = baseApplicant._id;

        // Create InternalApplicant with BaseApplicantId
        const newApplicant = new InternalApplicant({
            ...body,
            ApplicantId: baseApplicantId // Add BaseApplicantId to InternalApplicant
        });

        // Save the InternalApplicant
        const savedApplicant = await newApplicant.save();

        // Update the DetilID of the BaseApplicant with the _id of the saved InternalApplicant
        await BaseApplicant.findByIdAndUpdate(baseApplicantId, { DetilID: savedApplicant._id });

        return new NextResponse(JSON.stringify({ message: "Applicant saved successfully" }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Error saving applicant" }), { status: 500 });
    }
}
