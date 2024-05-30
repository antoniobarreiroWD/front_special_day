import AxiosConfig from "./axios";

class SpecialDayService extends AxiosConfig {
    constructor() {
        super("specialday");
    }

    async getAllSpecialDays() {
        const response = await this.axios.get("/list");
        return response.data;
    }

    async createSpecialDay(data) {
        const response = await this.axios.post("/create", data);
        return response.data;
    }

    async updateSpecialDay(id, data) {
        const response = await this.axios.put(`/edit/${id}`, data);
        return response.data;
    }
}

export default new SpecialDayService();