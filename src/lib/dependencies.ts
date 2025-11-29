
import { ShortlinkApiPort } from "./ports/shortlinks-port";
import { InMemoryShortlinkApi, RestShortlinkApi } from "./services/shortlink-service";
import { AnalyticsApiPort } from "./ports/analytics-port";
import { RestAnalyticsApi } from "./services/analytics-service";

export const shortlinkApi: ShortlinkApiPort = new RestShortlinkApi();
export const analyticsApi: AnalyticsApiPort = new RestAnalyticsApi();