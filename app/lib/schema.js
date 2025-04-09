import * as z from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Industry is required",
    }),
    subIndustry: z.string({
        required_error: "Specialization is required",
    }),
    bio: z.string().max(50).optional(),
    experience: z 
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
        z
           .number()
           .min(0,"Atleast 0 years of experience required")
           .max(50,"Maximum 100 years of experience allowed")
    ),

    skills: z.string().transform((val) => 
        val
          ? val 
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
          : undefined
    ),
});
