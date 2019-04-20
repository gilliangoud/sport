import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get("")
  getRoot() {
    return 'ok';
  }

  @Get("healthz")
  gethealth() {
    return 'ok';
  }
}
