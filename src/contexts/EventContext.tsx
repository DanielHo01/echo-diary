// Event Context

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, CreateEventInput, UpdateEventInput } from '@/types';
import { storageService } from '@/services/storage';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface EventContextType {
  events: Event[];
  todayEvents: Event[];
  addEvent: (input: CreateEventInput) => Event;
  updateEvent: (id: string, input: UpdateEventInput) => Event | null;
  deleteEvent: (id: string) => boolean;
  getEvent: (id: string) => Event | undefined;
  getEventsByDate: (date: string) => Event[];
  clearTodayEvents: () => void;
  isLoading: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const STORAGE_KEY = 'echo_events_v2';

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = storageService.getEvents<Event[]>([]);
    setEvents(storedEvents);
    setIsLoading(false);
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (!isLoading) {
      storageService.setEvents(events);
    }
  }, [events, isLoading]);

  // Get today's events
  const todayEvents = events.filter(event => 
    event.date === format(new Date(), 'yyyy-MM-dd')
  );

  // Add event
  const addEvent = (input: CreateEventInput): Event => {
    const now = new Date().toISOString();
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const newEvent: Event = {
      id: uuidv4(),
      timestamp: now,
      text: input.text,
      type: input.type || 'event',
      audioUrl: input.audioUrl,
      audioText: input.audioText,
      date: today,
      createdAt: now,
      updatedAt: now,
    };

    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  // Update event
  const updateEvent = (id: string, input: UpdateEventInput): Event | null => {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return null;

    const updatedEvent = {
      ...events[eventIndex],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    const newEvents = [...events];
    newEvents[eventIndex] = updatedEvent;
    setEvents(newEvents);

    return updatedEvent;
  };

  // Delete event
  const deleteEvent = (id: string): boolean => {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return false;

    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);

    return true;
  };

  // Get single event
  const getEvent = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  // Get events by date
  const getEventsByDate = (date: string): Event[] => {
    return events.filter(event => event.date === date);
  };

  // Clear today's events
  const clearTodayEvents = (): void => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newEvents = events.filter(event => event.date !== today);
    setEvents(newEvents);
  };

  const value: EventContextType = {
    events,
    todayEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEventsByDate,
    clearTodayEvents,
    isLoading,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

export default EventContext;
