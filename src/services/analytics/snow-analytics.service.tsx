import { BrowserTracker } from '@snowplow/browser-tracker';
import CaptureTrackedEventsPlugin, {
  FormTrackingPlugin,
  enableActivityTracking,
  newTracker,
  trackSelfDescribingEvent,
} from '@/lib/snowplow';
import { SNOWPLOW_EVENTS } from '@/lib/snowplow/events';
import environments from '@/common/environments';

export default class SnowAnalyticsService {
  static tracker: BrowserTracker;

  initializeTrackers = () => {
    if (!SnowAnalyticsService.tracker) {
      SnowAnalyticsService.tracker = newTracker(
        `${environments.SNOWPLOW_NAME_TRACKER}`,
        `${environments.SNOWPLOW_COLLECTOR_URL}`,
        {
          appId: `${environments.SNOWPLOW_APP_ID}`,
          plugins: [FormTrackingPlugin(), CaptureTrackedEventsPlugin()],
        },
      );
    }

    enableActivityTracking({
      minimumVisitLength: 15, // time period from page load before the first page ping occurs
      heartbeatDelay: 15, // number of seconds between each page ping
    });
  };

  /** 
    @param name 
    @param data
  * */
  static handleSelfDescribedEvents = (name: SNOWPLOW_EVENTS, data: any, version: string) => {
    trackSelfDescribingEvent({
      event: {
        schema: `${environments.SNOWPLOW_BASE_URL}${name}/jsonschema/${version}`,
        data,
      },
    });
  };
}
