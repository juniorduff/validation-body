import {
  BaseHttpController,
  controller,  httpPost, interfaces, requestBody,
} from "inversify-express-utils";
import {validateBodyRequest} from "./middlewares/validation-body-request";
import {ValidationDto} from "./dto/validation.dto";

@controller("/api")
class ValidationController extends BaseHttpController  implements interfaces.Controller{
  constructor() {
    super();
  }
  @httpPost("/",validateBodyRequest(ValidationDto))
  public execute(
      @requestBody() body: ValidationDto
  ) {
    return this.json(body);
  }
}
export { ValidationController };
