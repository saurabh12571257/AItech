"use client";

import React from 'react';
import { TrendingUp, TrendingDown, LineChart, Briefcase, Brain, Badge } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle, Bar } from 'recharts';


const DashboardView = ({insights}) => {

    const salaryData = insights.salaryRanges.map((range) => ({ 
        name : range.role,
        min: range.min/1000,
        max: range.max/1000,
        median: range.median/1000,
    }));

    const getDemandLevelColor = (level) => {
        switch(level.toLowerCase()){
            case "low":
                return "bg-red-500";
            case "medium":
                return "bg-yellow-500";
            case "high":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    const getMarketOutlookInfo = (outlook) => {
        switch(outlook.toLowerCase()){
            case "positive":
                return {icon: TrendingUp, color: "bg-red-500"};
            case "neutral":
                return {icon: LineChart, color: "bg-yellow-500"};
            case "negative":
                return {icon: TrendingDown, color: "bg-green-500"};
            default:
                return {icon: LineChart, color: "bg-gray-500"};
        }
    };

    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const OutlookColor = getMarketOutlookInfo(insights.marketOutlook).color;



    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* #1 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Market Outlook
                    </CardTitle>
                    <OutlookIcon className={`h-4 w-4 ${OutlookColor}` } />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{insights.marketOutlook}</div>
                </CardContent>
            </Card>

            {/* #2 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Industry Growth
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)} %</div>
                    <Progress value={insights.growthRate} className="mt-2" />
                </CardContent>
            </Card>

            {/* #3 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Demand Level
                    </CardTitle>
                    <Briefcase className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{insights.demandLevel}</div>
                    <div className={`h-2 w-full mt-2 rounded-full ${getDemandLevelColor(insights.demandLevel)}`} />
                </CardContent>
            </Card>

            {/* #4 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Top Skills
                    </CardTitle>
                    <Brain className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-1">
                            {insights.topSkills.join(", ")}
                    </div>
                </CardContent>
            </Card>
            </div>

            {/* #5 */}
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">
                    Salary Ranges by Role
                    </CardTitle>
                    <CardDescription > 
                        minimum, maximum, and median salaries (in thousands) for each role.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default DashboardView;