import { ShortlinkApiPort } from "./ports/shortlinks-port";
import { InMemoryShortlinkApi, RestShortlinkApi } from "./services/shortlink-service";


export const shortlinkApi: ShortlinkApiPort = new RestShortlinkApi();