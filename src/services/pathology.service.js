import AxiosConfig from "./axios";

class PathologyService extends AxiosConfig {
    constructor() {
        super("pathology") 
    }
    
    async getAllPathologies() {
        const response = await this.axios.get("/list"); 
        return response.data;
    }

    async getPathologyById(id) {
        const response = await this.axios.get(`/${id}`); 
        return response.data;
    }
    
    
    async updatePathology(id, data) {
        const response = await this.axios.put(`/edit/${id}`, data); 
        return response.data;
    }
    }

export default new PathologyService();