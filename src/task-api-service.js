import ApiService from "./framework/view/api-service";

const Method = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

export default class TaskApiService extends ApiService {
  get tasks() {
    return this_load({ url: "tasks" }).then(ApiService.parseResponse);
  }
}
