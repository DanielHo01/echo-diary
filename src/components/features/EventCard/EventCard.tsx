// EventCard Component

import { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Event } from '@/types';
import { Card, Button, Input } from '@/components/ui';
import { Edit2, Trash2, Clock, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

interface EventCardProps {
  event: Event;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  isExpanded?: boolean;
  defaultExpanded?: boolean;
}

export function EventCard({
  event,
  onEdit,
  onDelete,
  isExpanded,
  defaultExpanded = false,
}: EventCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(event.text);

  const displayExpanded = isExpanded !== undefined ? isExpanded : expanded;

  const formatTime = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'HH:mm', { locale: zhCN });
    } catch {
      return '--:--';
    }
  };

  const handleSave = () => {
    if (editText.trim() && editText !== event.text) {
      onEdit(event.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(event.text);
    setIsEditing(false);
  };

  return (
    <Card
      className={clsx(
        'transition-all duration-200',
        displayExpanded && 'ring-2 ring-indigo-500/50'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Time */}
        <div className="flex-shrink-0 w-12 text-center">
          <div className="text-sm font-medium text-indigo-400">
            {formatTime(event.timestamp)}
          </div>
          <div className="text-xs text-gray-500">
            {format(new Date(event.timestamp), 'HH:mm', { locale: zhCN }) === formatTime(event.timestamp)
              ? '此刻'
              : ''}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="记录今天发生的事..."
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  保存
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-200 whitespace-pre-wrap">
                {event.text}
              </p>
              
              {/* Audio text */}
              {event.audioText && event.audioText !== event.text && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Volume2 className="w-4 h-4" />
                  <span>语音转文字：{event.audioText}</span>
                </div>
              )}

              {/* Interview count */}
              {event.interviewHistory && event.interviewHistory.length > 0 && (
                <div className="mt-2 text-sm text-indigo-400">
                  已回答 {event.interviewHistory.length} 个问题
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title={displayExpanded ? '收起' : '展开'}
          >
            {displayExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="编辑"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="删除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {displayExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                记录时间：{format(new Date(event.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
              </span>
            </div>
            {event.updatedAt && event.updatedAt !== event.createdAt && (
              <div className="mt-1">
                更新时间：{format(new Date(event.updatedAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export default EventCard;
