import { e as getProgressById, f as getResponsesByProgressId } from './sheet_M9I73DVY.mjs';

async function GET({ params }) {
  try {
    const { id } = params;
    const progress = await getProgressById(id);
    if (!progress) {
      return new Response(JSON.stringify({ error: "找不到該筆進度" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const responses = await getResponsesByProgressId(id);
    return new Response(JSON.stringify({ ...progress, responses }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
