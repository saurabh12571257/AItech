import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";
import { getIndustryInsights } from "@/actions/dashboard";

const IndustryInsightsPage = async () => {

    const {isOnboarded} = await getUserOnboardingStatus();
    if(!isOnboarded){
        redirect("/onboarding");
    }
    
    const insights = await getIndustryInsights();
    
    return (
        <div className="flex flex-col gap-5">
            <DashboardView insights={insights}/>
        </div>
    )
}

export default IndustryInsightsPage;