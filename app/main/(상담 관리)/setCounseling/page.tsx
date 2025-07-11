'use client';

import { useEffect, useState } from 'react';

// 타입 정의
interface Counseling {
  id: number;
  studentName: string;
  topic: string;
  requestContent: string;
  createdAt: string;
  completed?: boolean;
  completedBy?: string;
  completedAt?: string;
  history?: { status: string; updatedAt: string }[];
  hidden?: boolean;
}

export default function CounselingAdminPage() {
  const [sessions, setSessions] = useState<Counseling[]>([]);
  const [selected, setSelected] = useState<Counseling | null>(null);
  const [teacher, setTeacher] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [desc, setDesc] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const dummy: Counseling[] = [
        {
          id: 1,
          studentName: '홍길동',
          topic: '진로 상담',
          requestContent: '의대 진학 관련해서 상담 받고 싶습니다.',
          createdAt: '2025-06-01T10:00:00Z',
        },
        {
          id: 2,
          studentName: '김철수',
          topic: '성적 상담',
          requestContent: '수학 성적이 계속 낮아져서 걱정됩니다.',
          completed: true,
          completedBy: '이선생님',
          completedAt: '2025-06-02T09:30:00Z',
          createdAt: '2025-06-01T12:00:00Z',
          history: [
            { status: '상담 완료', updatedAt: '2025-06-02T09:30:00Z' },
          ],
        },
      ];
      setSessions(dummy);
    };
    fetchSessions();
  }, []);

  const handleView = (s: Counseling) => {
    setSelected(s);
    setTeacher(s.completedBy || '');
  };

  const handleComplete = () => {
    if (!selected) return;
    const now = new Date().toISOString();
    const updatedList = sessions.map((s) =>
      s.id === selected.id
        ? {
            ...s,
            completed: true,
            completedBy: teacher,
            completedAt: now,
            history: [
              ...(s.history || []),
              { status: '상담 완료', updatedAt: now },
            ],
          }
        : s
    );
    setSessions(updatedList);
    setSelected({
      ...selected,
      completed: true,
      completedBy: teacher,
      completedAt: now,
      history: [
        ...(selected.history || []),
        { status: '상담 완료', updatedAt: now },
      ],
    });
  };

  const handleHide = (id: number) => {
    setSessions((list) =>
      list.map((s) => (s.id === id ? { ...s, hidden: true } : s))
    );
    if (selected?.id === id) setSelected(null);
  };

  const filtered = sessions
    .filter((s) => !s.hidden)
    .filter((s) =>
      filter === 'completed' ? s.completed : filter === 'pending' ? !s.completed : true
    )
    .filter(
      (s) =>
        s.studentName.toLowerCase().includes(search.toLowerCase()) ||
        s.topic.toLowerCase().includes(search.toLowerCase()) ||
        s.requestContent.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      desc
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <main className="min-h-screen bg-white p-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📅 상담 예약 관리</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="space-x-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>전체</button>
          <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>미완료</button>
          <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>완료</button>
        </div>
        <input
          type="text"
          placeholder="검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-64 shadow-sm"
        />
        <button onClick={() => setDesc(!desc)} className="text-sm text-gray-600 underline">
          {desc ? '최신순' : '오래된순'} 정렬
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border rounded-lg shadow-sm">
          <ul>
            {filtered.map((s) => (
              <li
                key={s.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selected?.id === s.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleView(s)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{s.topic} - {s.studentName}</h3>
                    <p className="text-sm text-gray-500">{new Date(s.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`text-sm font-medium ${s.completed ? 'text-green-600' : 'text-red-500'}`}>
                    {s.completed ? '완료' : '미완료'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          {selected ? (
            <div className="bg-gray-50 border rounded-lg shadow-sm p-4 space-y-4">
              <h2 className="text-xl font-bold">{selected.topic} - {selected.studentName}</h2>
              <p className="whitespace-pre-wrap text-gray-700">{selected.requestContent}</p>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="상담자 이름"
                className="border p-2 rounded w-full"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >상담 완료 처리</button>
                <button
                  onClick={() => handleHide(selected.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >숨기기</button>
              </div>
              {selected.history && selected.history.length > 0 && (
                <div>
                  <h3 className="font-semibold">상담 이력</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {selected.history.map((h, i) => (
                      <li key={i}>[{new Date(h.updatedAt).toLocaleString()}] {h.status}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">왼쪽에서 상담 요청을 선택하세요.</p>
          )}
        </section>
      </div>
    </main>
  );
}
