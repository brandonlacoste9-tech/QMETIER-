/**
 * Custom hook for task operations
 * Demonstrates tenant-aware API calls
 */
import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
  tenantId: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Token includes tenant context - backend extracts it
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/v1/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, description: string) => {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch('/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    return newTask;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    refetch: fetchTasks
  };
}
