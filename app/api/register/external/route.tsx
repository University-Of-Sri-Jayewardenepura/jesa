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
    Name: z.string().min(1),
    NIC: z.string().min(9),
    Gender: z.enum(enumValues(GENDER)),
    Email: z.string().email(),
    Whatsapp: z.string().min(9),
    University: z.enum(enumValues(UNIVERSITY)),
    Faculty: z.string().min(1),
    UniversityRegisterId: z.string(),
    AcademicYear: z.enum(enumValues(ACADEMICYEAR)),
    Award: z.enum(enumValues(AWARDS)).default(AWARDS.BEST_INNOVATOR),
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
            return new NextResponse(JSON.stringify({ message: "Hmm... Are you from University of Sri Jayewardenepura"}), { status: 401 });            
        }

        if(!(body.Award==AWARDS.BEST_INNOVATOR)){
            return new NextResponse(JSON.stringify({ message: "Sorry! You are only eligible for Best Innovator."}), { status: 401 });            
        }

        await connectMongoDB();

         const duplicateCheck = await ExternalApplicant.find({Email:body.Email})

         if (duplicateCheck.length > 0) {
            return new NextResponse(JSON.stringify({ message: "Hmm... Please Check Email Address" }), { status: 409 });
        }

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
        return new NextResponse(JSON.stringify({ message: "Sorry! We are unabled to save your form."}), { status: 500 });
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