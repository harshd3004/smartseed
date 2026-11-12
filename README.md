#  SmartSeed

### AI-Assisted Synthetic Data Generation for MongoDB

SmartSeed is an AI-assisted synthetic data generation platform designed to simplify the process of creating realistic, structured test data for MongoDB applications.

Instead of manually writing seed scripts or creating mock records, developers can upload their existing Mongoose models, let SmartSeed analyze their schemas, and automatically generate a customized data generation plan.

With AI-powered field analysis and a flexible generator system, SmartSeed helps developers create meaningful synthetic datasets that follow their application's schema structure and constraints.

---

## ✨ Key Features

- **Mongoose Schema Detection:** Upload multiple Mongoose model files and automatically identify their models, collections, fields, and schema constraints.
- **AI-Assisted Generation Planning:** Use AI to understand field semantics and recommend appropriate data generators.
- **Rule-Based Analysis:** Handle recognizable fields and schema constraints using predefined rules, reducing unnecessary AI requests.
- **Customizable Generation Plans:** Review and modify the generators assigned to individual fields before generating data.
- **Flexible Generator Registry:** Support multiple categories of generators, including personal information, internet data, company details, numbers, dates, locations, and more.
- **Realistic Synthetic Data:** Generate varied and meaningful records using Faker.js and custom generators.
- **Schema-Aware Generation:** Consider field types, required properties, enumerations, and other supported schema constraints.
- **Multiple Model Support:** Generate data for multiple Mongoose models within the same project.
- **Data Preview:** Review generated records before using them in your application.
- **MongoDB Integration:** Support seeding generated data into a MongoDB database.

---

## 🛠️ How It Works

SmartSeed follows a simple workflow:

### 1. Upload Mongoose Models

Upload your existing Mongoose model files through the SmartSeed interface.

SmartSeed processes the uploaded models and identifies their schema definitions.

### 2. Schema Analysis

The system extracts relevant schema information, including:

- Model and collection names
- Field names and data types
- Required fields
- Default values
- Enumerations
- Supported validation constraints
- Model references

The extracted information is organized into a standardized Intermediate Representation (IR).

### 3. AI-Assisted Generation Plan

SmartSeed analyzes the extracted schema using a combination of rule-based analysis and AI.

The system recommends suitable generators for individual fields based on their names, types, and available schema information.

For example:

| Schema Field | Recommended Generator |
|---|---|
| name | `person.fullName` |
| email | `internet.email` |
| company | `company.name` |
| salary | `commerce.salary` |
| age | `number.integer` |
| publishedAt | `date.past` |

The recommendations are validated against the supported generator registry.

### 4. Customize Generation Plan

Review the generated plan through an interactive interface.

You can:

- Change the assigned generator for a field.
- Configure supported generator options.
- Review unresolved fields.
- Specify the number of documents to generate for each model.

This gives developers control over the generated dataset instead of relying entirely on automated recommendations.

### 5. Generate and Preview Data

Once the generation plan is finalized, SmartSeed uses its deterministic generation engine to generate synthetic records.

The generated data can be previewed before being used in the target application or database.

---

## 🏗️ System Architecture

SmartSeed follows a modular processing pipeline:

```text
        Mongoose Model Files
                 │
                 ▼
          Schema Runner
                 │
                 ▼
       Schema Metadata Extraction
                 │
                 ▼
        Intermediate Representation
                 │
                 ▼
       Rule-Based + AI Analyzer
                 │
                 ▼
        Generation Plan Builder
                 │
                 ▼
        Generation Plan Validator
                 │
                 ▼
       Deterministic Generation Engine
                 │
                 ▼
          Generator Registry
                 │
                 ▼
        Faker.js / Custom Generators
                 │
                 ▼
          Generated Dataset
                 │
                 ▼
          Preview / MongoDB
```

The AI component is responsible for understanding schema fields and recommending suitable generators. Actual data generation is handled separately by the deterministic generation engine.

This separation helps keep generated results structured, predictable, and consistent with the approved generation plan.

---

## 💻 Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| AI / LLM | Google Gemini API (@google/genai) |
| Synthetic Data | Faker.js |
| HTTP Communication | Axios |
| Development Tools | Git, GitHub, VS Code |

---

## ⚙️ Getting Started

Follow these steps to run SmartSeed locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (required for MongoDB seeding)
- [Gemini API key](https://aistudio.google.com) (required for AI-powered generation planning)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/harshd3004/SmartSeed.git

cd SmartSeed
```

### 2. Set Up the Backend

```bash
cd backend

npm install
```

Configure the backend environment variables according to the project's environment configuration.

Example configuration:

```env
PORT=3000

AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Start the backend development server:

```bash
npm run dev
```

### 3. AI Provider Configuration

SmartSeed uses a provider-independent AI integration architecture, currently configured with Google Gemini. The architecture is designed to support additional AI providers through a common provider interface.

Add your Gemini API key and configure the desired model in the backend environment variables before starting the application.

### 4. Set Up the Frontend

Open another terminal:

```bash
cd frontend

npm install
```

Configure the frontend environment:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access SmartSeed.

---

## 📌 Example Use Case

Suppose you are developing an application with the following Mongoose model:

```javascript
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    }
});
```

Instead of manually creating hundreds of user records, upload the model to SmartSeed.

SmartSeed analyzes the schema and recommends generators such as:

| Field | Generator |
|---|---|
| name | `person.fullName` |
| email | `internet.email` |
| age | `number.integer` |
| role | Enum-based generator |

You can review the recommendations, customize the generation plan, specify the number of records, and generate a synthetic dataset.

The result is structured test data designed around your existing Mongoose schema.

---

## 🔒 Data Handling

SmartSeed uses temporary session-based storage to manage the model-processing workflow.

- Uploaded model files and intermediate processing artifacts are stored temporarily.
- Each workflow is associated with a unique session ID.
- Intermediate data is maintained only as long as required by the session.
- Temporary session data is cleaned up according to the application's session lifecycle.
- MongoDB seeding is intended to use a database connection explicitly provided for that operation.

---

## 🚀 Future Scope

Potential improvements and extensions include:

- Support for additional ORMs and database technologies.
- Expanded generator library and custom generator definitions.
- Improved handling of nested schemas and complex relationships.
- Advanced generator configuration and dependency-aware data generation.
- Support for larger datasets through streaming and optimized generation.
- Export generated datasets into formats such as JSON and CSV.
- Saved projects and reusable generation configurations.
- Improved AI recommendations and semantic field understanding.

---

## 👨‍💻 Contributors

**SmartSeed** is developed as a final-year Bachelor of Technology project by a team of five Computer Engineering students.

| Contributor | Role |
|---|---|
| Harsh Desai | Backend / Team Lead |
| Abhijit Kote | Backend |
| Sahil Musale | Backend / REST APIs |
| Komal Patil | Frontend / UI Design |
| Varsha Mane | Frontend |

---

## 📄 License

This project is developed for academic and educational purposes.


---
