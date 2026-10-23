import React, { useState, useEffect } from 'react';

interface Habit {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
}

type Mood = '🚀' | '🔥' | '☕' | '😴' | '🤯';

export const SuperDashboardWidget: React.FC = () => {
  const [mood, setMood] = useState<Mood>('🚀');
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('super_habits');
    return saved
      ? JSON.parse(saved)
      : [
          { id: '1', title: 'Vypít 2 litry vody', completed: true, streak: 5 },
          { id: '2', title: 'Commit do gitu', completed: false, streak: 12 },
          { id: '3', title: '30 minut pohybu', completed: false, streak: 2 },
        ];
  });
  const [newHabitTitle, setNewHabitTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('super_habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id === id) {
          const nextState = !habit.completed;
          return {
            ...habit,
            completed: nextState,
            streak: nextState ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title: newHabitTitle.trim(),
      completed: false,
      streak: 0,
    };

    setHabits(prev => [...prev, newHabit]);
    setNewHabitTitle('');
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progressPercent = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div
      style={{
        maxWidth: '440px',
        margin: '2rem auto',
        padding: '1.5rem',
        borderRadius: '1.25rem',
        background: 'linear-gradient(145deg, #1e1e2f, #161622)',
        color: '#f8fafc',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Hlavička a výběr nálady */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
            Denní mise ✨
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Jak se dnes cítíš?</span>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {(['🚀', '🔥', '☕', '😴', '🤯'] as Mood[]).map(m => (
            <button
              key={m}
              onClick={() => setMood(m)}
              style={{
                border: 'none',
                background: mood === m ? '#3b82f6' : '#2d2d42',
                borderRadius: '0.5rem',
                padding: '0.35rem 0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.15s ease',
                transform: mood === m ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1' }}>
          <span>Postup dneška</span>
          <span style={{ fontWeight: 600 }}>{progressPercent}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#2d2d42', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #3b82f6)',
              borderRadius: '999px',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      </div>

      {/* Seznam položek */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {habits.map(habit => (
          <li
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              background: habit.completed ? 'rgba(59, 130, 246, 0.1)' : '#262638',
              border: `1px solid ${habit.completed ? '#3b82f6' : '#33334a'}`,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => {}} // řízeno klikem na li
                style={{ width: '1.1rem', height: '1.1rem', accentColor: '#3b82f6', cursor: 'pointer' }}
              />
              <span
                style={{
                  fontSize: '0.95rem',
                  textDecoration: habit.completed ? 'line-through' : 'none',
                  color: habit.completed ? '#64748b' : '#f8fafc',
                }}
              >
                {habit.title}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
              🔥 {habit.streak}
            </span>
          </li>
        ))}
      </ul>

      {/* Formulář pro přidání */}
      <form onSubmit={addHabit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={newHabitTitle}
          onChange={e => setNewHabitTitle(e.target.value)}
          placeholder="Nový cíl..."
          style={{
            flex: 1,
            padding: '0.6rem 0.85rem',
            borderRadius: '0.5rem',
            border: '1px solid #3b3b54',
            background: '#161622',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#6366f1',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Přidat
        </button>
      </form>
    </div>
  );
};

export default SuperDashboardWidget;