/**
 * Task list component with Tailwind CSS
 * Displays tenant-scoped tasks
 */
import { useTasks } from '../hooks/useTasks';

export function TaskList() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
