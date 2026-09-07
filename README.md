# SmartSeed

SmartSeed is an AI-assisted synthetic data generation platform designed for applications using **MongoDB and Mongoose**.

The goal of SmartSeed is to help developers generate realistic synthetic data automatically from their existing Mongoose schemas and models.

Instead of manually defining data generation rules for every field, SmartSeed aims to analyze the application's schema, understand its structure and constraints, and use that information to generate appropriate data.

## Project Vision

A developer provides Mongoose model/schema files and specifies how much data they want to generate.

SmartSeed processes the schema and eventually transforms it into a structured generation workflow.

The overall architecture is:

```text
Mongoose Models
      ↓
Schema Runner
      ↓
Mongoose Schema Metadata
      ↓
Internal Representation (IR)
      ↓
Rule-Based + AI Semantic Analysis
      ↓
Generation Plan
      ↓
Generation Engine
      ↓
Generator Registry
      ↓
Faker.js / Custom Generators
      ↓
Validation
      ↓
MongoDB
```

The project is being developed incrementally, with each component separated to keep the system modular and maintainable.

---

# SmartSeed Backend

The backend is responsible for the core processing pipeline of SmartSeed.

Its responsibilities include:

* Loading and analyzing Mongoose models
* Extracting schema metadata and validation constraints
* Converting schema information into a standardized Internal Representation (IR)
* Supporting future semantic analysis of fields
* Creating data generation plans
* Generating synthetic data
* Validating generated data against schema rules
* Seeding generated data into MongoDB

The backend uses:

* Node.js
* Express.js
* JavaScript
* Mongoose
* MongoDB
