import { Controller, Get, Render } from "routing-controllers";
import { Service } from "typedi";

@Controller()
@Service()
export class HomeController {
  constructor() {}

  @Get("/")
  @Render("./routes/home/Home.hbs")
  serveHomePage() {
    return {};
  }
}
