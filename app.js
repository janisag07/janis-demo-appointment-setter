/* ── AI Appointment Setter — App Logic ── */

// ─── Clock ───
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
updateClock();
setInterval(updateClock, 1000);

// ─── Navigation ───
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const topbarNav = document.querySelector('.topbar-nav');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => topbarNav.classList.toggle('open'));
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
    topbarNav.classList.remove('open');
  });
});

// ─── Helpers ───
function getRepById(id) { return REPS.find(r => r.id === id); }
function getCampaignById(id) { return CAMPAIGNS.find(c => c.id === id); }

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

// ─── Dashboard: Activity Chart ───
function renderActivityChart() {
  const container = document.getElementById('activity-chart');
  const maxVal = Math.max(...HOURLY_ACTIVITY.map(h => h.contacted));

  let html = '';
  HOURLY_ACTIVITY.forEach(h => {
    const cH = (h.contacted / maxVal * 140);
    const rH = (h.responses / maxVal * 140);
    const bH = (h.booked / maxVal * 140);
    html += `
      <div class="chart-bar-group">
        <div class="chart-bars">
          <div class="chart-bar bar-contacted" style="height:${cH}px" title="Contacted: ${h.contacted}"></div>
          <div class="chart-bar bar-responses" style="height:${rH}px" title="Responses: ${h.responses}"></div>
          <div class="chart-bar bar-booked" style="height:${bH}px" title="Booked: ${h.booked}"></div>
        </div>
        <span class="chart-hour">${h.hour}</span>
      </div>`;
  });
  html += `</div>
    <div class="chart-legend">
      <div class="chart-legend-item"><span class="chart-legend-dot" style="background:var(--info)"></span>Contacted</div>
      <div class="chart-legend-item"><span class="chart-legend-dot" style="background:var(--cyan)"></span>Responses</div>
      <div class="chart-legend-item"><span class="chart-legend-dot" style="background:var(--accent)"></span>Booked</div>
    </div>`;
  container.innerHTML = html;
}

// ─── Dashboard: Rep Leaderboard ───
function renderRepBoard() {
  const sorted = [...REPS].sort((a, b) => b.booked - a.booked);
  const container = document.getElementById('rep-board');
  container.innerHTML = sorted.map((r, i) => `
    <div class="rep-row">
      <span class="rep-rank rank-${i + 1}">#${i + 1}</span>
      <div class="rep-avatar">${r.avatar}</div>
      <div class="rep-info">
        <div class="rep-name">${r.name}</div>
        <div class="rep-stats">${r.conversion} converted &middot; ${r.active} active leads</div>
      </div>
      <div class="rep-booked">${r.booked}</div>
    </div>
  `).join('');
}

// ─── Dashboard: Upcoming Calls ───
function renderUpcomingCalls() {
  const container = document.getElementById('upcoming-calls');
  container.innerHTML = BOOKED_CALLS.map(c => `
    <div class="upcoming-item call-${c.status}">
      <div style="flex:1">
        <div class="upcoming-lead">${c.lead}</div>
        <div class="upcoming-company">${c.company}</div>
      </div>
      <div style="text-align:right">
        <div class="upcoming-time">${c.time}</div>
        <div class="upcoming-rep">${c.rep}</div>
      </div>
    </div>
  `).join('');
}

// ─── Dashboard: Pipeline Bars ───
function renderPipeline() {
  const counts = {};
  LEADS.forEach(l => { counts[l.status] = (counts[l.status] || 0) + 1; });
  const stages = ['new', 'contacted', 'engaged', 'meeting-set', 'booked', 'converted', 'no-show', 'lost'];
  const colors = {
    'new': 'var(--info)', contacted: 'var(--cyan)', engaged: 'var(--purple)',
    'meeting-set': 'var(--accent)', booked: 'var(--success)', converted: '#16a34a',
    'no-show': 'var(--warning)', lost: 'var(--danger)',
  };
  const maxCount = Math.max(...Object.values(counts), 1);
  const container = document.getElementById('pipeline-bars');
  container.innerHTML = stages.map(s => {
    const c = counts[s] || 0;
    const pct = (c / maxCount * 100);
    return `
      <div class="pipe-row">
        <span class="pipe-label">${s.replace('-', ' ')}</span>
        <div class="pipe-track"><div class="pipe-fill" style="width:${pct}%;background:${colors[s]}"></div></div>
        <span class="pipe-count">${c}</span>
      </div>`;
  }).join('');
}

// ─── Campaigns View ───
function renderCampaigns(filter = 'all') {
  const filtered = filter === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.status === filter);
  const container = document.getElementById('campaigns-grid');
  container.innerHTML = filtered.map(c => {
    const rep = getRepById(c.rep);
    return `
      <div class="campaign-card">
        <div class="campaign-top">
          <div>
            <div class="campaign-name">${c.name}</div>
            <div class="campaign-channel">${c.channel} &middot; Since ${c.startDate} &middot; Rep: ${rep ? rep.name : 'N/A'}</div>
          </div>
          <span class="campaign-status cstatus-${c.status}">${c.status}</span>
        </div>
        <div class="campaign-metrics">
          <div class="cm-item"><span class="cm-value" style="color:var(--accent)">${c.conversionRate}%</span><span class="cm-label">Conversion</span></div>
          <div class="cm-item"><span class="cm-value" style="color:var(--cyan)">${c.responseRate}%</span><span class="cm-label">Response Rate</span></div>
          <div class="cm-item"><span class="cm-value" style="color:var(--success)">${c.bookingRate}%</span><span class="cm-label">Booking Rate</span></div>
        </div>
        <div class="campaign-funnel">
          <div class="funnel-row">
            <span class="funnel-label">Contacted</span>
            <div class="funnel-track"><div class="funnel-fill" style="width:${(c.contacted / c.totalLeads * 100)}%;background:var(--info)"></div></div>
            <span class="funnel-num">${c.contacted}</span>
          </div>
          <div class="funnel-row">
            <span class="funnel-label">Engaged</span>
            <div class="funnel-track"><div class="funnel-fill" style="width:${(c.engaged / c.totalLeads * 100)}%;background:var(--cyan)"></div></div>
            <span class="funnel-num">${c.engaged}</span>
          </div>
          <div class="funnel-row">
            <span class="funnel-label">Booked</span>
            <div class="funnel-track"><div class="funnel-fill" style="width:${(c.booked / c.totalLeads * 100)}%;background:var(--accent)"></div></div>
            <span class="funnel-num">${c.booked}</span>
          </div>
          <div class="funnel-row">
            <span class="funnel-label">Converted</span>
            <div class="funnel-track"><div class="funnel-fill" style="width:${(c.converted / c.totalLeads * 100)}%;background:var(--success)"></div></div>
            <span class="funnel-num">${c.converted}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

// Campaign filter pills
document.querySelectorAll('[data-cfilter]').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('[data-cfilter]').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderCampaigns(pill.dataset.cfilter);
  });
});

// ─── Leads View ───
function renderLeads(filter = 'all') {
  const filtered = filter === 'all' ? LEADS : LEADS.filter(l => l.status === filter);
  const tbody = document.getElementById('leads-tbody');
  tbody.innerHTML = filtered.map(l => {
    const campaign = getCampaignById(l.campaign);
    const rep = getRepById(l.rep);
    const scoreClass = l.score >= 75 ? 'score-high' : l.score >= 50 ? 'score-med' : 'score-low';
    return `
      <tr>
        <td><div class="lead-name">${l.name}</div><div class="lead-title">${l.title}</div></td>
        <td>${l.company}</td>
        <td><span class="lead-status ls-${l.status}">${l.status.replace('-', ' ')}</span></td>
        <td><span class="lead-score ${scoreClass}">${l.score}</span></td>
        <td>${campaign ? campaign.name : '—'}</td>
        <td>${rep ? rep.name : '—'}</td>
        <td>${l.lastTouch}</td>
        <td>${l.callTime || '—'}</td>
      </tr>`;
  }).join('');
}

document.querySelectorAll('[data-lfilter]').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('[data-lfilter]').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderLeads(pill.dataset.lfilter);
  });
});

// ─── Conversations View ───
function renderConvList(filter = 'all') {
  const container = document.getElementById('conv-list');
  const entries = Object.entries(CONVERSATIONS);
  const filtered = filter === 'all' ? entries : entries.filter(([, c]) => c.sentiment === filter);

  container.innerHTML = filtered.map(([leadId, c]) => {
    const lead = LEADS.find(l => l.id === leadId);
    const lastMsg = c.messages[c.messages.length - 1];
    return `
      <div class="conv-card" data-conv="${leadId}">
        <div class="conv-avatar sent-${c.sentiment}">${initials(c.lead)}</div>
        <div class="conv-info">
          <div class="conv-lead-name">${c.lead}</div>
          <div class="conv-preview">${lastMsg.text}</div>
          <div class="conv-meta">
            <span class="sentiment-tag sent-tag-${c.sentiment}">${c.sentiment}</span>
            <span class="outcome-tag out-${c.outcome}">${c.outcome.replace('-', ' ')}</span>
            ${c.aiHandled ? '<span class="ai-badge">AI Handled</span>' : '<span class="rep-badge">Rep Assisted</span>'}
          </div>
        </div>
      </div>`;
  }).join('');

  // Bind clicks
  container.querySelectorAll('.conv-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.conv-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      renderConvDetail(card.dataset.conv);
    });
  });
}

function renderConvDetail(leadId) {
  const conv = CONVERSATIONS[leadId];
  if (!conv) return;
  const lead = LEADS.find(l => l.id === leadId);
  const detail = document.getElementById('conv-detail');

  const senderLabels = { ai: 'AI Assistant', lead: conv.lead, rep: 'Sales Rep', system: 'System' };

  detail.innerHTML = `
    <div class="conv-detail-header">
      <div class="conv-detail-lead">
        <div class="conv-avatar sent-${conv.sentiment}" style="width:42px;height:42px;font-size:13px">${initials(conv.lead)}</div>
        <div>
          <h3>${conv.lead}</h3>
          <div style="font-size:12px;color:var(--text-dim)">${lead ? lead.company + ' &middot; ' + lead.title : ''}</div>
        </div>
      </div>
      <div class="conv-detail-badges">
        <span class="sentiment-tag sent-tag-${conv.sentiment}">${conv.sentiment}</span>
        <span class="outcome-tag out-${conv.outcome}">${conv.outcome.replace('-', ' ')}</span>
        ${conv.aiHandled ? '<span class="ai-badge">AI Handled</span>' : '<span class="rep-badge">Rep Assisted</span>'}
        ${lead && lead.callTime ? `<span style="font-size:11px;color:var(--text-dim)">Call: ${lead.callTime}</span>` : ''}
      </div>
    </div>
    <div class="conv-messages">
      ${conv.messages.map(m => `
        <div class="msg msg-${m.from}">
          <div>
            <div class="msg-sender">${senderLabels[m.from] || m.from}</div>
            <div class="msg-bubble">${m.text}</div>
            <span class="msg-time">${m.time}</span>
          </div>
        </div>
      `).join('')}
    </div>`;
}

document.querySelectorAll('[data-sfilter]').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('[data-sfilter]').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderConvList(pill.dataset.sfilter);
  });
});

// ─── Schedule View ───
function renderSchedule(filter = 'all') {
  const filtered = filter === 'all' ? BOOKED_CALLS : BOOKED_CALLS.filter(c => c.status === filter);
  const container = document.getElementById('schedule-list');
  container.innerHTML = filtered.map(c => {
    const parts = c.time.split(', ');
    const date = parts[0] || '';
    const time = parts[1] || '';
    return `
      <div class="schedule-card sched-${c.status}">
        <div class="sched-time-block">
          <div class="sched-time">${time}</div>
          <div class="sched-date">${date}</div>
        </div>
        <div class="sched-info">
          <div class="sched-lead">${c.lead}</div>
          <div class="sched-company">${c.company}</div>
          <div class="sched-campaign">${c.campaign}</div>
        </div>
        <div class="sched-rep">${c.rep}</div>
        <span class="sched-status ss-${c.status}">${c.status.replace('-', ' ')}</span>
      </div>`;
  }).join('');
}

document.querySelectorAll('[data-bfilter]').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('[data-bfilter]').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderSchedule(pill.dataset.bfilter);
  });
});

// ─── Live Simulation ───
let simInterval;
function startSimulation() {
  const kpiBooked = document.getElementById('kpi-booked');
  const kpiContacted = document.getElementById('kpi-contacted');
  let bookedCount = 36;
  let contactedBase = 1946;

  simInterval = setInterval(() => {
    // Randomly bump contacted
    contactedBase += Math.floor(Math.random() * 3) + 1;
    kpiContacted.textContent = contactedBase.toLocaleString();

    // Occasionally bump booked
    if (Math.random() < 0.25) {
      bookedCount++;
      kpiBooked.textContent = bookedCount;
      kpiBooked.style.transition = 'color .2s';
      kpiBooked.style.color = 'var(--success)';
      setTimeout(() => { kpiBooked.style.color = ''; }, 600);
    }
  }, 4000);
}

// ─── Init ───
renderActivityChart();
renderRepBoard();
renderUpcomingCalls();
renderPipeline();
renderCampaigns();
renderLeads();
renderConvList();
renderSchedule();
startSimulation();
