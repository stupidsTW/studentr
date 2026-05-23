import { c as createComponent } from './astro-component_Qu8i28cA.mjs';
import 'piccolore';
import { q as renderComponent, u as renderTemplate, p as maybeRenderHead } from './entrypoint_C7_x6RCf.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CO5xb81m.mjs';

const $$Progress = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "研究生登錄進度" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="card"> <h2>📝 研究生登錄進度</h2> <form id="progressForm"> <label for="student_name">研究生姓名</label> <select id="student_name" required> <option value="">— 請選擇 —</option> <option value="又蓁">又蓁</option> <option value="信杰">信杰</option> <option value="靜芳">靜芳</option> <option value="詠幃">詠幃</option> <option value="柏洋">柏洋</option> <option value="家瑜">家瑜</option> <option value="新惠">新惠</option> <option value="柏盛">柏盛</option> </select> <label for="date">日期（自動填入）</label> <input type="date" id="date" readonly> <label for="current_summary">目前成果概述</label> <textarea id="current_summary" placeholder="請描述目前的研究成果..." required></textarea> <label>目前問題分類（可多選）</label> <div class="checkbox-group"> <label><input type="checkbox" value="文獻回顧"> 文獻回顧</label> <label><input type="checkbox" value="研究方法"> 研究方法</label> <label><input type="checkbox" value="資料收集"> 資料收集</label> <label><input type="checkbox" value="資料分析"> 資料分析</label> <label><input type="checkbox" value="論文寫作"> 論文寫作</label> <label><input type="checkbox" value="實驗設計"> 實驗設計</label> <label><input type="checkbox" value="程式開發"> 程式開發</label> <label><input type="checkbox" value="其他"> 其他</label> </div> <label for="problem_summary">目前問題概述</label> <textarea id="problem_summary" placeholder="請描述目前遇到的困難..." required></textarea> <label for="word_count">目前累計字數</label> <input type="number" id="word_count" min="0" placeholder="請輸入目前論文已撰寫的字數" required> <button type="submit">📤 提交進度</button> <div id="message"></div> </form> </div> ${renderScript($$result2, "C:/temp/studentr/src/pages/progress.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/temp/studentr/src/pages/progress.astro", void 0);

const $$file = "C:/temp/studentr/src/pages/progress.astro";
const $$url = "/progress";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Progress,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
