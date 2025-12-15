# 🎤 PunchlinePro: The AI Comedy Coach

**PunchlinePro** is a sophisticated AI-powered application designed to help aspiring comedians write material. By acting as a personal comedy coach, it analyzes your life details, preferred topics, and comedic influences to generate a structured "Tight 10" (10-bit) stand-up routine.

<img width="900" height="300" alt="Screenshot 2025-12-15 071723" src="https://github.com/user-attachments/assets/26474fa4-4de6-4750-857d-0c932da7c99f" />
<img width="300" height="300" alt="Screenshot 2025-12-15 071736" src="https://github.com/user-attachments/assets/05d85017-5673-425a-8a77-6b9d1be82bba" />
<img width="300" height="300" alt="Screenshot 2025-12-15 071754" src="https://github.com/user-attachments/assets/fd90679b-8df7-4ebe-bd20-2e3e17198e0b" />
<img width="300" height="300" alt="Screenshot 2025-12-15 071809" src="https://github.com/user-attachments/assets/17aeed72-0cc3-4a2a-802d-64f7052a526f" />
<img width="900" height="300" alt="Screenshot 2025-12-15 071856" src="https://github.com/user-attachments/assets/7c2a94d3-6024-424f-9274-85d947fa2cc6" />



## ✨ Features

- **Personalized Material**: Generates jokes based on your specific life context (Age, Occupation, Hometown, Biography).
- **Style Selection**: Choose from 6 distinct comedy styles including Observational, Dark/Edgy, Self-Deprecating, and Absurdist.
- **Influence Modeling**: Select up to 3 top comedians (from a curated list of 30 legends like Dave Chappelle, Mitch Hedberg, and Ali Wong) to tailor the voice and rhythm of the set.
- **The "Tight 10" Structure**:
  - **Opener**: A strong one-liner to break the ice.
  - **10 Bits**: Distinct joke concepts with Setups and Punchlines.
  - **Closer**: A call-back or strong exit line.
- **Coaching Mode**: Each bit comes with:
  - **Act Outs**: Instructions for physical comedy and voice modulation.
  - **Coach's Tips**: Expert advice on *why* the joke works and how to deliver it.
- **Demo Personas**: One-click loadable profiles (e.g., "The Corporate Cynic", "The Gen Z Nihilist") for instant testing.
- **Export**: Download your routine as a beautifully formatted HTML file for printing or offline practice.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.5 Flash (via `@google/genai` SDK)
- **Tooling**: Vite (implied), ES Modules

## 🚀 Getting Started

### Prerequisites

You will need a Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/punchline-pro.git
    cd punchline-pro
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your API key:
    ```env
    API_KEY=your_actual_api_key_here
    ```
    *Note: The application expects `process.env.API_KEY` to be available.*

4.  **Run the application**
    ```bash
    npm run dev
    ```

## 🎮 Usage

1.  **Enter Your Details**: Fill out the form with your "Stage Name", occupation, and a bio dump. The more specific/weird the details, the better the AI performs.
2.  **Select Style & Influences**: Choose a comedic style and pick up to 3 comedians you admire to influence the tone.
3.  **Generate**: Click "Generate My Tight 10". The AI will "think" for a moment and return a full routine.
4.  **Review & Export**: Read through your set, check the coaching tips, and export the file to keep a copy.

## 🧩 Architecture

The app uses the **RBFR (Role, Background, Format, Requirement)** prompting framework to ensure high-quality outputs from the LLM.

- **`services/geminiService.ts`**: Handles the interaction with the Google Gemini API, including structured JSON schema validation.
- **`components/InputForm.tsx`**: Manages user state, including the multi-select interface for influences.
- **`components/RoutineDisplay.tsx`**: Renders the generated JSON into a readable card format and handles the HTML export.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Note: This is a demo application using AI. Comedy is subjective, and AI-generated jokes may vary in quality or appropriateness based on inputs.*
