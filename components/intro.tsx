import { zodiak } from "@/app/fonts";
import TextReveal from "@/components/animated/text-reveal";
import { ChevronsDown } from "lucide-react";

export async function Intro() {
  return (
    <div className="z-10 flex min-h-[12rem] items-center justify-center flex-col pt-[5rem]">
      <h1
        className={`text-3xl md:text-5xl lg:text-6xl text-primary text-center font-bold ${zodiak.className}`}
      >
        What is JESA?
        <span className="hidden md:flex justify-center mt-10">
          <ChevronsDown className="animate-bounce" />
        </span>
      </h1>
      <p className="flex md:hidden text-center text-sm text-white/70 leading-6 [&:not(:first-child)]:mt-6 pb-6 ">
        JESA is the most prestigious event organized by the career skills
        development society, celebrating the exceptional achievements of
        outstanding undergraduates who have excelled academically and in
        extracurricular activities. jesa continues its tradition of honoring
        these remarkable individuals with fourteen prestigious awards,
        recognizing their dedication and mastery over the years. our mission at
        the career skills development society is to cultivate a generation of
        highly skilled, competent, and employable graduates by acknowledging and
        celebrating their extraordinary accomplishments, we believe that
        recognition is the ultimate encouragement for hard workers. JESA aspires
        to inspire and motivate undergraduates to strive for excellence in all
        their endeavors.
      </p>
      <TextReveal
        className="hidden md:flex mt-[-3rem] "
        text="JESA is the most prestigious event organized by the career skills development society, celebrating the exceptional achievements of outstanding undergraduates who have excelled academically and in extracurricular activities. jesa continues its tradition of honoring these remarkable individuals with fourteen prestigious awards, recognizing their dedication and mastery over the years. our mission at the career skills development society is to cultivate a generation of highly skilled, competent, and employable graduates by acknowledging and celebrating their extraordinary accomplishments, we believe that recognition is the ultimate encouragement for hard workers. JESA aspires to inspire and motivate undergraduates to strive for excellence in all their endeavors."
      />
    </div>
  );
}
