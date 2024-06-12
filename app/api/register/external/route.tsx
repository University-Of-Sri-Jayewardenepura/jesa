import connectMongoDB from "@/lib/mongodb";
import ExternalApplicant from "@/models/externalApplicant";
import BaseApplicant from "@/models/BaseApplicant";
import { NextRequest, NextResponse } from "next/server";
import { UNIVERSITY,AWARDS,GENDER,ACADEMICYEAR} from '@/app/constants/index';
import z, { object } from 'zod';

const enumValues = <T extends Record<string, string>>(enumObject: T): [string, ...string[]] => {
    const values = Object.values(enumObject);
    return [values[0], ...values.slice(1)];
};

const schema = z.object({
    ApplicantId: z.string().optional(), // Assuming ApplicantId can be optional
    Name: z.string().min(1),
    NIC: z.string().min(9),
    Gender: z.enum(enumValues(GENDER)), // Use your GENDER enum directly
    Email: z.string().email(),
    Whatsapp: z.string().min(9),
    University: z.enum(enumValues(UNIVERSITY)), // Use your UNIVERSITY enum directly
    Faculty: z.string().min(1),
    UniversityRegisterId: z.string(),
    AcademicYear: z.enum(enumValues(ACADEMICYEAR)), // Use your ACADEMICYEAR enum directly
    Award: z.enum(enumValues(AWARDS)), //  your AWARDS enum directly
    WhichIndustry: z.string().min(1)
});



export async function POST(request: Request) {
    try {

        const body = await request.json();
        const validitity = schema.safeParse(body);

        if (!validitity.success) {
            return NextResponse.json({ error: validitity.error }, { status: 400 });
        }

        if(body.University==UNIVERSITY.SRI_JAYEWARDENEPURA){
            return new NextResponse(JSON.stringify({ message: "You are not Extenal Sudent"}), { status: 401 });            
        }

        if(!(body.Award==AWARDS.BEST_INNOVATOR)){
            return new NextResponse(JSON.stringify({ message: "You Extenal Sudent only can appliy to the Best Innovator Award"}), { status: 401 });            
        }

        await connectMongoDB();

        // Create BaseApplicant
        const baseApplicant = new BaseApplicant({ University: body.University });
        await baseApplicant.save();

        // Retrieve the _id of the created BaseApplicant
        const baseApplicantId = baseApplicant._id;

        // Create ExternalApplicant with BaseApplicantId
        const newApplicant = new ExternalApplicant({
            ...body,
            ApplicantId: baseApplicantId  // Add BaseApplicantId to ExternalApplicant
        });

        // Save the ExternalApplicant
        const savedApplicant = await newApplicant.save();
        
        // Update the DetilID of the BaseApplicant with the _id of the saved ExternalApplicant
        await BaseApplicant.findByIdAndUpdate(baseApplicantId, { DetilID: savedApplicant._id });
        
        return new NextResponse(JSON.stringify({ message: "Applicant saved successfully" }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Error saving applicant"}), { status: 500 });
    }
}



/* 
{
"Name": "Sonal Jayasinghe",
"Gender": "M",
 "Email": "sonaldanindulk@gmail.com",
 "Whatsapp": "0705589209",
 "University": "peradeniya",
 "UniversityRegisterId": "AS2021939",
 "AcademicYear": "1",
 "NIC": "200105600352",
 "Award": "Best Innovator",
 "WhichIndustry": "Paka Banwa"
}
*/