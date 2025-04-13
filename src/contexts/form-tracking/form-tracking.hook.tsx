import { useEffect } from 'react';
import { enableFormTracking } from '@/lib/snowplow';
import { FormTrackingEvent } from '@/lib/snowplow/events';

export default function useFormTracking(events?: FormTrackingEvent[]) {
  useEffect(() => {
    enableFormTracking({
      options: {
        events: events || [FormTrackingEvent.CHANGE_FORM, FormTrackingEvent.FOCUS_FORM, FormTrackingEvent.SUBMIT_FORM],
      },
    });
  }, []);
}
