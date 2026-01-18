import pool from "@/lib/A1_db";
import BookTable from "./BookTable"; // フィルタリング用のクライアントコンポーネント

// 1. サーバーサイドでデータを取得する関数
async function getBooks() {
  try {
    // データベースから全件取得
    const [rows] = await pool.query("SELECT * FROM books");
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

// 2. ページのメインコンポーネント (サーバーコンポーネント)
export default async function Page() {
  const books = await getBooks();

  return (
    <div style={{ padding: "20px" }}>
      {/* ヘッダー部分 */}
      <header style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/login_success">
          <span className="home-screen">トップ画面</span>
        </a>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Y書店</span>
        <span>こんにちは、XXXさん</span>
      </header>

      {/* ナビゲーション */}
      <nav style={{ width: "100%", display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <span>ホーム</span>
        <span>書籍一覧</span>
        <span>書籍検索</span>
      </nav>

      <br />
      <h3>全書籍の閲覧回数</h3>

      {/* 3. フィルタリングとテーブル表示のコンポーネントを呼び出す */}
      <BookTable initialBooks={books} />
    </div>
  );
}