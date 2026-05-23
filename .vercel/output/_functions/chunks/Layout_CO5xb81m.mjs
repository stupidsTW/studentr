import { c as createComponent } from './astro-component_Qu8i28cA.mjs';
import 'piccolore';
import { k as createRenderInstruction, j as addAttribute, s as renderHead, t as renderSlot, u as renderTemplate } from './entrypoint_C7_x6RCf.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="zh-TW"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title || "研究生進度回報系統"}</title>${renderHead()}</head> <body> <nav> <a href="/" class="brand">📚 研究進度</a> <a href="/progress" id="nav-progress">研究生登錄</a> <a href="/response" id="nav-response">老師回應</a> <a href="/dashboard" id="nav-dashboard">儀錶板</a> </nav> <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "C:/temp/studentr/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/temp/studentr/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
