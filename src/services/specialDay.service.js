
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

    async getUserSpecialDay() {
        try {
            const response = await this.axios.get("/user-specialday");
            return response.data;
        } catch (error) {
            throw new Error("Unable to fetch user special day");
        }
    }

    async addGuest(guest) {
        const response = await this.axios.post("/add-guest", guest);
        return response.data;
    }

    async addService(service) {
        const response = await this.axios.post("/add-service", service);
        return response.data;
    }
}

export default new SpecialDayService();
