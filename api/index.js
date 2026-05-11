const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "../public")));

// database untuk semua materi (video)
const materialsDatabase = {
  html: {
    id: "html",
    title: "HTML",
    icon: "html5",
    description: "HTML Dasar",
    totalVideos: 3,
    videos: [
      {
        id: 1,
        title: "HTML dasar - Pendahuluan",
        duration: "05:20",
        videoRes: "http://localhost:3000/public/videos/html_intro.mp4",
      },
      {
        id: 2,
        title: "Tag dan Elemen HTML",
        duration: "20:45",
        videoRes: "http://localhost:3000/public/videos/html_tag.mp4",
      },
      {
        id: 3,
        title: "Forms dan Input",
        duration: "18:20",
        videoRes: "http://localhost:3000/public/videos/html_form.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "html_quiz",
        title: "Quiz HTML",
        totalQuestions: 5,
      },
    ],
  },

  css: {
    id: "css",
    title: "CSS",
    icon: "css3",
    description: "CSS Dasar",
    totalVideos: 3,
    videos: [
      {
        id: 1,
        title: "Pengenalan CSS",
        duration: "14:15",
        videoRes: "http://localhost:3000/public/videos/css_intro.mp4",
      },
      {
        id: 2,
        title: "Selectors dan Properties",
        duration: "22:10",
        videoRes: "http://localhost:3000/public/videos/css_selectors.mp4",
      },
      {
        id: 3,
        title: "Flexbox dan Grid",
        duration: "25:50",
        videoRes: "http://localhost:3000/public/videos/css_layout.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "css_quiz",
        title: "Quiz CSS",
        totalQuestions: 5,
      },
    ],
  },

  javascript: {
    id: "javascript",
    title: "JavaScript",
    icon: "javascript",
    description: "Javascript Dasar",
    totalVideos: 4,
    videos: [
      {
        id: 1,
        title: "Pengenalan JavaScript",
        duration: "16:40",
        videoRes: "http://localhost:3000/public/videos/js_intro.mp4",
      },
      {
        id: 2,
        title: "Variabel dan Tipe Data",
        duration: "19:25",
        videoRes: "http://localhost:3000/public/videos/js_variables.mp4",
      },
      {
        id: 3,
        title: "Fungsi dan Scope",
        duration: "21:35",
        videoRes: "http://localhost:3000/public/videos/js_functions.mp4",
      },
      {
        id: 4,
        title: "DOM Manipulation",
        duration: "24:15",
        videoRes: "http://localhost:3000/public/videos/js_dom.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "javascript_quiz",
        title: "Quiz JavaScript",
        totalQuestions: 5,
      },
    ],
  },

  java: {
    id: "java",
    title: "Java",
    icon: "java",
    description: "Java Dasar",
    totalVideos: 4,
    videos: [
      {
        id: 1,
        title: "Setup dan Instalasi Java",
        duration: "12:50",
        videoRes: "http://localhost:3000/public/videos/java_setup.mp4",
      },
      {
        id: 2,
        title: "Sintaks Dasar Java",
        duration: "20:30",
        videoRes: "http://localhost:3000/public/videos/java_syntax.mp4",
      },
      {
        id: 3,
        title: "OOP - Class dan Object",
        duration: "26:45",
        videoRes: "http://localhost:3000/public/videos/java_oop.mp4",
      },
      {
        id: 4,
        title: "Collections dan Generics",
        duration: "23:20",
        videoRes: "http://localhost:3000/public/videos/java_collections.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "java_quiz",
        title: "Quiz Java",
        totalQuestions: 5,
      },
    ],
  },

  python: {
    id: "python",
    title: "Python",
    icon: "python",
    description: "Python Dasar",
    totalVideos: 4,
    videos: [
      {
        id: 1,
        title: "Setup Python",
        duration: "11:20",
        videoRes: "http://localhost:3000/public/videos/python_setup.mp4",
      },
      {
        id: 2,
        title: "Variabel dan Operasi",
        duration: "18:45",
        videoRes: "http://localhost:3000/public/videos/python_variables.mp4",
      },
      {
        id: 3,
        title: "Control Flow",
        duration: "22:15",
        videoRes: "http://localhost:3000/public/videos/python_control.mp4",
      },
      {
        id: 4,
        title: "Fungsi dan Modul",
        duration: "20:50",
        videoRes: "http://localhost:3000/public/videos/python_functions.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "python_quiz",
        title: "Quiz Python",
        totalQuestions: 5,
      },
    ],
  },

  csharp: {
    id: "csharp",
    title: "C#",
    icon: "csharp",
    description: "C# Dasar",
    totalVideos: 4,
    videos: [
      {
        id: 1,
        title: "Pengenalan C#",
        duration: "13:40",
        videoRes: "http://localhost:3000/public/videos/csharp_intro.mp4",
      },
      {
        id: 2,
        title: "Tipe Data dan Variabel",
        duration: "19:30",
        videoRes: "http://localhost:3000/public/videos/csharp_types.mp4",
      },
      {
        id: 3,
        title: "OOP di C#",
        duration: "28:15",
        videoRes: "http://localhost:3000/public/videos/csharp_oop.mp4",
      },
      {
        id: 4,
        title: "Async dan Threading",
        duration: "24:40",
        videoRes: "http://localhost:3000/public/videos/csharp_async.mp4",
      },
    ],
    quizzes: [
      {
        quizId: "csharp_quiz",
        title: "Quiz C#",
        totalQuestions: 5,
      },
    ],
  },
};

// database quiz untuk setiap materi
const quizzesDatabase = {
  html_quiz: {
    id: "html_quiz",
    title: "Quiz HTML",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "HTML adalah...",
        options: [
          "Bahasa pemrograman",
          "Markup language",
          "Database",
          "Framework",
        ],
        correctAnswer: "Markup language",
        explanation:
          "HTML adalah Hypertext Markup Language, bukan bahasa pemrograman",
      },
      {
        id: 2,
        question: "Tag untuk paragraf adalah...",
        options: ["<p>", "<h1>", "<div>", "<a>"],
        correctAnswer: "<p>",
        explanation: "Tag <p> digunakan untuk membuat paragraf",
      },
      {
        id: 3,
        question: "Tag heading terbesar?",
        options: ["h6", "h4", "h1", "h2"],
        correctAnswer: "h1",
        explanation:
          "<h1> adalah heading terbesar dengan tingkat kepentingan tertinggi",
      },
      {
        id: 4,
        question: "Tag link HTML?",
        options: ["<a>", "<img>", "<p>", "<ul>"],
        correctAnswer: "<a>",
        explanation: "Tag <a> digunakan untuk membuat hyperlink",
      },
      {
        id: 5,
        question: "HTML digunakan untuk?",
        options: ["Membuat tampilan web", "AI", "Database", "Game engine"],
        correctAnswer: "Membuat tampilan web",
        explanation:
          "HTML adalah markup untuk membuat struktur dan tampilan halaman web",
      },
    ],
  },

  css_quiz: {
    id: "css_quiz",
    title: "Quiz CSS",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "CSS adalah singkatan dari...",
        options: [
          "Cascading Style Sheets",
          "Computer Style System",
          "Creative Style Sheet",
          "Custom Style Setting",
        ],
        correctAnswer: "Cascading Style Sheets",
        explanation: "CSS = Cascading Style Sheets",
      },
      {
        id: 2,
        question: "Cara menambah warna background?",
        options: ["background-color", "bg-color", "color-bg", "set-background"],
        correctAnswer: "background-color",
        explanation:
          "Property background-color digunakan untuk mengatur warna latar belakang",
      },
      {
        id: 3,
        question: "Selector yang paling spesifik?",
        options: ["Element", "Class", "ID", "Universal"],
        correctAnswer: "ID",
        explanation: "ID selector memiliki spesifikasi tertinggi dalam CSS",
      },
      {
        id: 4,
        question: "Property untuk ukuran font?",
        options: ["font-size", "text-size", "size-text", "font-height"],
        correctAnswer: "font-size",
        explanation: "font-size mengatur ukuran teks/font",
      },
      {
        id: 5,
        question: "Cara center text horizontally?",
        options: [
          "text-align: center",
          "align: center",
          "center-text",
          "text-center",
        ],
        correctAnswer: "text-align: center",
        explanation:
          "text-align: center memposisikan teks di tengah secara horizontal",
      },
    ],
  },

  javascript_quiz: {
    id: "javascript_quiz",
    title: "Quiz JavaScript",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "JavaScript berjalan di...",
        options: ["Browser", "Server", "Database", "Router"],
        correctAnswer: "Browser",
        explanation:
          "JavaScript adalah client-side language yang berjalan di browser",
      },
      {
        id: 2,
        question: "Cara deklarasi variabel yang benar?",
        options: ["let x = 5", "variable x = 5", "x := 5", "define x = 5"],
        correctAnswer: "let x = 5",
        explanation:
          "let adalah cara modern untuk deklarasi variabel di JavaScript",
      },
      {
        id: 3,
        question: "Tipe data untuk teks?",
        options: ["String", "Text", "Char", "Word"],
        correctAnswer: "String",
        explanation: "String adalah tipe data untuk menyimpan teks",
      },
      {
        id: 4,
        question: "Fungsi untuk menampilkan output?",
        options: ["console.log()", "print()", "output()", "display()"],
        correctAnswer: "console.log()",
        explanation:
          "console.log() digunakan untuk menampilkan output di console browser",
      },
      {
        id: 5,
        question: "Apa itu callback?",
        options: [
          "Fungsi yang dipanggil setelah fungsi lain selesai",
          "Fungsi yang berulang",
          "Fungsi yang mengembalikan nilai",
          "Fungsi yang tidak memiliki parameter",
        ],
        correctAnswer: "Fungsi yang dipanggil setelah fungsi lain selesai",
        explanation:
          "Callback adalah fungsi yang dikirim sebagai argument dan dijalankan setelah event tertentu",
      },
    ],
  },

  java_quiz: {
    id: "java_quiz",
    title: "Quiz Java",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Java adalah bahasa...",
        options: ["Object-oriented", "Procedural", "Functional", "Declarative"],
        correctAnswer: "Object-oriented",
        explanation: "Java adalah bahasa pemrograman berorientasi objek (OOP)",
      },
      {
        id: 2,
        question: "Method untuk cetak di konsol?",
        options: [
          "System.out.println()",
          "print()",
          "console.log()",
          "printf()",
        ],
        correctAnswer: "System.out.println()",
        explanation:
          "System.out.println() digunakan untuk menampilkan output di Java",
      },
      {
        id: 3,
        question: "Inheritance di Java menggunakan keyword?",
        options: ["extends", "implements", "inherits", "super"],
        correctAnswer: "extends",
        explanation:
          "Keyword extends digunakan untuk inheritance class di Java",
      },
      {
        id: 4,
        question: "Method utama di Java?",
        options: ["main()", "start()", "run()", "execute()"],
        correctAnswer: "main()",
        explanation: "Method main() adalah entry point aplikasi Java",
      },
      {
        id: 5,
        question: "Apa itu abstract class?",
        options: [
          "Class yang tidak bisa di-instantiate langsung",
          "Class yang tidak punya method",
          "Class untuk interface",
          "Class yang bersifat private",
        ],
        correctAnswer: "Class yang tidak bisa di-instantiate langsung",
        explanation:
          "Abstract class adalah template yang tidak bisa dibuat object secara langsung",
      },
    ],
  },

  python_quiz: {
    id: "python_quiz",
    title: "Quiz Python",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Python case-sensitive?",
        options: ["Ya", "Tidak", "Tergantung versi", "Opsional"],
        correctAnswer: "Ya",
        explanation: "Python membedakan huruf besar dan kecil (case-sensitive)",
      },
      {
        id: 2,
        question: "Fungsi untuk input di Python?",
        options: ["input()", "read()", "get()", "scan()"],
        correctAnswer: "input()",
        explanation:
          "Fungsi input() digunakan untuk menerima input dari user di Python",
      },
      {
        id: 3,
        question: "Tipe data untuk list di Python?",
        options: ["list", "array", "vector", "tuple"],
        correctAnswer: "list",
        explanation:
          "list adalah tipe data untuk menyimpan koleksi item yang terurut",
      },
      {
        id: 4,
        question: "Cara membuat dictionary?",
        options: ["{}", "[]", "()", "<>"],
        correctAnswer: "{}",
        explanation:
          "Curly braces {} digunakan untuk membuat dictionary di Python",
      },
      {
        id: 5,
        question: "Apa itu pip di Python?",
        options: [
          "Package manager untuk install library",
          "Programming interface",
          "Python interpreter",
          "Performance indicator",
        ],
        correctAnswer: "Package manager untuk install library",
        explanation:
          "pip adalah package manager untuk menginstall dan mengelola library Python",
      },
    ],
  },

  csharp_quiz: {
    id: "csharp_quiz",
    title: "Quiz C#",
    duration: 300,
    totalQuestions: 5,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "C# dikembangkan oleh...",
        options: ["Microsoft", "Google", "Apple", "Facebook"],
        correctAnswer: "Microsoft",
        explanation:
          "C# adalah bahasa yang dikembangkan oleh Microsoft sebagai bagian dari .NET",
      },
      {
        id: 2,
        question: "Cara deklarasi variable di C#?",
        options: [
          "int x = 5;",
          "x: int = 5;",
          "x = int(5);",
          "declare x as int;",
        ],
        correctAnswer: "int x = 5;",
        explanation:
          "Syntax deklarasi variable di C# adalah: tipeData namaVariable = nilai;",
      },
      {
        id: 3,
        question: "Interface menggunakan keyword?",
        options: ["interface", "Interface", "INTERFACE", "iface"],
        correctAnswer: "interface",
        explanation:
          "Keyword interface digunakan untuk membuat interface di C#",
      },
      {
        id: 4,
        question: "Method untuk cetak di konsol C#?",
        options: ["Console.WriteLine()", "print()", "output()", "System.out()"],
        correctAnswer: "Console.WriteLine()",
        explanation:
          "Console.WriteLine() digunakan untuk menampilkan output di C#",
      },
      {
        id: 5,
        question: "Property di C# berfungsi untuk?",
        options: [
          "Encapsulation dan akses data",
          "Membuat variable",
          "Membuat method",
          "Import library",
        ],
        correctAnswer: "Encapsulation dan akses data",
        explanation:
          "Property menyediakan cara terkontrol untuk mengakses dan mengubah field di C#",
      },
    ],
  },
};

// ==================== API ROUTES ====================

// GET all materials
app.get("/api/materials", (req, res) => {
  try {
    const materials = Object.keys(materialsDatabase).map((key) => ({
      id: key,
      title: materialsDatabase[key].title,
      icon: materialsDatabase[key].icon,
      description: materialsDatabase[key].description,
      totalVideos: materialsDatabase[key].totalVideos,
      quizzes: materialsDatabase[key].quizzes,
    }));

    res.json({
      success: true,
      data: materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET specific material with videos
app.get("/api/materials/:materialId", (req, res) => {
  try {
    const { materialId } = req.params;

    if (!materialsDatabase[materialId]) {
      return res.status(404).json({
        success: false,
        message: "Materi tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: materialsDatabase[materialId],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET all quizzes
app.get("/api/quizzes", (req, res) => {
  try {
    const quizzesList = Object.keys(quizzesDatabase).map((key) => ({
      id: key,
      title: quizzesDatabase[key].title,
      totalQuestions: quizzesDatabase[key].totalQuestions,
      duration: quizzesDatabase[key].duration,
      passingScore: quizzesDatabase[key].passingScore,
    }));

    res.json({
      success: true,
      data: quizzesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET specific quiz
app.get("/api/quizzes/:quizId", (req, res) => {
  try {
    const { quizId } = req.params;

    if (!quizzesDatabase[quizId]) {
      return res.status(404).json({
        success: false,
        message: "Quiz tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: quizzesDatabase[quizId],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST submit quiz
app.post("/api/quizzes/:quizId/submit", (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, userId } = req.body;

    if (!quizzesDatabase[quizId]) {
      return res.status(404).json({
        success: false,
        message: "Quiz tidak ditemukan",
      });
    }

    const quiz = quizzesDatabase[quizId];
    let correctCount = 0;
    const results = [];

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctCount++;

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation,
      });
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const isPassed = score >= quiz.passingScore;

    res.json({
      success: true,
      data: {
        quizId: quizId,
        userId: userId,
        score: score,
        correctAnswers: correctCount,
        totalQuestions: quiz.questions.length,
        isPassed: isPassed,
        passingScore: quiz.passingScore,
        results: results,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 SCARLA API Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n📝 API Endpoints:`);
  console.log(`   GET  /api/materials`);
  console.log(`   GET  /api/materials/:materialId`);
  console.log(`   GET  /api/quizzes`);
  console.log(`   GET  /api/quizzes/:quizId`);
  console.log(`   POST /api/quizzes/:quizId/submit`);
  console.log(`   GET  /api/health`);
  console.log(`\n📚 Available Materials:`);
  console.log(`   - html, css, javascript, java, python, csharp`);
  console.log(`\n📁 Video Folder: /public/videos/`);
  console.log(`\n✅ Server siap menerima request!\n`);
});
