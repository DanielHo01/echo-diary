// Home Page

import { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useEvents } from '@/contexts';
import { Timeline } from '@/components/features/Timeline';
import { Button, Input } from '@/components/ui';
import { Plus, Calendar, Sparkles, BookOpen } from 'lucide-react';

export function Home() {
  const { todayEvents, addEvent, updateEvent, deleteEvent, isLoading } = useEvents();
  const [newEventText, setNewEventText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEvent = () => {
    if (newEventText.trim()) {
      addEvent({ text: newEventText.trim() });
      setNewEventText('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleAddEvent();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">回响 Echo Diary</h1>
              <p className="text-sm text-gray-400">
                {format(new Date(), 'yyyy年MM月dd日 EEEE', { locale: zhCN })}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                日记
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                历史
              </Button>
            </div>
          </div>

          {/* Today's summary */}
          {todayEvents.length > 0 && (
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="text-gray-400">
                今日已记录 <span className="text-indigo-400 font-medium">{todayEvents.length}</span> 个事件
              </span>
              {todayEvents.some(e => e.interviewHistory && e.interviewHistory.length > 0) && (
                <span className="text-gray-400">
                  •{' '}
                  <span className="text-green-400 font-medium">已采访</span>
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Add event section */}
        <div className="mb-8">
          {isAdding ? (
            <div className="bg-gray-800 rounded-xl p-4 space-y-4">
              <Input
                value={newEventText}
                onChange={(e) => setNewEventText(e.target.value)}
                placeholder="今天发生了什么？"
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button onClick={handleAddEvent} disabled={!newEventText.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加事件
                </Button>
                <Button variant="ghost" onClick={() => setIsAdding(false)}>
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full py-4"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              添加今天的事件
            </Button>
          )}
        </div>

        {/* Timeline */}
        <Timeline
          events={todayEvents}
          onEdit={(id, text) => updateEvent(id, { text })}
          onDelete={deleteEvent}
          emptyMessage="今天还没有记录任何事件"
        />

        {/* AI Interview CTA */}
        {todayEvents.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-300 font-medium">AI 采访</span>
            </div>
            <p className="text-gray-300 mb-4">
              基于今天记录的 {todayEvents.length} 个事件，AI 将帮你深入挖掘记忆
            </p>
            <Button>
              开始 AI 采访
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
