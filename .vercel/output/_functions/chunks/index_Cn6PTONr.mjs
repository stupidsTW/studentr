import { g as getAllProgress, a as addProgress } from './sheet_M9I73DVY.mjs';

async function GET() {
  try {
    const data = await getAllProgress();
    console.log("[progress API] data count:", data.length);
    if (data.length > 0) {
      console.log("[progress API] first row:", JSON.stringify(data[0]));
    } else {
      console.log("[progress API] data is empty");
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("[progress API] error:", e.message, e.stack);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function POST({ request }) {
  try {
    const body = await request.json();
    const id = await addProgress(body);
    return new Response(JSON.stringify({ id }), {
      status: 201,
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
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
