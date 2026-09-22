# 🛡️ TruthLens — Misinformation Triage Platform

> **Track Name:** Track 2: Real-World AI Products  
> **Brief Selected:** TruthLens (Civic Tech)  
> **Hackathon Team ID:** `AZISTDD368` (Haridwar Team 58)  
> **Team Members:** Arjun Yadav & Dheeraj Kumar Sharma  
> **Standard API Status:** Implemented (`/api/claims`, `/api/claims/:id`, `/api/claims/:id/review`, `/api/decisions`, `/api/health`)

---

## 📌 Executive Summary

**TruthLens** is an automated, neutral-by-design civic tech platform built to triage viral social media misinformation at speed. Social media moves faster than fact-checkers can publish. TruthLens acts as the front-line triage engine for newsrooms and citizen journalism groups, scoring viral claims for automated risk flags before routing them to human reviewers.

---

## 🏆 Hackathon ID & Compliance

- **Hackathon Team ID:** `AZISTDD368`
- **Team Name:** Haridwar Team 58
- **Team Members:** Arjun Yadav & Dheeraj Kumar Sharma
- **Track Name:** Track 2: Real-World AI Products
- **Authentication:** **No login/signup required** per brief guidelines. Graders and browser agents have full unrestricted access to submit claims, triage risk flags, and review content.

---

## ✨ 5 Required Features

1. **Submit a Claim**
   - Text input of the viral post.
   - Source Platform selection (`WhatsApp`, `X`, `Instagram`, `Facebook`, `Telegram`, `Other`).
   - Category selection (`Politics`, `Health`, `Finance`, `Other`).
   - Source link input field with live validation.

2. **Automated Risk Flags Engine**
   - **Sensational:** Triggered by sensational keywords (`breaking`, `shocking`, `share before deleted`, `must watch`, `unbelievable`, `viral`, `secret revealed`, etc.).
   - **Shouting:** Triggered when `>50%` of alphabetic characters in the post are UPPERCASE.
   - **Unsourced:** Triggered when no valid source URL is provided.
   - **High Risk:** Automatically assigned when a claim triggers **2 or more risk flags**.

3. **Review Workflow**
   - Reviewers move claims from status `Unverified` to `Verified True`, `Verified False`, or `Misleading`.
   - Requires a reviewer note outlining fact-checking rationale.

4. **Public Feed**
   - Displays all claims with status badges (`Unverified`, `Verified True`, `Verified False`, `Misleading`) and risk flags (`Sensational`, `Shouting`, `Unsourced`, `High Risk`).
   - Filterable by **Category** (`Politics`, `Health`, `Finance`, `Other`) and **Status**.
   - Sortable by **Risk Level** (High Risk first) or **Recency**.

5. **Detail View**
   - Comprehensive modal view displaying full claim text, platform source, automated flag triggers with explanations, reviewer notes, and timestamp.

---

## 🎯 Decision Points Summary (`DECISIONS.md`)

| Decision Point | Selection | Justification Rationale |
| :--- | :--- | :--- |
| **DP1 - Feed Order** | **High Risk First + Recency** | Default ordering prioritizes high-harm, multi-flagged viral posts for immediate fact-checker attention. |
| **DP2 - Visibility** | **Publicly Visible with Badges** | Unverified claims are immediately visible with high-contrast warning badges to ensure transparency without censorship. |
| **DP3 - Editing** | **Immutable Post-Submission** | Claims are locked after submission to prevent bad actors from modifying text post-verification. |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, CORS, Jest, Supertest
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React Icons
- **Storage:** In-memory store pre-seeded with realistic viral social media claims (`server/data/seedData.json`)

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Install root dependencies
npm install

# Install server & client dependencies
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Run Local Development Server
```bash
# Starts both Express API Backend (Port 5000) and React Vite Frontend (Port 5173)
npm run dev
```

- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/claims](http://localhost:5000/api/claims)

### 3. Run Automated Tests
```bash
npm test
```

---

## 📡 REST API Specifications

| Endpoint | Method | Description | Sample Query / Body |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check endpoint | Returns `{ status: "ok", hackathonId: "AZISTDD368" }` |
| `/api/decisions` | `GET` | Fetch DP1, DP2, DP3 choices | Returns structured decision point metadata |
| `/api/claims` | `GET` | Fetch public feed claims | Query: `?category=Politics&status=Unverified&sort=risk` |
| `/api/claims` | `POST` | Submit new viral claim | Body: `{ text, platform, category, sourceLink }` |
| `/api/claims/:id` | `GET` | Fetch single claim details | Params: `id` |
| `/api/claims/:id/review` | `PATCH` | Update verification verdict | Body: `{ status: "Verified True", reviewerNote: "Verified source" }` |

---

## 📁 Repository Structure

```
Truthlens/
├── README.md                      # Comprehensive Hackathon README
├── DECISIONS.md                   # Detailed DP1, DP2, DP3 rationale
├── package.json                   # Root monorepo scripts
├── .gitignore                     # Excludes node_modules & build artifacts
├── server/                        # Express API Backend
│   ├── index.js                   # Entry point
│   ├── routes/                    # API endpoints
│   ├── services/                  # Automated Risk Flags Engine
│   └── tests/                     # Jest Unit & Integration Test Suite
└── client/                        # React + Vite + Tailwind CSS Frontend
    ├── src/                       # Components, Services & App layout
    └── vite.config.js             # Vite configuration & API Proxy
```