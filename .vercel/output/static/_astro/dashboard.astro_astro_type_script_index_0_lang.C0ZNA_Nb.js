async function s(){const r=document.getElementById("dashboardContent");try{const n=await(await fetch("/api/dashboard")).json();if(n&&n.error)throw new Error(n.error);if(!Array.isArray(n)||!n.length){r.innerHTML='<p style="color:#718096;">尚無資料</p>';return}let i="";for(const t of n){const f=t.items[0];i+=`<div style="border:1px solid #e2e8f0; border-radius:12px; padding:1.2rem; margin-bottom:1.5rem; background:#fff;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <h3 style="color:#1a1a2e; font-size:1.2rem;">🎓 ${t.student_name}</h3>
              <span style="font-size:0.85rem; color:#718096;">最近 ${t.items.length} 筆進度</span>
            </div>

            <!-- 字數變化 -->
            <div style="margin-top:0.8rem; padding:0.8rem; background:#f7fafc; border-radius:8px;">
              <strong>📈 字數變化：</strong>
              <span>${t.wordCounts.join(" → ")}</span>
              <span style="margin-left:0.5rem; font-weight:700; color:${t.wordChange>=0?"#22543d":"#822727"}">
                (${t.wordChange>=0?"+":""}${t.wordChange})
              </span>
            </div>

            <!-- 問題分類統計 -->
            <div style="margin-top:0.8rem;">
              <strong>🏷️ 問題分類統計：</strong>
              <div style="margin-top:0.3rem;">
                ${Object.entries(t.categoryCount).map(([e,o])=>o>0?`<span class="badge" style="background:#e94560; color:#fff;">${e} (${o})</span>`:"").join("")}
                ${Object.keys(t.categoryCount).length===0?'<span style="color:#a0aec0; font-size:0.85rem;">無分類資料</span>':""}
              </div>
            </div>

            <!-- 成果概述列表 -->
            <div style="margin-top:0.8rem;">
              <strong>📌 成果概述：</strong>
              <ul style="margin-top:0.3rem; padding-left:1.2rem; font-size:0.9rem;">
                ${t.items.map(e=>`<li style="margin-bottom:0.3rem;"><strong>${e.date}</strong>：${e.current_summary}</li>`).join("")}
              </ul>
            </div>

            <!-- 問題概述列表 -->
            <div style="margin-top:0.8rem;">
              <strong>⚠️ 問題概述：</strong>
              <ul style="margin-top:0.3rem; padding-left:1.2rem; font-size:0.9rem;">
                ${t.items.map(e=>`<li style="margin-bottom:0.3rem;"><strong>${e.date}</strong>：${e.problem_summary}</li>`).join("")}
              </ul>
            </div>

            <!-- 回應紀錄 -->
            <div style="margin-top:0.8rem; padding:0.8rem; background:#fefcf0; border-radius:8px; border-left:3px solid #e94560;">
              <strong>💬 回應紀錄：</strong>
              ${t.items.some(e=>e.responses&&e.responses.length>0)?t.items.map(e=>!e.responses||e.responses.length===0?"":e.responses.map(o=>`<div style="margin-top:0.3rem; font-size:0.85rem;">
                        <span style="color:#718096;">${o.response_date}</span>：${o.response_content}
                      </div>`).join("")).join(""):'<div style="color:#a0aec0; font-size:0.85rem; margin-top:0.3rem;">尚無老師回應</div>'}
            </div>

            <details style="margin-top:0.8rem;">
              <summary style="cursor:pointer; color:#e94560; font-weight:600; font-size:0.85rem;">查看原始進度資料</summary>
              <table style="margin-top:0.5rem; font-size:0.8rem;">
                <thead><tr><th>ID</th><th>日期</th><th>字數</th><th>分類</th></tr></thead>
                <tbody>${t.items.map(e=>`<tr>
                  <td>${e.id}</td>
                  <td>${e.date}</td>
                  <td>${e.word_count}</td>
                  <td>${e.problem_categories||"-"}</td>
                </tr>`).join("")}</tbody>
              </table>
            </details>
          </div>`}r.innerHTML=i}catch(d){r.innerHTML=`<p class="message error">無法載入儀錶板資料：${d.message}</p>`}}s();const p="13571357",c=document.getElementById("passwordGate"),g=document.getElementById("protectedContent"),a=document.getElementById("teacherPassword"),y=document.getElementById("unlockBtn"),l=document.getElementById("pwError");function m(){a.value===p?(c.style.display="none",g.style.display="block",typeof s=="function"&&s()):(l.textContent="密碼錯誤，請重試",l.style.display="block")}y.addEventListener("click",m);a.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),m())});setTimeout(()=>a.focus(),100);
