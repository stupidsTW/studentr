/**
 * Google Sheet 資料庫操作工具
 *
 * 使用方式：
 * 1. 到 Google Cloud Console 建立服務帳號，取得 JSON 金鑰
 * 2. 建立 Google Sheet，記下 Sheet ID
 * 3. 將服務帳號 email 加入 Sheet 的共用對象（編輯者權限）
 * 4. 設定環境變數：
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - GOOGLE_PRIVATE_KEY
 *    - GOOGLE_SHEET_ID
 */

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// 環境變數需在 Vercel 的 Environment Variables 中設定
const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

let docPromise = null;

/** 初始化並回傳 Google Spreadsheet 連線（安全的 Promise 單例） */
async function getDoc() {
  if (docPromise) return docPromise;
  if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error("缺少 Google Sheet 環境變數，請在 .env 或 Vercel 中設定");
  }
  docPromise = (async () => {
    const serviceAccountAuth = new JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc;
  })();
  return docPromise;
}

/**
 * 取得或建立指定的 Sheet（分頁）
 * 注意：建立新分頁時才傳入 headerValues；若分頁已存在，則確保表頭正確
 */
async function getOrCreateSheet(sheetTitle, headerValues) {
  const doc = await getDoc();
  let sheet = doc.sheetsByTitle[sheetTitle];
  if (!sheet) {
    sheet = await doc.addSheet({ title: sheetTitle, headerValues });
  } else {
    // 確保已存在的分頁正確載入表頭，讓 getRows() 能正確映射欄位
    await sheet.loadHeaderRow();
  }
  return sheet;
}

/**
 * 將 GoogleSpreadsheetRow 轉成普通物件，使用 _rawData 按 header 順序提取，
 * 更穩健地處理手動編輯 Sheet 或 header 緩存問題。
 */
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

// ===================== 研究生進度 (Progress) =====================
const PROGRESS_HEADERS = [
  "id",
  "student_name",
  "date",
  "current_summary",
  "problem_categories",
  "problem_summary",
  "word_count",
];

export async function getProgressSheet() {
  return getOrCreateSheet("進度", PROGRESS_HEADERS);
}

/** 新增一筆研究生進度 */
export async function addProgress(data) {
  const sheet = await getProgressSheet();
  const rows = await sheet.getRows();

  // 更穩健的 ID 計算：取目前最大數字 ID，避免 NaN 或非數字 ID 造成問題
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
    problem_categories: data.problem_categories, // 逗號分隔
    problem_summary: data.problem_summary,
    word_count: String(data.word_count),
  });
  return newId;
}

/** 取得所有研究生進度（依日期降序） */
export async function getAllProgress() {
  const sheet = await getProgressSheet();
  const rows = await sheet.getRows();
  return rows
    .map((r) => rowToObject(r, PROGRESS_HEADERS))
    .filter((r) => r.student_name && r.student_name.trim() !== "")
    .map((r) => ({
      id: r.id || "",
      student_name: r.student_name,
      date: r.date || "",
      current_summary: r.current_summary || "",
      problem_categories: r.problem_categories || "",
      problem_summary: r.problem_summary || "",
      word_count: Number(r.word_count) || 0,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** 依 id 取得單筆進度 */
export async function getProgressById(id) {
  const all = await getAllProgress();
  return all.find((p) => p.id === id) || null;
}

/** 取得學生的進度列表 */
export async function getProgressByStudent(name) {
  const all = await getAllProgress();
  return all.filter((p) => p.student_name === name);
}

// ===================== 老師回應 (Responses) =====================
const RESPONSE_HEADERS = [
  "id",
  "progress_id",
  "response_date",
  "response_content",
];

export async function getResponseSheet() {
  return getOrCreateSheet("回應", RESPONSE_HEADERS);
}

/** 新增一筆老師回應 */
export async function addResponse(data) {
  const sheet = await getResponseSheet();
  const rows = await sheet.getRows();
  const newId =
    rows.length > 0 ? String(Number(rows[rows.length - 1].id) + 1) : "1";
  await sheet.addRow({
    id: newId,
    progress_id: data.progress_id,
    response_date: data.response_date,
    response_content: data.response_content,
  });
  return newId;
}

/** 取得所有回應 */
export async function getAllResponses() {
  const sheet = await getResponseSheet();
  const rows = await sheet.getRows();
  return rows
    .map((r) => rowToObject(r, RESPONSE_HEADERS))
    .filter((r) => r.progress_id && r.progress_id.trim() !== "")
    .map((r) => ({
      id: r.id,
      progress_id: r.progress_id,
      response_date: r.response_date,
      response_content: r.response_content,
    }))
    .sort((a, b) => new Date(b.response_date) - new Date(a.response_date));
}

/** 依 progress_id 取得回應 */
export async function getResponsesByProgressId(progressId) {
  const all = await getAllResponses();
  return all.filter((r) => r.progress_id === progressId);
}

// ===================== 儀錶板資料 =====================
/** 取得每個研究生最近5筆進度（含回應） */
export async function getDashboardData() {
  const allProgress = await getAllProgress();

  // 按學生分組
  const grouped = {};
  for (const p of allProgress) {
    if (!grouped[p.student_name]) grouped[p.student_name] = [];
    grouped[p.student_name].push(p);
  }

  const result = [];
  for (const [student_name, progressList] of Object.entries(grouped)) {
    // 取最近5筆
    const latest = progressList.slice(0, 5);

    const items = [];
    for (const p of latest) {
      const responses = await getResponsesByProgressId(p.id);
      items.push({
        ...p,
        responses,
      });
    }

    // 計算字數變化
    const wordCounts = latest.map((p) => p.word_count);
    const wordChange =
      wordCounts.length >= 2
        ? wordCounts[0] - wordCounts[wordCounts.length - 1]
        : 0;

    // 問題分類統計
    const categoryCount = {};
    for (const p of latest) {
      const cats = p.problem_categories
        ? p.problem_categories.split(",").map((c) => c.trim())
        : [];
      for (const cat of cats) {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      }
    }

    result.push({
      student_name,
      wordCounts,
      wordChange,
      categoryCount,
      items,
    });
  }

  return result;
}

// ===================== 設定 (Settings) =====================
const SETTINGS_HEADERS = ["setting_name", "setting_value"];

export async function getSettingsSheet() {
  return getOrCreateSheet("設定", SETTINGS_HEADERS);
}

/** 取得所有設定 */
export async function getAllSettings() {
  const sheet = await getSettingsSheet();
  const rows = await sheet.getRows();
  const settings = {};
  for (const r of rows) {
    settings[r.setting_name] = r.setting_value;
  }
  return settings;
}

/** 更新單一設定值 */
export async function updateSetting(name, value) {
  const sheet = await getSettingsSheet();
  const rows = await sheet.getRows();
  let found = false;
  for (const r of rows) {
    if (r.setting_name === name) {
      r.setting_value = value;
      await r.save();
      found = true;
      break;
    }
  }
  if (!found) {
    await sheet.addRow({ setting_name: name, setting_value: value });
  }
}

/** 取得「下次自動email提醒日期」設定 */
export async function getNextReminderDate() {
  const settings = await getAllSettings();
  return settings["next_reminder_date"] || "";
}

export async function setNextReminderDate(dateStr) {
  await updateSetting("next_reminder_date", dateStr);
}
