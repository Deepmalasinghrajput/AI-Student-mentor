export interface AssessmentRecord {
  id: string;
  name: string;
  type: 'Quiz' | 'Mid-Term' | 'Assignment' | 'Lab Assessment';
  score: number;
  maxScore: number;
  date: string;
}

export interface SubjectPerformance {
  code: string;
  name: string;
  attendancePct: number;
  internalAverage: number; // percentage
  status: 'Critical Attention' | 'Needs Practice' | 'Good' | 'Excellent';
  learningGapReason?: string;
  assessments: AssessmentRecord[];
  focusTopics: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  programme: string;
  branch: string;
  semester: number;
  cgpa: number;
  email: string;
  avatar: string;
  subjects: SubjectPerformance[];
  careerInterests: string[];
  skills: { [skillName: string]: number }; // percentage 0-100
}

export interface RoadmapActivity {
  id: string;
  dayRange: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  learningResource: string;
  evidenceOfCompletion: string;
  isCompleted: boolean;
  scoreOrQuizOutcome?: string;
}

export interface PersonalizedRoadmap {
  id: string;
  studentId: string;
  prioritySubject: string;
  evidence: string;
  focusTopics: string[];
  durationDays: number;
  dailyEffortMinutes: number;
  reviewDate: string;
  createdDate: string;
  plan: RoadmapActivity[];
  progressPercentage: number;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'student';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface FacultyInterventionQueue {
  id: string;
  studentName: string;
  rollNo: string;
  subject: string;
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
  status: 'Pending' | 'Contacted' | 'Resolved';
}

