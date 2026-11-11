import { StudentProfile, PersonalizedRoadmap, FacultyInterventionQueue } from './types';

export const SAMPLE_STUDENT: StudentProfile = {
  id: 'STU-2024-8892',
  name: 'Aarav Sharma',
  rollNo: '21BCSE104',
  programme: 'Bachelor of Technology',
  branch: 'Computer Science and Engineering',
  semester: 5,
  cgpa: 7.64,
  email: 'aarav.sharma@campus.edu.in',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  subjects: [
    {
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      attendancePct: 82,
      internalAverage: 54, // Below average
      status: 'Needs Practice',
      learningGapReason: 'Recent Quiz 2 (Trees & BST) and Internal Assessment scores (52%) are significantly below historical performance (74%). Missing Graph lab submission.',
      focusTopics: ['Binary Trees', 'Tree Traversal', 'Graph Representation', 'BFS and DFS Algorithms'],
      assessments: [
        { id: 'a1', name: 'Quiz 1: Arrays & Linked Lists', type: 'Quiz', score: 18, maxScore: 20, date: '14 Aug 2026' },
        { id: 'a2', name: 'Quiz 2: Trees & BST', type: 'Quiz', score: 9, maxScore: 20, date: '18 Sep 2026' },
        { id: 'a3', name: 'Mid-Term Exam', type: 'Mid-Term', score: 52, maxScore: 100, date: '04 Oct 2026' },
        { id: 'a4', name: 'Lab 4: Graph BFS/DFS Implementation', type: 'Lab Assessment', score: 0, maxScore: 25, date: '28 Oct 2026' },
      ]
    },
    {
      code: 'CS302',
      name: 'Database Management Systems',
      attendancePct: 91,
      internalAverage: 78,
      status: 'Good',
      learningGapReason: 'Satisfactory mastery in SQL queries. Moderate gap in Transaction concurrency controls and indexing mechanisms.',
      focusTopics: ['Indexing (B+ Trees)', 'Concurrency Control (ACID)'],
      assessments: [
        { id: 'b1', name: 'Quiz 1: Relational Algebra & SQL', type: 'Quiz', score: 17, maxScore: 20, date: '20 Aug 2026' },
        { id: 'b2', name: 'Mid-Term Exam', type: 'Mid-Term', score: 78, maxScore: 100, date: '06 Oct 2026' },
      ]
    },
    {
      code: 'CS303',
      name: 'Operating Systems',
      attendancePct: 88,
      internalAverage: 82,
      status: 'Excellent',
      focusTopics: ['Virtual Memory', 'CPU Scheduling'],
      assessments: [
        { id: 'c1', name: 'Quiz 1: Process Synchronization', type: 'Quiz', score: 19, maxScore: 20, date: '22 Aug 2026' },
        { id: 'c2', name: 'Mid-Term Exam', type: 'Mid-Term', score: 84, maxScore: 100, date: '08 Oct 2026' },
      ]
    },
    {
      code: 'MA301',
      name: 'Discrete Mathematics & Graph Theory',
      attendancePct: 74,
      internalAverage: 58,
      status: 'Needs Practice',
      learningGapReason: 'Attendance threshold borderline (74%). Incomplete recurrence relations assignment.',
      focusTopics: ['Recurrence Relations', 'Spanning Trees', 'Pigeonhole Principle'],
      assessments: [
        { id: 'd1', name: 'Quiz 1: Combinatorics', type: 'Quiz', score: 12, maxScore: 20, date: '15 Sep 2026' },
        { id: 'd2', name: 'Mid-Term Exam', type: 'Mid-Term', score: 58, maxScore: 100, date: '10 Oct 2026' },
      ]
    }
  ],
  careerInterests: ['Software Development Engineer (SDE)', 'Full-Stack Developer'],
  skills: {
    'Programming (Python/C++)': 78,
    'Data Structures & Algorithms': 55,
    'Databases & SQL': 80,
    'System Design & Architecture': 45,
    'Aptitude & Logical Reasoning': 70,
  }
};

export const INITIAL_ROADMAP: PersonalizedRoadmap = {
  id: 'RDM-2026-1109',
  studentId: 'STU-2024-8892',
  prioritySubject: 'Data Structures and Algorithms',
  evidence: 'Recent Quiz 2 & Mid-Term scores are 22% below student baseline average. Lab assessment pending.',
  focusTopics: ['Binary Trees', 'Tree Traversal', 'Graph Representation', 'BFS and DFS'],
  durationDays: 14,
  dailyEffortMinutes: 60,
  createdDate: '11 Nov 2026',
  reviewDate: '25 Nov 2026',
  progressPercentage: 28,
  plan: [
    {
      id: 'step-1',
      dayRange: 'Days 1–3',
      title: 'Binary Tree Concepts & Terminology',
      description: 'Review node structure, height/depth calculations, full vs complete binary trees with video lecture notes.',
      estimatedMinutes: 60,
      learningResource: 'University LMS Module 4.1 + NPTEL DSA Lecture 18',
      evidenceOfCompletion: 'Short Concept Quiz: 5 questions (Achieved: 80%)',
      isCompleted: true,
      scoreOrQuizOutcome: 'Passed (4/5)'
    },
    {
      id: 'step-2',
      dayRange: 'Days 4–6',
      title: 'Preorder, Inorder & Postorder Traversals',
      description: 'Implement recursive & iterative traversals in C++/Java. Solve 3 classic leetcode problems.',
      estimatedMinutes: 60,
      learningResource: 'Campus CodeLab Exercise Pack #4 + VisualAlgo',
      evidenceOfCompletion: 'Submit traversal solutions to automated grader',
      isCompleted: true,
      scoreOrQuizOutcome: 'Verified: 3/3 Tests Passed'
    },
    {
      id: 'step-3',
      dayRange: 'Days 7–9',
      title: 'Graph Representations & Adjacency Structures',
      description: 'Adjacency Matrix vs Adjacency List tradeoffs, memory footprints and vertex degrees.',
      estimatedMinutes: 60,
      learningResource: 'Textbook Chapter 9 (CLRS) & Interactive Graph Sandbox',
      evidenceOfCompletion: 'Practice questions & memory complexity worksheet',
      isCompleted: false
    },
    {
      id: 'step-4',
      dayRange: 'Days 10–12',
      title: 'BFS & DFS with Dry Runs & Implementation',
      description: 'Queue-based BFS, Stack/Recursion DFS, cycle detection in undirected & directed graphs.',
      estimatedMinutes: 60,
      learningResource: 'Campus CodeLab Exercise Pack #5 (BFS/DFS Traversal)',
      evidenceOfCompletion: 'Topic-wise coding test (2 problems)',
      isCompleted: false
    },
    {
      id: 'step-5',
      dayRange: 'Days 13–14',
      title: 'Comprehensive Review, Mixed Questions & Reflection',
      description: 'Simulated 45-minute timed checkpoint assessment covering Trees & Graphs.',
      estimatedMinutes: 60,
      learningResource: 'Mid-Semester Diagnostic Review Pack',
      evidenceOfCompletion: 'Checkpoint Assessment & Student Self-Evaluation',
      isCompleted: false
    }
  ]
};

export const INITIAL_INTERVENTIONS: FacultyInterventionQueue[] = [
  {
    id: 'int-1',
    studentName: 'Aarav Sharma',
    rollNo: '21BCSE104',
    subject: 'Data Structures and Algorithms',
    issue: 'Consecutive scoring drops in Trees and Graphs module. Student generated 14-day recovery plan.',
    priority: 'Medium',
    timestamp: 'Today, 11:24 AM',
    status: 'Pending'
  },
  {
    id: 'int-2',
    studentName: 'Priya Patel',
    rollNo: '21BCSE088',
    subject: 'Discrete Mathematics',
    issue: 'Attendance below 68% combined with 40% mid-term score. Requires academic counselling referral.',
    priority: 'High',
    timestamp: 'Yesterday, 04:15 PM',
    status: 'Pending'
  },
  {
    id: 'int-3',
    studentName: 'Rohan Verma',
    rollNo: '21BCSE142',
    subject: 'Computer Networks',
    issue: 'Missed Packet Tracing Lab 3 & 4. Self-reported exam anxiety during kiosk dialogue.',
    priority: 'High',
    timestamp: '09 Nov 2026',
    status: 'Contacted'
  }
];
