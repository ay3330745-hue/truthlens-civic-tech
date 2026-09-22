# TruthLens - Decision Points Documentation (`DECISIONS.md`)

**Track:** Track 2: Real-World AI Products  
**Brief:** TruthLens (Civic Tech)  
**Hackathon ID:** `Haridwar Team 58`  
**Team Members:** Arjun Yadav & Dheeraj Kumar Sharma  

---

## DP1 - Feed Order

### Decision Chosen:
Default sorting orders claims by **Risk Level (High Risk First)**, followed by **Recency (Newest First)**.

### Rationale (Why?):
In high-velocity misinformation environments (such as elections, public health emergencies, or financial panics), fact-checkers and newsrooms face an asymmetric volume of incoming posts. Sorting by automated risk score ensures that potentially viral, multi-flagged, high-harm claims are prioritized for human triage immediately rather than getting buried under low-risk or benign submissions. Users and journalists can still explicitly toggle pure recency or status-based filters when required.

---

## DP2 - Visibility

### Decision Chosen:
Unverified claims are **publicly visible immediately**, accompanied by prominent **"Unverified / Triage Pending"** visual warning indicators.

### Rationale (Why?):
Holding back unverified claims behind a gatekeeper review queue risks accusations of editorial censorship and prevents community crowdsourcing. By surfacing unverified claims with high-contrast warning badges, TruthLens maintains open transparency while clearly alerting citizens that the information has not yet undergone official verification. This enables rapid community flagging while preventing unverified panics.

---

## DP3 - Editing

### Decision Chosen:
Claims are **immutable after submission**. Post-submission editing is prohibited.

### Rationale (Why?):
Allowing post-submission edits introduces critical security and audit vulnerabilities where bad actors could submit a benign post, wait for reviewers to mark it as "Verified True", and subsequently alter the claim text to spread false narratives under a verified status badge. Immutability guarantees complete auditability; if a user wishes to modify a claim, they must submit a new claim which independently undergoes automated risk flagging and reviewer triage.
