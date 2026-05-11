# 🚀 SCARLA Backend API

**SCARLA** adalah platform pembelajaran online yang menyediakan video tutorial dan quiz interaktif untuk berbagai bahasa pemrograman. Backend ini dibangun dengan **Express.js** dan menyediakan REST API untuk mengelola materi pembelajaran dan quiz.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Folder](#-struktur-folder)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [API Endpoints](#-api-endpoints)
- [Materi Pembelajaran](#-materi-pembelajaran)
- [Database](#-database)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Fitur Utama

- 📚 **Materi Pembelajaran**: 6 modul pembelajaran (HTML, CSS, JavaScript, Java, Python, C#)
- 🎥 **Video Tutorial**: Setiap modul memiliki 3-4 video tutorial dengan durasi berbeda
- 📝 **Quiz Interaktif**: Quiz komprehensif untuk setiap modul dengan penjelasan jawaban
- 🔌 **REST API**: API yang mudah digunakan untuk frontend applications
- 🌐 **CORS Support**: Mendukung request dari berbagai domain
- 📁 **Static File Serving**: Melayani file video dan aset statis dari folder `public`
- ✅ **Health Check**: Endpoint untuk monitoring status server
- 🚀 **Vercel Ready**: Siap di-deploy ke Vercel dengan konfigurasi `vercel.json`

---

## 🛠️ Teknologi yang Digunakan

| Teknologi      | Versi  | Deskripsi                                             |
| -------------- | ------ | ----------------------------------------------------- |
| **Node.js**    | 24.x   | Runtime environment untuk JavaScript server-side      |
| **Express.js** | 5.2.1  | Web framework untuk membangun REST API                |
| **CORS**       | 2.8.6  | Middleware untuk Cross-Origin Resource Sharing        |
| **dotenv**     | 17.4.2 | Package untuk mengelola environment variables         |
| **Nodemon**    | 3.1.14 | Development tool untuk auto-restart server (dev only) |

---

## 📂 Struktur Folder

```
be-scarla/
├── api/
│   └── index.js              # Main API routes dan database
├── public/
│   └── videos/               # Folder untuk menyimpan video tutorial
├── .git/                     # Git repository
├── .gitignore                # Git ignore rules
├── dev.js                    # Entry point untuk development server
├── package.json              # Project metadata dan dependencies
├── package-lock.json         # Lock file untuk npm packages
├── vercel.json               # Konfigurasi deployment untuk Vercel
└── README.md                 # File dokumentasi ini
```

---

## 🔧 Instalasi

### Prasyarat

- **Node.js** versi 24.x atau lebih tinggi
- **npm** atau **yarn** package manager

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/faizfznn/be-scarla.git
   cd be-scarla
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   Atau jika menggunakan yarn:

   ```bash
   yarn install
   ```

3. **Setup Environment Variables**
   - Buat file `.env` di root folder:
     ```bash
     cp .env.example .env  # Jika ada .env.example
     ```
   - Atau buat file `.env` secara manual dengan isi:
     ```
     PORT=3000
     NODE_ENV=development
     ```

---

## ⚙️ Konfigurasi

### File `.env`

Buat file `.env` di root folder dengan konfigurasi berikut:

```env
# Server Configuration
PORT=3000                    # Port untuk menjalankan server
NODE_ENV=development         # Environment: development, production, testing

# Logging
LOG_LEVEL=debug             # Level logging: debug, info, warn, error
```

### File `vercel.json`

File ini sudah dikonfigurasi untuk Vercel deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

---

## 🚀 Menjalankan Aplikasi

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000` dan otomatis me-reload ketika ada perubahan file.

### Production Mode

```bash
npm start
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

> Note: Test belum dikonfigurasi saat ini

---

## 📡 API Endpoints

### 1. Health Check

**Endpoint untuk mengecek status server**

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-05-12T10:30:00.000Z"
}
```

---

### 2. Dapatkan Semua Materi

**Mendapatkan daftar semua materi pembelajaran**

```http
GET /api/materials
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "html",
      "title": "HTML",
      "icon": "html5",
      "description": "HTML Dasar",
      "totalVideos": 3,
      "quizzes": [
        {
          "quizId": "html_quiz",
          "title": "Quiz HTML",
          "totalQuestions": 5
        }
      ]
    }
    // ... materi lainnya
  ]
}
```

---

### 3. Dapatkan Detail Materi Spesifik

**Mendapatkan detail materi lengkap beserta video dan quiz**

```http
GET /api/materials/:materialId
```

**Parameter:**

- `materialId` (string): ID materi (html, css, javascript, java, python, csharp)

**Contoh Request:**

```http
GET /api/materials/html
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "html",
    "title": "HTML",
    "icon": "html5",
    "description": "HTML Dasar",
    "totalVideos": 3,
    "videos": [
      {
        "id": 1,
        "title": "HTML dasar - Pendahuluan",
        "duration": "05:20",
        "videoRes": "http://localhost:3000/public/videos/html_intro.mp4"
      },
      {
        "id": 2,
        "title": "Tag dan Elemen HTML",
        "duration": "20:45",
        "videoRes": "http://localhost:3000/public/videos/html_tag.mp4"
      },
      {
        "id": 3,
        "title": "Forms dan Input",
        "duration": "18:20",
        "videoRes": "http://localhost:3000/public/videos/html_form.mp4"
      }
    ],
    "quizzes": [
      {
        "quizId": "html_quiz",
        "title": "Quiz HTML",
        "totalQuestions": 5
      }
    ]
  }
}
```

---

### 4. Dapatkan Semua Quiz

**Mendapatkan daftar semua quiz yang tersedia**

```http
GET /api/quizzes
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "html_quiz",
      "title": "Quiz HTML",
      "totalQuestions": 5,
      "duration": 300,
      "passingScore": 60
    }
    // ... quiz lainnya
  ]
}
```

---

### 5. Dapatkan Detail Quiz Spesifik

**Mendapatkan semua pertanyaan dan opsi jawaban untuk quiz tertentu**

```http
GET /api/quizzes/:quizId
```

**Parameter:**

- `quizId` (string): ID quiz (html_quiz, css_quiz, javascript_quiz, java_quiz, python_quiz, csharp_quiz)

**Contoh Request:**

```http
GET /api/quizzes/html_quiz
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "html_quiz",
    "title": "Quiz HTML",
    "duration": 300,
    "totalQuestions": 5,
    "passingScore": 60,
    "questions": [
      {
        "id": 1,
        "question": "HTML adalah...",
        "options": [
          "Bahasa pemrograman",
          "Markup language",
          "Database",
          "Framework"
        ],
        "correctAnswer": "Markup language",
        "explanation": "HTML adalah Hypertext Markup Language, bukan bahasa pemrograman"
      }
      // ... pertanyaan lainnya
    ]
  }
}
```

---

### 6. Submit Quiz (Penilaian)

**Mengirimkan jawaban quiz dan mendapatkan skor serta penjelasan**

```http
POST /api/quizzes/:quizId/submit
```

**Parameter:**

- `quizId` (string): ID quiz

**Request Body:**

```json
{
  "userId": "user123",
  "answers": ["Markup language", "<p>", "h1", "<a>", "Membuat tampilan web"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "quizId": "html_quiz",
    "userId": "user123",
    "score": 100,
    "correctAnswers": 5,
    "totalQuestions": 5,
    "isPassed": true,
    "passingScore": 60,
    "results": [
      {
        "questionId": 1,
        "question": "HTML adalah...",
        "userAnswer": "Markup language",
        "correctAnswer": "Markup language",
        "isCorrect": true,
        "explanation": "HTML adalah Hypertext Markup Language, bukan bahasa pemrograman"
      }
      // ... hasil pertanyaan lainnya
    ],
    "submittedAt": "2026-05-12T10:30:00.000Z"
  }
}
```

---

## 📚 Materi Pembelajaran

Platform SCARLA menyediakan 6 modul pembelajaran dengan total lebih dari 20 video tutorial:

### 1. **HTML**

- Total Videos: 3
- Materi:
  - HTML dasar - Pendahuluan (05:20)
  - Tag dan Elemen HTML (20:45)
  - Forms dan Input (18:20)

### 2. **CSS**

- Total Videos: 3
- Materi:
  - Pengenalan CSS (14:15)
  - Selectors dan Properties (22:10)
  - Flexbox dan Grid (25:50)

### 3. **JavaScript**

- Total Videos: 4
- Materi:
  - Pengenalan JavaScript (16:40)
  - Variabel dan Tipe Data (19:25)
  - Fungsi dan Scope (21:35)
  - DOM Manipulation (24:15)

### 4. **Java**

- Total Videos: 4
- Materi:
  - Setup dan Instalasi Java (12:50)
  - Sintaks Dasar Java (20:30)
  - OOP - Class dan Object (26:45)
  - Collections dan Generics (23:20)

### 5. **Python**

- Total Videos: 4
- Materi:
  - Setup Python (11:20)
  - Variabel dan Operasi (18:45)
  - Control Flow (22:15)
  - Fungsi dan Modul (20:50)

### 6. **C#**

- Total Videos: 4
- Materi:
  - Pengenalan C# (13:40)
  - Tipe Data dan Variabel (19:30)
  - OOP di C# (28:15)
  - Async dan Threading (24:40)

---

## 💾 Database

API ini menggunakan **in-memory database** yang disimpan dalam variabel JavaScript. Database mencakup dua komponen utama:

### 1. Materials Database (`materialsDatabase`)

Berisi semua materi pembelajaran dengan struktur:

```javascript
{
  [materialId]: {
    id: string,
    title: string,
    icon: string,
    description: string,
    totalVideos: number,
    videos: [
      {
        id: number,
        title: string,
        duration: string,
        videoRes: string (URL)
      }
    ],
    quizzes: [
      {
        quizId: string,
        title: string,
        totalQuestions: number
      }
    ]
  }
}
```

### 2. Quizzes Database (`quizzesDatabase`)

Berisi semua quiz dengan struktur:

```javascript
{
  [quizId]: {
    id: string,
    title: string,
    duration: number (detik),
    totalQuestions: number,
    passingScore: number (persentase),
    questions: [
      {
        id: number,
        question: string,
        options: string[],
        correctAnswer: string,
        explanation: string
      }
    ]
  }
}
```

**Catatan:** Database ini bersifat sementara dan akan direset ketika server di-restart. Untuk production, gunakan database eksternal seperti MongoDB, PostgreSQL, atau Firebase.

---

## 🌍 Deployment

### Deploy ke Vercel

1. **Push ke GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan akun Anda
   - Import project dari GitHub
   - Vercel akan otomatis mendeteksi `vercel.json`

3. **Set Environment Variables**
   - Di dashboard Vercel, buka project settings
   - Tambahkan environment variables yang diperlukan

4. **Deploy**
   - Vercel akan otomatis deploy ketika ada push ke main branch

### Deploy ke Hosting Lain (Heroku, Railway, dll)

```bash
# Install dependencies
npm install

# Start server
npm start
```

Pastikan port di-set melalui environment variable `PORT`.

---

## 🔐 Environment Variables

| Variable   | Default     | Deskripsi                                 |
| ---------- | ----------- | ----------------------------------------- |
| `PORT`     | 3000        | Port untuk menjalankan server             |
| `NODE_ENV` | development | Environment type (development/production) |

---

## 📋 Package.json Scripts

```json
{
  "scripts": {
    "start": "node dev.js", // Menjalankan production server
    "dev": "node dev.js", // Menjalankan development server
    "build": "echo 'Build complete'", // Build command
    "test": "echo 'Error: no test specified' && exit 1"
  }
}
```

---

## 🐛 Troubleshooting

### 1. Port Sudah Digunakan

**Error:** `EADDRINUSE: address already in use :::3000`

**Solusi:**

```bash
# Cari process yang menggunakan port 3000 dan kill
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process (ganti PID dengan nomor yang sesuai)
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

---

### 2. Module Not Found

**Error:** `Cannot find module 'express'`

**Solusi:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### 3. CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solusi:**

- CORS sudah dikonfigurasi di server
- Pastikan frontend mengakses dengan URL yang benar
- Check bahwa `cors()` middleware aktif di `api/index.js`

---

### 4. Video Tidak Muncul

**Error:** Video returns 404 atau tidak bisa diakses

**Solusi:**

- Pastikan file video berada di folder `public/videos/`
- Check naming convention: file harus sesuai dengan URL di database (contoh: `html_intro.mp4`)
- Verify file permissions

---

### 5. Quiz Submission Error

**Error:** Quiz submit gagal atau skor tidak terhitung

**Solusi:**

- Pastikan format request body sesuai dengan dokumentasi
- Verify bahwa jumlah jawaban sesuai dengan total questions
- Check browser console untuk error details

---

## 📖 Dokumentasi Tambahan

### File Utama

- **[dev.js](dev.js)** - Entry point aplikasi
- **[api/index.js](api/index.js)** - Semua routes dan database logic

### Struktur Response

Semua API responses mengikuti format:

```json
{
  "success": boolean,
  "data": object,
  "message": string (optional, jika error)
}
```

---

## 🤝 Kontribusi

Untuk berkontribusi pada project ini:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 Lisensi

Project ini menggunakan lisensi **ISC**. Lihat file `package.json` untuk detail lebih lanjut.

---

## 👨‍💻 Author

**SCARLA Backend Development Team**

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buka issue di repository atau hubungi tim development.

---

## 🗺️ Roadmap Fitur Masa Depan

- [ ] Database eksternal (MongoDB/PostgreSQL)
- [ ] Authentication dan Authorization
- [ ] User progress tracking
- [ ] Leaderboard system
- [ ] Admin dashboard
- [ ] Batch upload video
- [ ] Search dan filter functionality
- [ ] Performance optimization
- [ ] Unit testing
- [ ] API documentation (Swagger/OpenAPI)

---

**Last Updated:** May 12, 2026  
**Version:** 1.0.0  
**Status:** ✅ Active Development
