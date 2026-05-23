import { c as createComponent } from './astro-component_Qu8i28cA.mjs';
import 'piccolore';
import { q as renderComponent, u as renderTemplate, p as maybeRenderHead } from './entrypoint_C7_x6RCf.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CO5xb81m.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "研究進度儀錶板" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="passwordGate" class="card" style="max-width: 420px; margin: 0 auto 1.5rem; text-align: center;"> <h2 style="border-bottom: none; margin-bottom: 0.5rem;">🔒 老師專用區域</h2> <p style="color: #718096; font-size: 0.95rem;">請輸入密碼以查看研究進度儀錶板</p> <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center; margin-top: 1rem;"> <input type="password" id="teacherPassword" placeholder="輸入老師密碼" style="max-width: 220px;"> <button type="button" id="unlockBtn" style="margin-top: 0; padding: 0.6rem 1.2rem;">解鎖</button> </div> <div id="pwError" style="color: #e94560; font-size: 0.85rem; margin-top: 0.5rem; display: none;"></div> </div> <div id="protectedContent" style="display: none;"> <div class="card"> <h2>📊 研究進度儀錶板</h2> <p style="color:#718096; margin-bottom:1rem;">以研究生為單位，顯示最近5筆的進度與回應資訊彙整。</p> <div id="dashboardContent">載入中...</div> </div> ${renderScript($$result2, "C:/temp/studentr/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")} </div>  ` })}`;
}, "C:/temp/studentr/src/pages/dashboard.astro", void 0);

const $$file = "C:/temp/studentr/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
