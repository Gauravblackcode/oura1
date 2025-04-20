import {
  Event,
  EventCountDocument,
  EventDocument,
  EventsDocument,
  CreateEventDocument,
  DeleteEventDocument,
  UpdateEventDocument,
  CreateEventDto,
  UpdateEventDto,
  FiltersDto,
  SortDto,
  PaginationDto,
  EventResponse
} from 'types';
import GRAPHQL_CLIENT from '../network/graphql.service';

export class EventService {

  async getEvent(id: string): Promise<Event | null> {
    try {
      const { data } = await GRAPHQL_CLIENT.query({
        query: EventDocument,
        variables: { id }
      });
      return data.event;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }

  async getEventCount(filters?: FiltersDto): Promise<number> {
    try {
      const { data } = await GRAPHQL_CLIENT.query({
        query: EventCountDocument,
        variables: { filters }
      });
      return data.eventCount;
    } catch (error) {
      console.error('Error fetching event count:', error);
      return 0;
    }
  }

  async getEvents(
    filters?: FiltersDto,
    pagination?: PaginationDto,
    sort?: SortDto
  ): Promise<EventResponse | null> {
    try {
      const { data } = await GRAPHQL_CLIENT.query({
        query: EventsDocument,
        variables: { filters, pagination, sort }
      });
      return data.events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return null;
    }
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event | null> {
    try {
      const { data } = await GRAPHQL_CLIENT.mutate({
        mutation: CreateEventDocument,
        variables: { createEventDto }
      });
      return data?.createEvent || null;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const { data } = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteEventDocument,
        variables: { id }
      });
      return data?.deleteEvent || false;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event | null> {
    try {
      const { data } = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateEventDocument,
        variables: { id, updateEventDto }
      });
      return data?.updateEvent || null;
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  }
} 