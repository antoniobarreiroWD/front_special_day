import AxiosConfig from "./axios";

class FinalReportService extends AxiosConfig {
    constructor() {
        super("finalReport");
    }
    
    async getAllFinalReports() {
        const response = await this.axios.get("/list"); 
        return response.data;
    }
    
    async getFinalReportById(id) {
        const response = await this.axios.get(`/${id}`); 
        return response.data;
    }
    
    async updateFinalReport(id, data) {
        const response = await this.axios.put(`/edit/${id}`, data); 
        return response.data;
    }
}

const finalReportService = new FinalReportService();

export default finalReportService;
