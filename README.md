Create a Confluence page in professional technical documentation format.

Topic: Regression Testing Framework for Data Pipelines (GCP)

Requirements:
- Use clear section headings (h1, h2, h3 style)
- Include tables where appropriate
- Keep tone professional, concise, and structured
- Format for readability (bullets, sections, spacing)
- Do NOT make it too verbose

Structure the document with the following sections:

1. Executive Summary
- Include a table with fields: Project Name, Objective, Scope, Approach, Target Environment, Duration

2. Problem Statement
- Explain challenges with current regression testing
- Include table of pain points vs impact

3. Solution Overview
- Describe regression approach using:
  Deploy → Seed Fixed Input → Run DAGs → Validate Output → Report Pass/Fail
- Highlight key capabilities

4. Architecture
- Describe high-level architecture in text (no images needed)
- Include flow from deployment to validation

5. Technology Stack
- Table of tools (Airflow, GCP, BigQuery, Terraform, etc.)

6. Component Design
- Regression Orchestrator
- Test Data Manager (must emphasize FIXED INPUT)
- Validation Engine (DAG, data, schema, Kafka, infra)

7. Scenario Coverage
- Table covering:
  File load
  Table transform
  Kafka
  Schema change
  Terraform change

8. Implementation Plan
- Phase 1 and Phase 2

9. Success Criteria
- Table of metrics

10. Risks & Mitigation
- Include at least 4 realistic risks

IMPORTANT:
- Focus on pipeline regression (NOT only schema validation)
- Mention Airflow DAG execution explicitly
- Mention fixed input and deterministic output
- Mention dedicated regression environment (UET)
- Avoid focusing only on Terraform or BigQuery

Output should be directly usable in Confluence.
