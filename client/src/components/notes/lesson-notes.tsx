import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StickyNote, Save, Trash2, Plus } from 'lucide-react';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface Note {
  id: string;
  content: string;
  timestamp?: string;
  lessonId: string;
  moduleId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface LessonNotesProps {
  lessonId: string;
  moduleId?: string;
}

export function LessonNotes({ lessonId, moduleId }: LessonNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const { toast } = useToast();

  // Fetch notes for this lesson
  const { data: notes = [], isLoading } = useQuery<Note[]>({
    queryKey: ['/api/lessons', lessonId, 'notes'],
    queryFn: async () => {
      const response = await fetch(`/api/lessons/${lessonId}/notes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    }
  });

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest('POST', '/api/notes', {
        content,
        lessonId,
        moduleId,
        timestamp: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lessons', lessonId, 'notes'] });
      setNewNoteContent('');
      setIsEditing(false);
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      return apiRequest('PUT', `/api/notes/${id}`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lessons', lessonId, 'notes'] });
      setEditingNoteId(null);
      setEditingContent('');
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lessons', lessonId, 'notes'] });
      toast({
        title: "Note deleted",
        description: "Your note has been deleted."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSaveNote = () => {
    if (newNoteContent.trim()) {
      createNoteMutation.mutate(newNoteContent);
    }
  };

  const handleUpdateNote = (id: string) => {
    if (editingContent.trim()) {
      updateNoteMutation.mutate({ id, content: editingContent });
    }
  };

  const startEditingNote = (note: Note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            My Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading notes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            My Notes
          </CardTitle>
          {!isEditing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              data-testid="button-add-note"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Note
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="mb-4 space-y-2">
            <Textarea
              placeholder="Type your note here..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="min-h-[100px]"
              data-testid="input-note-content"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSaveNote}
                disabled={!newNoteContent.trim() || createNoteMutation.isPending}
                data-testid="button-save-note"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Note
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setNewNoteContent('');
                }}
                data-testid="button-cancel-note"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {notes.length === 0 && !isEditing ? (
          <p className="text-muted-foreground">
            No notes yet. Click "Add Note" to create your first note for this lesson.
          </p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border rounded-lg p-3 space-y-2"
                  data-testid={`note-item-${note.id}`}
                >
                  {editingNoteId === note.id ? (
                    <>
                      <Textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="min-h-[80px]"
                        data-testid={`input-edit-note-${note.id}`}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateNote(note.id)}
                          disabled={!editingContent.trim() || updateNoteMutation.isPending}
                          data-testid={`button-save-edit-${note.id}`}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingNoteId(null);
                            setEditingContent('');
                          }}
                          data-testid={`button-cancel-edit-${note.id}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditingNote(note)}
                            data-testid={`button-edit-note-${note.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNoteMutation.mutate(note.id)}
                            disabled={deleteNoteMutation.isPending}
                            data-testid={`button-delete-note-${note.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}