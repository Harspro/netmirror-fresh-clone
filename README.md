🚀 High-Level Design: Regression Testing Framework for Data Pipelines (GCP)
Table of Contents
Executive Summary
Problem Statement
Solution Overview
Architecture
Technology Stack
Component Specifications
Security & Access Control
Implementation Plan
Success Criteria
Risks & Mitigations
Appendix
1. Executive Summary
Field	Details
Project Name	Terminus Data Platform – Pipeline Regression Framework
Objective	Automated regression testing of data pipelines after code, Terraform, and schema changes
Scope	GCP data platform (Airflow, BigQuery, GCS, Dataproc, Kafka, Terraform)
Approach	Fixed-input regression testing in a dedicated UET environment
Target Environment	UET (reserved for regression execution)
Estimated Duration	4 weeks (POC scope)
Overview

A platform-native regression testing framework that:

Executes Airflow DAGs in a dedicated regression environment
Uses fixed mock input data
Automatically determines pass/fail
Validates outputs across:
data pipelines
schema
infrastructure (Terraform)
messaging systems (Kafka)
Design Principles
Environment-Based Regression → Not purely CI/CD
Fixed Input / Deterministic Output
Pipeline-Centric (not just schema)
Scenario-Driven Validation
Lightweight & Extensible
2. Problem Statement

The Terminus data platform runs 1000+ Airflow DAGs across multiple services.

Key Challenges
Pain Point	Impact
No automated regression after shared changes	Manual testing of hundreds of pipelines
CI/CD not representative of real environment	False confidence in deployments
Data inputs constantly changing	Impossible to compare outputs
Schema & infra changes break pipelines silently	Late detection in production
Multiple pipeline types (files, tables, Kafka)	No unified validation approach
Core Problem

There is no scalable way to validate that pipelines still behave correctly after changes.

3. Solution Overview
Core Idea

Run pipelines in a dedicated environment with fixed input and verify outputs automatically.

Regression Model
Deploy Changes → Seed Fixed Input → Run DAGs → Validate Output → Report Pass/Fail
Key Capabilities
Trigger regression after:
Airflow DAG changes
Terraform changes
Spark/Dataproc changes
Schema updates
Execute:
All impacted DAGs (or selected subset)
Validate:
DAG execution success
Output consistency (row count, aggregates, hash)
Schema consistency
Kafka/message outputs
Infra readiness
4. Architecture
4.1 High-Level Architecture
┌───────────────────────────────┐
│   Code / Terraform Changes    │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Deploy to UET (Regression Env)│
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Regression Orchestrator       │
│ (Cloud Run / Airflow DAG)     │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Seed Fixed Test Inputs        │
│ (GCS / BigQuery / Kafka)      │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Trigger Airflow DAGs          │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Validation Engine             │
│ - DAG status                  │
│ - Data checks                 │
│ - Schema compare              │
│ - Kafka validation            │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│ Results & Reporting           │
│ (BigQuery + Slack)            │
└───────────────────────────────┘
4.2 Data Organization (GCS)
gs://regression-data/
│
├── inputs/           # FIXED mock inputs
├── baselines/        # Expected outputs
├── outputs/          # Run results
└── reports/
5. Technology Stack
Layer	Technology
Orchestration	Airflow / Cloud Run
Compute	Cloud Run Job
Storage	GCS + BigQuery
Data Processing	BigQuery / Dataproc
Messaging	Kafka / PubSub
IaC	Terraform
Language	Python
Alerts	Slack
6. Component Specifications
6.1 Regression Orchestrator

Responsible for:

selecting DAGs
seeding inputs
triggering runs
executing validations
Execution Flow
for test_case in test_suite:
    seed_inputs()
    trigger_dag()
    wait_for_completion()
    run_validations()
    record_results()
6.2 Test Data Manager (IMPORTANT FIX)
Approach: Fixed Inputs

Unlike dynamic sampling, regression uses:

static files in GCS
fixed BigQuery seed tables
predefined Kafka messages
Example
gs://regression-data/inputs/customer_master.csv
Why Fixed?
Ensures deterministic output
Enables true regression comparison
Avoids false failures
6.3 Validation Engine
Validation Types
1. DAG Execution
success/failure
runtime errors
2. Data Validation
row count
aggregates
checksum/hash
3. Schema Validation
compare schema JSON
detect breaking changes
4. Kafka Validation
message count
payload consistency
5. Infra Validation
resources exist
dependencies accessible
6.4 Hash-Based Validation

Instead of field-by-field checks:

SELECT TO_HEX(MD5(STRING_AGG(row_hash ORDER BY row_hash)))
FROM (
  SELECT TO_HEX(MD5(CONCAT(col1, col2, col3))) as row_hash
)
6.5 Schema Comparator (Reused from your design ✅)

Used as:

one validation type (not core framework)
6.6 Output Manager (Reused ✅)

Stores:

validation results
summary report
BigQuery history
7. Scenario Coverage
Scenario	Validation
File Load	file → table correctness
Table Transform	input vs output consistency
Kafka Publish	message validation
Schema Change	schema comparison
Terraform Change	infra + pipeline validation
8. Security & Access Control
Service Account with:
BigQuery read/write (limited)
GCS access
Airflow trigger permissions
Secrets via Secret Manager
No external credentials required
9. Implementation Plan
Phase 1 (Week 1–2)
Setup regression environment
Implement orchestrator
Create fixed test datasets
Implement DAG trigger + monitoring
Phase 2 (Week 3–4)
Implement validation engine
Add schema comparator (reuse your code)
Add reporting + Slack alerts
Run POC on 3–4 DAGs
10. Success Criteria
Metric	Target
DAG coverage (POC)	3–4 pipelines
Execution time	< 15 min
Detection accuracy	100% regression detection
False positives	< 5%
Automation level	Fully automated
11. Risks & Mitigations
Risk	Mitigation
Non-deterministic pipelines	Normalize data / exclude fields
External dependencies	Mock/stub inputs
Kafka complexity	Isolated topics
Schema evolution	Controlled baseline updates
12. Key Difference From Previous Design
Old Design ❌
Terraform + schema focused
CI/CD centric
dynamic input generation
BigQuery-only
New Design ✅
pipeline-centric (Airflow first)
dedicated regression environment
fixed input / fixed output
multi-scenario (files, tables, Kafka, infra)
schema validation as a component, not the system
