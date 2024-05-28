import AxiosConfig from "./axios";

class ProfileService extends AxiosConfig {
    constructor() {
        super("users");
    }

    async getProfileById(id) {
        const response = await this.axios.get(`/${id}`);
        return response.data;
    }

    async updateProfile(id, data) {
        const response = await this.axios.put(`/${id}`, data);
        return response.data;
    }
}

export default new ProfileService();
