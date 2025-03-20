import { CacheInstance } from "@/core/repositories/Repository";

const Environment = require("jest-environment-jsdom").default;
export default class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
    this.global.Response = Response;
    this.global.Request = Request;
    this.global.BroadcastChannel = BroadcastChannel;
    this.global.TransformStream = TransformStream;
  }
}
