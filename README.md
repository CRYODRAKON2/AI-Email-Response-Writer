# 📧 AI-Powered Email Reply Generator

An end-to-end AI-powered assistant that generates **contextual, tone-specific replies** from raw email content.  
Built with **Spring Boot, React, Gemini API, and a Chrome Extension** seamlessly embedded in Gmail.

---

## 🚀 Features
- ✨ **AI-Powered Replies** – Generates professional, casual, or friendly responses.  
- ⚡ **Full-Stack Architecture** – Spring Boot backend + React frontend.  
- 🌐 **Chrome Extension** – Direct integration into Gmail UI.  
- 🧩 **Prompt Optimization** – Ensures low-latency, accurate responses.  

---

## 🏗️ Project Structure
```
ai-email-reply-generator/
│── backend/       # Spring Boot backend (API + Gemini integration)
│── frontend/      # React frontend (UI for reply generator)
│── extension/     # Chrome Extension embedding into Gmail
│── screenshots/   # Images & GIFs for demo
│── README.md
│── .gitignore
```

---

## 🛠️ Tech Stack
- **Backend:** Spring Boot, REST APIs  
- **Frontend:** React, Tailwind/Material UI   
- **AI Integration:** Google Gemini API  
- **Extension:** JavaScript, Chrome APIs  

---

## ⚙️ Setup & Installation

### 1️⃣ Run Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### 2️⃣ Run Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Load Chrome Extension
1. Open **chrome://extensions/**  
2. Enable **Developer Mode**  
3. Click **Load unpacked** → select the `extension/` folder  
4. Open Gmail → You’ll see the **AI Reply Button** 🚀  

---

## 🚀 Usage
1. Start the **backend** server  
2. Run the **frontend** React app  
3. Load the **Chrome Extension** in Chrome  
4. Open Gmail → Select an email → Click the AI Reply button → Choose reply tone (Professional / Casual / Friendly)  

---

## 📸 Demo
👉 Place your screenshots & GIFs inside the `screenshots/` folder.  

```markdown
### Gmail Integration
![Gmail UI](screenshots/ui.png)

### AI Reply Example
![AI Reply Example](screenshots/reply-demo.gif)
```

---

## 📌 Future Improvements
- 🔹 Support for multiple email providers (Outlook, Yahoo)  
- 🔹 Rich-text formatting in replies  
- 🔹 User preferences for default tone  

---


