import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = "1raYUmkYPCV7xZPDNsl-fn5byRgWs-eCGG7xcwntgymU";
const SERVICE_ACCOUNT_EMAIL = "studentr@studentr-497200.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDXy4DWCzWwz8pL\nFaDhLK1yQRiZEwwE2b3Z2d4bnJop8BON46bofTEe4jqAC4yIA2j3SGpS7GKXtDOc\nPur7fDRttbdZgwWnLqH0gwcTTzt3zp/EkXI4coMFxBVOIinugQxHxXaApbt2NEfU\nc5npNb4zVHoCNr539lmW/0keHzSf0LMHhNVMg1Kgn7KY+87UxTGKRvTBgOLUW5kx\n8MtXXph4TKkIcUMxk6YPrTsMdSzS6pJxl197mqMFBRuj3pQjHS0j7iMwVpR0mWgz\n/l5jaZtMIUowraBPdP0iHCTBml9qqzN6I+Ddi7KLE3keXYE8OZhYT8eiMUM1QZ12\nA1gjwOCJAgMBAAECggEALk+vfuApfeBeNPZ3kBOfRpenUISorerP5m6uDsVxRWJP\nRAJxCdCCR/M7pEq2NmNq9bTeEp1F/HIxKE1NbzrE4q2eo3BtuGcW3Ut4a4GzzL60\nhYJEXc5fhY+DFgFZd+TMjqOXTr0iqdfG+ZZ0l7rPrqLoy0xV3JdrOy9e0P7X85r4\nprOjceNPy/dW6YiprmEHKokQ11OB+hQCOop9zGn+WWz0NUV8ge5tnD9EdtB/xkYi\nMEOplqs6jTguGQ5LeXc8IBIxp0jCoD4gR/2eVCzNTM+b5WrtO24+R9fsiaxIanFy\nkRgEggp2E8JxdtKpGQtGXWwXSqNOMJ4b8b+Zg4bxzQKBgQD3xbkRYjxkRyvmJWP+\nzcYV82uC0TF2ZYXL99ybmIJS4PGJH8qEa+QsWjGWjsjwYpepqa01fbeyjiiq7cl5\nuKjbb8UrejoDnctbfsToY/dTjW3w/ERUBGbLfAYp3xnts55p4zcm4zypSg7PB5JX\nNsRtn7C+IvVcDy122aL3YiUCDQKBgQDe9fHlE+5gkpf0Ihgjewgy2FsSaPGTU/vO\nMM5DgUnXHAH8GQS0ngQxljJfe5y1ZF8miA6t0cTwbciNywL4J+M3Apt80c+zzLP3\nZqCk5wNVURC38qExM+rNQIkpVn6IC1EBsezWoDwFwoM9BBytNa4vUWowiihfCyvh\nQ/5boVfFbQKBgQCU9hmauu3F+AgLeMVShpIl1k/3uR88qDK1exH1tc38V+K+5w8R\nZ/ApPhx8AOILq6q0xR8ufqO3RMJsaUNs27khHGR1DCnezLpbCq8FbDxgzjGf5XqK\n7I6Enc7y03+6Kff+fy1EQu/Qc4bNryarKnET2yMeXNQYgcN6pcPVaPsI7QKBgQC7\nIHhw5xV+gAqAn8zamnv7EJL/FI0MNcR0/YlgJrauj5cq2mSUorqqU4DbmoefxioF\n0NNhF1nO4JUeTHCljfSpSsrtK7rDEN9KmRviyvCFPpBlkoGvJf+/XJbB1xJDZBwM\n7CP2zm0R+HrlTvoydYdHt3EEZDAV9O5TFhn5FaTw0QKBgQCitNfFq+yrHnVAb45b\nxBqW6tXiITFNYTcQNYzDCpEivhNfm0AmPr1kt1jJcEmGI88JArEGu0hbiTqU4Sw6\ncvxnWsYpsg4zhiFucEIwEAEWPNKnu9TB6sgcrRc3MoGY0R3Z152tT+W+rIXKgVLp\n1hXaI5tLph4iS0atnB3lsm27bw==\n-----END PRIVATE KEY-----\n"?.replace(/\\n/g, "\n");
let docPromise = null;
async function getDoc() {
  if (docPromise) return docPromise;
  if (!PRIVATE_KEY) {
    throw new Error("缺少 Google Sheet 環境變數，請在 .env 或 Vercel 中設定");
  }
  docPromise = (async () => {
    const serviceAccountAuth = new JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc;
  })();
  return docPromise;
}
async function getOrCreateSheet(sheetTitle, headerValues) {
  const doc = await getDoc();
  let sheet = doc.sheetsByTitle[sheetTitle];
  if (!sheet) {
    sheet = await doc.addSheet({ title: sheetTitle, headerValues });
  } else {
    await sheet.loadHeaderRow();
  }
  return sheet;
}
function rowToObject(row, headerList) {
  const obj = {};
  if (row._rawData && Array.isArray(row._rawData)) {
    headerList.forEach((header, index) => {
      const val = row._rawData[index];
      obj[header] = val != null ? String(val).trim() : "";
    });
  } else {
    headerList.forEach((header) => {
      const val = row[header];
      obj[header] = val != null ? String(val).trim() : "";
    });
  }
  return obj;
}
const PROGRESS_HEADERS = [
  "id",
  "student_name",
  "date",
  "current_summary",
  "problem_categories",
  "problem_summary",
  "word_count"
];
async function getProgressSheet() {
  return getOrCreateSheet("進度", PROGRESS_HEADERS);
}
async function addProgress(data) {
  const sheet = await getProgressSheet();
  const rows = await sheet.getRows();
  let maxId = 0;
  for (const r of rows) {
    const obj = rowToObject(r, PROGRESS_HEADERS);
    const n = Number(obj.id);
    if (!isNaN(n) && n > maxId) maxId = n;
  }
  const newId = String(maxId + 1);
  await sheet.addRow({
    id: newId,
    student_name: data.student_name,
    date: data.date,
    current_summary: data.current_summary,
    problem_categories: data.problem_categories,
    // 逗號分隔
    problem_summary: data.problem_summary,
    word_count: String(data.word_count)
  });
  return newId;
}
async function getAllProgress() {
  const sheet = await getProgressSheet();
  const rows = await sheet.getRows();
  return rows.map((r) => rowToObject(r, PROGRESS_HEADERS)).filter((r) => r.student_name && r.student_name.trim() !== "").map((r) => ({
    id: r.id || "",
    student_name: r.student_name,
    date: r.date || "",
    current_summary: r.current_summary || "",
    problem_categories: r.problem_categories || "",
    problem_summary: r.problem_summary || "",
    word_count: Number(r.word_count) || 0
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
}
async function getProgressById(id) {
  const all = await getAllProgress();
  return all.find((p) => p.id === id) || null;
}
const RESPONSE_HEADERS = [
  "id",
  "progress_id",
  "response_date",
  "response_content"
];
async function getResponseSheet() {
  return getOrCreateSheet("回應", RESPONSE_HEADERS);
}
async function addResponse(data) {
  const sheet = await getResponseSheet();
  const rows = await sheet.getRows();
  const newId = rows.length > 0 ? String(Number(rows[rows.length - 1].id) + 1) : "1";
  await sheet.addRow({
    id: newId,
    progress_id: data.progress_id,
    response_date: data.response_date,
    response_content: data.response_content
  });
  return newId;
}
async function getAllResponses() {
  const sheet = await getResponseSheet();
  const rows = await sheet.getRows();
  return rows.map((r) => rowToObject(r, RESPONSE_HEADERS)).filter((r) => r.progress_id && r.progress_id.trim() !== "").map((r) => ({
    id: r.id,
    progress_id: r.progress_id,
    response_date: r.response_date,
    response_content: r.response_content
  })).sort((a, b) => new Date(b.response_date) - new Date(a.response_date));
}
async function getResponsesByProgressId(progressId) {
  const all = await getAllResponses();
  return all.filter((r) => r.progress_id === progressId);
}
async function getDashboardData() {
  const allProgress = await getAllProgress();
  const grouped = {};
  for (const p of allProgress) {
    if (!grouped[p.student_name]) grouped[p.student_name] = [];
    grouped[p.student_name].push(p);
  }
  const result = [];
  for (const [student_name, progressList] of Object.entries(grouped)) {
    const latest = progressList.slice(0, 5);
    const items = [];
    for (const p of latest) {
      const responses = await getResponsesByProgressId(p.id);
      items.push({
        ...p,
        responses
      });
    }
    const wordCounts = latest.map((p) => p.word_count);
    const wordChange = wordCounts.length >= 2 ? wordCounts[0] - wordCounts[wordCounts.length - 1] : 0;
    const categoryCount = {};
    for (const p of latest) {
      const cats = p.problem_categories ? p.problem_categories.split(",").map((c) => c.trim()) : [];
      for (const cat of cats) {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      }
    }
    result.push({
      student_name,
      wordCounts,
      wordChange,
      categoryCount,
      items
    });
  }
  return result;
}

export { addProgress as a, addResponse as b, getAllResponses as c, getDashboardData as d, getProgressById as e, getResponsesByProgressId as f, getAllProgress as g };
