import { c as createComponent } from './astro-component_Qu8i28cA.mjs';
import 'piccolore';
import { q as renderComponent, u as renderTemplate, p as maybeRenderHead } from './entrypoint_C7_x6RCf.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CO5xb81m.mjs';

const $$Response = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "老師回應紀錄" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="passwordGate" class="card" style="max-width: 420px; margin: 0 auto 1.5rem; text-align: center;"> <h2 style="border-bottom: none; margin-bottom: 0.5rem;">🔒 老師專用區域</h2> <p style="color: #718096; font-size: 0.95rem;">請輸入密碼以查看與編輯回應紀錄</p> <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center; margin-top: 1rem;"> <input type="password" id="teacherPassword" placeholder="輸入老師密碼" style="max-width: 220px;"> <button type="button" id="unlockBtn" style="margin-top: 0; padding: 0.6rem 1.2rem;">解鎖</button> </div> <div id="pwError" style="color: #e94560; font-size: 0.85rem; margin-top: 0.5rem; display: none;"></div> </div> <div id="protectedContent" style="display: none;"> <div class="card"> <h2>👨‍🏫 老師回應紀錄</h2> <form id="responseForm"> <label for="student_filter">先選擇研究生</label> <select id="student_filter" required> <option value="">— 請選擇學生 —</option> </select> <label for="progress_id">選擇要回應的進度（該學生最近 5 筆）</label> <select id="progress_id" required> <option value="">— 請先選擇學生 —</option> </select> <div id="progressDetail" style="background:#f7fafc; border-radius:8px; padding:1rem; margin-top:0.5rem; display:none;"> <p><strong>學生：</strong> <span id="detail_name"></span></p> <p><strong>日期：</strong> <span id="detail_date"></span></p> <p><strong>成果：</strong> <span id="detail_summary"></span></p> <p><strong>問題：</strong> <span id="detail_problem"></span></p> <p><strong>字數：</strong> <span id="detail_words"></span></p> </div> <label for="response_date">回應日期（自動填入）</label> <input type="date" id="response_date" readonly> <label for="response_content">回應內容</label> <textarea id="response_content" placeholder="請輸入老師的回應內容..." required></textarea> <button type="submit">📤 提交回應</button> <div id="message"></div> </form> </div> <div class="card"> <h2>📋 所有回應紀錄</h2> <div id="responseList">載入中...</div> </div> ${renderScript($$result2, "C:/temp/studentr/src/pages/response.astro?astro&type=script&index=0&lang.ts")} </div>  ` })}`;
}, "C:/temp/studentr/src/pages/response.astro", void 0);

const $$file = "C:/temp/studentr/src/pages/response.astro";
const $$url = "/response";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Response,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
