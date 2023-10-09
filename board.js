const express = require("express");
const app = express();
const port = 3000;
let posts = [];

app.use(express.json()); // req.body 사용 위한 JSON 미들웨어 활성화, 미사용시 undefined 반환

app.use(express.urlencoded({ extended: true })); // JSON 미들웨어와 함께 사용

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; //app.delete에서 설정한 path 정보에서 id값을 가져온다.
  const filteredPosts = posts.filter((post) => post.id !== +id); // 글 삭제 로직
  const isLengthChanged = posts.length !== filteredPosts.length; // 삭제 확인

  posts = filteredPosts;

  if (isLengthChanged) {
    // posts의 데이터 개수가 변경되었으면 삭제 성공
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
