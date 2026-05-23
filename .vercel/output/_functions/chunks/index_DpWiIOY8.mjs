import { c as createComponent } from './astro-component_Qu8i28cA.mjs';
import 'piccolore';
import { q as renderComponent, u as renderTemplate, p as maybeRenderHead } from './entrypoint_C7_x6RCf.mjs';
import { $ as $$Layout } from './Layout_CO5xb81m.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "研究生進度回報系統 - 首頁" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="card" style="text-align:center;"> <h1 style="font-size:2rem; margin-bottom:1rem;">📚 研究生進度回報系統</h1> <p style="font-size:1.1rem; color:#4a5568; max-width:600px; margin:0 auto 2rem;">
讓研究生回報研究進度，老師登記互動過程，並以 Google Sheet 作為資料庫。
</p> <div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center;"> <a href="/progress" style="flex:1; min-width:200px; background:#e94560; color:#fff; padding:1.5rem; border-radius:12px; text-decoration:none; font-weight:700; font-size:1.1rem; transition:transform 0.2s;">
🎓 研究生登錄進度
</a> <a href="/response" style="flex:1; min-width:200px; background:#16213e; color:#fff; padding:1.5rem; border-radius:12px; text-decoration:none; font-weight:700; font-size:1.1rem; transition:transform 0.2s;">
👨‍🏫 老師回應紀錄
</a> <a href="/dashboard" style="flex:1; min-width:200px; background:#0f3460; color:#fff; padding:1.5rem; border-radius:12px; text-decoration:none; font-weight:700; font-size:1.1rem; transition:transform 0.2s;">
📊 研究進度儀錶板
</a> </div> </div> ` })}`;
}, "C:/temp/studentr/src/pages/index.astro", void 0);

const $$file = "C:/temp/studentr/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
