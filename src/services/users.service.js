import AxiosConfig from "./axios";

class UserService extends AxiosConfig {
    constructor() {
        super("users"); 
    }

    async getUserById(id) {
        const response = await this.axios.get(`/${id}`); 
        return response.data;
    }

   
}

export default new UserService();
