export declare const DashboardServices: {
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
//# sourceMappingURL=dashboard-services.d.ts.map