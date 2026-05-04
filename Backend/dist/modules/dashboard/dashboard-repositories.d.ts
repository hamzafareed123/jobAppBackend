export declare const DashboardRepository: {
    getDashboardData(userId: string): Promise<{
        candidatesLastMonth: number;
        liveJobs: number;
        pipeline: {
            Applied: Number;
            Shortlisted: Number;
            Offered: Number;
            Hired: Number;
        };
    }>;
};
//# sourceMappingURL=dashboard-repositories.d.ts.map