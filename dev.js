// Local development server
const app = require("./api/index.js");

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
