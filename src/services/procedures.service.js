import AxiosConfig from "./axios";

class ProcedureService extends AxiosConfig {
    constructor() {
        super("procedures");
    }

    async getAllProcedures() {
        const response = await this.axios.get("/list");
        return response.data;
    }

    async createProcedure(data) {
        const response = await this.axios.post("/create", data);
        return response.data;
    }

    async updateProcedure(id, data) {
        const response = await this.axios.put(`/edit/${id}`, data);
        return response.data;
    }
}

export default new ProcedureService();
