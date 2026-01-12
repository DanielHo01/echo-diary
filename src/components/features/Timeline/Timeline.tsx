// Timeline Component

import { Event } from '@/types';
import { EventCard } from '../EventCard';

interface TimelineProps {
  events: Event[];
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
  showDate?: boolean;
}

export function Timeline({
  events,
  onEdit,
  onDelete,
  emptyMessage = '今天还没有记录任何事件',
  showDate = false,
}: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-gray-400">{emptyMessage}</p>
        <p className="text-sm text-gray-500 mt-2">
          点击下方按钮开始记录今天的第一个事件
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline line */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-700" />

        {/* Events */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="relative pl-14">
              {/* Timeline dot */}
              <div
                className={`
                  absolute left-4 top-4 w-4 h-4 rounded-full border-2 transform -translate-x-1/2
                  ${index === 0 ? 'bg-indigo-500 border-indigo-500' : 'bg-gray-800 border-gray-600'}
                  z-10
                `}
              />

              <EventCard
                event={event}
                onEdit={onEdit}
                onDelete={onDelete}
                defaultExpanded={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
