"use client"
import { industries } from "@/data/industries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const OnboardingForm = ({industries}) => {

    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const router = useRouter();

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(onboardingSchema)
    })

    const onSubmit = (values) => {
        console.log(values);
    }

    const watchIndustry = watch("industry");
    
    return (
        <div className="flex items-center justify-center bg-background">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader>
                    <CardTitle className= "ready-to-get-started-title text-4xl ">
                        Complete your profile
                    </CardTitle>
                    <CardDescription>
                        Select your industry to get personalized insights and recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                                <Select onValueChange={(value) => {
                                    setValue("industry", value);
                                    setSelectedIndustry(
                                        industries.find((ind) => ind.id === value)
                                    );
                                    setValue("subIndustry", "");
                                }}>
                                <SelectTrigger className="w-full" id="industry">
                                    <SelectValue placeholder="Select an industry" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                        {industries.map((ind) => {
                                            return(
                                            <SelectItem key={ind.id} value={ind.id}>
                                                {ind.name}
                                            </SelectItem>
                                        );
                                        })}
                                </SelectContent>
                            </Select>
                            {errors.industry && (
                                <p className="text-sm text-red-500">
                                    {errors.industry.message}
                                </p>
                            )}
                            </div>

                        { watchIndustry && ( 
                            <div className="space-y-2">
                            <Label htmlFor="subIndustry">Specialization</Label>
                            <Select onValueChange={(value) => {
                                setValue("subIndustry", value);}}>
                                <SelectTrigger className="w-full" id="industry">
                                    <SelectValue placeholder="Select sub industry" />
                                </SelectTrigger>
                                <SelectContent>
                                        {selectedIndustry?.subIndustries.map((ind) => {
                                            return(
                                                <SelectItem key={ind} value={ind}>
                                                    {ind}
                                                </SelectItem>
                                            );
                                        })}
                                </SelectContent>
                            </Select>
                            {errors.subIndustry && (
                                <p className="text-sm text-red-500">
                                    {errors.subIndustry.message}
                                </p>
                            )}
                        </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Input 
                            type="number" 
                            min={0} max={50} 
                            id="experience" 
                            placeholder="Enter your experience"
                            {...register("experience")} 
                            />
                             
                            {errors.experience && (
                                <p className="text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills</Label>
                            <Input 
                            type="text" 
                            id="skills" 
                            placeholder="Enter your skills"
                            {...register("skills")}  
                            />
                            <p className="text-sm text-gray-500">
                                Enter your skills separated by commas
                            </p>
                             
                            {errors.skills && (
                                <p className="text-sm text-red-500">
                                    {errors.skills.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio"> Professional Bio</Label>
                            <Textarea
                            className="h-32"
                            id="bio" 
                            placeholder="Enter your professional bio"
                            {...register("bio")}  
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-500">
                                    {errors.bio.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Continue
                        </Button>

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
    
export default OnboardingForm