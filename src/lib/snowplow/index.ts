import { newTracker, enableActivityTracking, trackSelfDescribingEvent, trackPageView } from '@snowplow/browser-tracker';
import { FormTrackingPlugin, enableFormTracking } from '@snowplow/browser-plugin-form-tracking';
import { base64ToBytes } from '@/common/helpers';

const afterTrack = (payload: any) => {
  if (typeof window !== 'undefined' && payload.ue_px && payload.cx) {
    const eventBytes: Uint8Array = base64ToBytes(payload.ue_px);
    const contextBytes: Uint8Array = base64ToBytes(payload.cx);

    const eventString: string = new TextDecoder().decode(eventBytes);
    const contextString: string = new TextDecoder().decode(contextBytes);

    const event = JSON.parse(eventString);
    const context = JSON.parse(contextString);

    window.dispatchEvent(
      new CustomEvent('spEvent', {
        detail: { id: payload.eid, event, context },
      }),
    );
  }
};

/**
 * A tracker plugin that captures tracked events and dispatches them to the window.
 * This is used internally in the app to display the tracked events in the UI.
 * @returns {object} Plugin object.
 */
export default function CaptureTrackedEventsPlugin(): object {
  return {
    afterTrack,
  };
}

export {
  newTracker,
  trackPageView,
  enableActivityTracking,
  trackSelfDescribingEvent,
  FormTrackingPlugin,
  enableFormTracking,
};
