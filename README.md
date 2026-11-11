# AI Smart Student Mentor & Career Guidance Display
**Trialshopy Campus Innovation Assignment — Deadline: 13 November 2026**

This repository contains the complete implementation of the **AI Smart Student Mentor Display** kiosk system and companion application described in the Trialshopy project concept document.

---

## 🚀 Key Functional Modules Implemented

1. **Smart Kiosk Interface & Privacy Notice (`src/components/WelcomeConsent.tsx`)**
   - Touchscreen-optimized UI with proximity sensor status.
   - Transparent camera status indicator (passive detection only; biometric face ID strictly disabled per Section 14 & 15).
   - Dynamic English and Hindi language selector.
   - Explicit consent capture before retrieving any academic records.

2. **Student Authentication Engine (`src/components/Authentication.tsx`)**
   - **Campus Smartcard (RFID)** physical tap simulation.
   - **Student Mobile Companion QR Code** dynamic reader.
   - **University SSO / LDAP Login** fallback.

3. **Academic Intelligence & Deep Diagnostics (`src/components/AcademicDiagnosis.tsx`)**
   - Displays student profile, enrolled semester courses, attendance rates, and grade trends.
   - Explainable learning-gap indicators identifying specific bottlenecks (e.g. Data Structures Trees/Graphs deficit).

4. **Bilingual Voice AI Mentor Dialogue (`src/components/MentorConversation.tsx`)**
   - Full Speech-to-Text (STT) and Text-to-Speech (TTS) audio narration.
   - Grounded conversational flow replicating the exact dialogue sequence from Section 7 of the specification.
   - Adaptive study commitment and topic narrowing dialogue.

5. **Personalized 14-Day Roadmap Engine (`src/components/PersonalizedRoadmapView.tsx`)**
   - Structured daily activities, resources, and evidence-of-completion checkpoints.
   - Instant QR code modal for mobile transfer.

6. **Student Mobile Companion Simulator (`src/components/MobileCompanionView.tsx`)**
   - Mobile-viewport view of active roadmaps and task completion checkboxes.

7. **Progress Monitoring & Outcome Comparison (`src/components/ProgressReport.tsx`)**
   - Rigorous side-by-side comparison of baseline initial scores vs post-roadmap review assessments.
   - Clear distinction between verified academic data and self-reported activity.
   - One-click Faculty Mentor referral with custom note dispatch.

8. **Career & Placement Competency Module (`src/components/CareerPlacement.tsx`)**
   - Role frameworks for SDE, AI/ML, and Data Analytics pathways.
   - Readiness indicator and policy disclaimer (no false promises of placement or salary).

9. **Authorized Faculty & Admin Dashboard (`src/components/FacultyAdminDashboard.tsx`)**
   - Live hardware fleet telemetry (kiosk uptime, daily sessions, completion metrics).
   - Department-level bottleneck indicators.
   - Actionable Intervention Queue for faculty counsellors.

10. **Ethical Boundaries Demo (`src/components/PalmistryEntertainment.tsx`)**
    - Isolated entertainment module honoring Section 15 scope boundaries with required disclaimers.

---

## 🛠️ How to Run the Application

### Prerequisites
- Node.js (v18+)
- pnpm or npm

### Development Mode
```bash
npm run dev
# or
pnpm run dev
```
Open your browser at `http://localhost:3000` (or the port Vite outputs).

### Production Build
```bash
npx vite build
npx vite preview
```
All production bundle assets are built in the [`dist/`](file:///c:/Users/Deepmala%20singh/Student_mentor/dist) folder.
