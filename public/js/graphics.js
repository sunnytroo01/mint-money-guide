// Animated Graphics Library for Blog Posts
// All graphics are pure HTML/CSS/JS - no image files needed!

// 1. Growth Chart Animation
function createGrowthChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const maxValue = Math.max(...data.values);
  const html = `
    <div class="graphic-growth-chart">
      <div class="chart-title">${data.title}</div>
      <div class="chart-bars">
        ${data.labels.map((label, i) => `
          <div class="chart-bar-wrapper">
            <div class="chart-bar" style="--height: ${(data.values[i] / maxValue) * 100}%; --delay: ${i * 0.1}s; --color: ${data.colors[i] || '#2C5F4F'}">
              <span class="bar-value">$${data.values[i].toLocaleString()}</span>
            </div>
            <span class="bar-label">${label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// 2. Compound Interest Animation
function createCompoundInterestAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <div class="graphic-compound-interest">
      <div class="compound-title">The Power of Compound Interest</div>
      <div class="compound-visual">
        <div class="year-stack">
          <div class="year-block" style="--delay: 0s; --height: 40px">Year 1<br>$1,100</div>
          <div class="year-block" style="--delay: 0.3s; --height: 50px">Year 5<br>$1,611</div>
          <div class="year-block" style="--delay: 0.6s; --height: 65px">Year 10<br>$2,594</div>
          <div class="year-block" style="--delay: 0.9s; --height: 85px">Year 20<br>$6,727</div>
          <div class="year-block" style="--delay: 1.2s; --height: 110px">Year 30<br>$17,449</div>
        </div>
      </div>
      <div class="compound-note">Starting with $1,000 at 10% annual return</div>
    </div>
  `;

  container.innerHTML = html;
}

// 3. Income Streams Visualization
function createIncomeStreams(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const streams = [
    { name: 'Salary', amount: '$5,000', color: '#2C5F4F' },
    { name: 'Side Business', amount: '$1,500', color: '#D4A574' },
    { name: 'Investments', amount: '$800', color: '#2C5F2D' },
    { name: 'Rental Income', amount: '$1,200', color: '#A67C52' },
    { name: 'Dividends', amount: '$400', color: '#7D9D7F' },
    { name: 'Freelancing', amount: '$900', color: '#C9A961' }
  ];

  const html = `
    <div class="graphic-income-streams">
      <div class="streams-title">Multiple Income Streams</div>
      <div class="streams-container">
        ${streams.map((stream, i) => `
          <div class="income-stream" style="--delay: ${i * 0.15}s; --color: ${stream.color}">
            <div class="stream-icon">💰</div>
            <div class="stream-name">${stream.name}</div>
            <div class="stream-amount">${stream.amount}/mo</div>
            <div class="stream-flow"></div>
          </div>
        `).join('')}
      </div>
      <div class="total-income">Total Monthly Income: $9,800</div>
    </div>
  `;

  container.innerHTML = html;
}

// 4. Investment Portfolio Pie Chart
function createPortfolioPie(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const segments = [
    { label: 'Index Funds', percent: 40, color: '#2C5F4F' },
    { label: 'Individual Stocks', percent: 25, color: '#D4A574' },
    { label: 'Real Estate', percent: 20, color: '#2C5F2D' },
    { label: 'Bonds', percent: 10, color: '#A67C52' },
    { label: 'Cash', percent: 5, color: '#E5D5C3' }
  ];

  let currentAngle = 0;
  const pieSegments = segments.map(seg => {
    const angle = (seg.percent / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...seg, startAngle, angle };
  });

  const html = `
    <div class="graphic-portfolio-pie">
      <div class="pie-title">Diversified Portfolio Allocation</div>
      <div class="pie-container">
        <svg viewBox="0 0 200 200" class="pie-chart">
          ${pieSegments.map((seg, i) => {
            const x1 = 100 + 95 * Math.cos((seg.startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 95 * Math.sin((seg.startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 95 * Math.cos((seg.startAngle + seg.angle - 90) * Math.PI / 180);
            const y2 = 100 + 95 * Math.sin((seg.startAngle + seg.angle - 90) * Math.PI / 180);
            const largeArc = seg.angle > 180 ? 1 : 0;

            return `
              <path d="M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArc} 1 ${x2} ${y2} Z"
                    fill="${seg.color}"
                    opacity="0"
                    class="pie-segment"
                    style="animation: fadeIn 0.6s ${i * 0.1}s forwards">
                <title>${seg.label}: ${seg.percent}%</title>
              </path>
            `;
          }).join('')}
        </svg>
        <div class="pie-legend">
          ${segments.map((seg, i) => `
            <div class="legend-item" style="--delay: ${i * 0.1}s">
              <div class="legend-color" style="background: ${seg.color}"></div>
              <div class="legend-label">${seg.label}</div>
              <div class="legend-percent">${seg.percent}%</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// 5. Wealth Timeline/Progress
function createWealthTimeline(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const milestones = [
    { year: 'Year 1', amount: '$10K', title: 'Emergency Fund', icon: '🛡️' },
    { year: 'Year 3', amount: '$50K', title: 'First $50K Saved', icon: '💵' },
    { year: 'Year 5', amount: '$100K', title: 'Six Figures!', icon: '🎯' },
    { year: 'Year 10', amount: '$250K', title: 'Quarter Million', icon: '📈' },
    { year: 'Year 15', amount: '$500K', title: 'Half Million', icon: '🚀' },
    { year: 'Year 20', amount: '$1M', title: 'Millionaire!', icon: '👑' }
  ];

  const html = `
    <div class="graphic-wealth-timeline">
      <div class="timeline-title">Your Wealth-Building Journey</div>
      <div class="timeline-path">
        ${milestones.map((milestone, i) => `
          <div class="timeline-milestone" style="--delay: ${i * 0.2}s">
            <div class="milestone-icon">${milestone.icon}</div>
            <div class="milestone-amount">${milestone.amount}</div>
            <div class="milestone-title">${milestone.title}</div>
            <div class="milestone-year">${milestone.year}</div>
            ${i < milestones.length - 1 ? '<div class="milestone-connector"></div>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="timeline-note">Based on consistent saving & 10% returns</div>
    </div>
  `;

  container.innerHTML = html;
}

// 6. Risk vs Return Chart
function createRiskReturnChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const investments = [
    { name: 'Savings Account', risk: 10, return: 15, color: '#2C5F2D' },
    { name: 'Bonds', risk: 25, return: 30, color: '#7D9D7F' },
    { name: 'Index Funds', risk: 45, return: 60, color: '#2C5F4F' },
    { name: 'Individual Stocks', risk: 70, return: 75, color: '#D4A574' },
    { name: 'Crypto', risk: 90, return: 85, color: '#C9A961' }
  ];

  const html = `
    <div class="graphic-risk-return">
      <div class="risk-title">Risk vs. Return</div>
      <div class="risk-chart">
        <div class="chart-y-axis">High Return</div>
        <div class="chart-grid">
          ${investments.map((inv, i) => `
            <div class="risk-point"
                 style="--x: ${inv.risk}%; --y: ${100 - inv.return}%; --delay: ${i * 0.15}s; --color: ${inv.color}">
              <div class="point-dot"></div>
              <div class="point-label">${inv.name}</div>
            </div>
          `).join('')}
        </div>
        <div class="chart-x-axis">High Risk →</div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// 7. Dollar Cost Averaging Visualization
function createDCAAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const months = [
    { month: 'Jan', price: 100, shares: 1.00 },
    { month: 'Feb', price: 80, shares: 1.25 },
    { month: 'Mar', price: 90, shares: 1.11 },
    { month: 'Apr', price: 110, shares: 0.91 },
    { month: 'May', price: 95, shares: 1.05 },
    { month: 'Jun', price: 105, shares: 0.95 }
  ];

  const html = `
    <div class="graphic-dca">
      <div class="dca-title">Dollar Cost Averaging: $100/month</div>
      <div class="dca-chart">
        ${months.map((m, i) => `
          <div class="dca-month" style="--delay: ${i * 0.2}s">
            <div class="dca-bar" style="--height: ${m.price}%; --color: ${m.price > 100 ? '#D4A574' : '#2C5F2D'}">
              <span class="dca-price">$${m.price}</span>
            </div>
            <div class="dca-shares">${m.shares.toFixed(2)} shares</div>
            <div class="dca-label">${m.month}</div>
          </div>
        `).join('')}
      </div>
      <div class="dca-result">Total: ${months.reduce((sum, m) => sum + m.shares, 0).toFixed(2)} shares for $600</div>
    </div>
  `;

  container.innerHTML = html;
}

// Auto-initialize graphics on page load
document.addEventListener('DOMContentLoaded', () => {
  // Look for data attributes and auto-create graphics
  document.querySelectorAll('[data-graphic]').forEach(el => {
    const type = el.getAttribute('data-graphic');
    const id = el.id;

    switch(type) {
      case 'compound-interest':
        createCompoundInterestAnimation(id);
        break;
      case 'income-streams':
        createIncomeStreams(id);
        break;
      case 'portfolio-pie':
        createPortfolioPie(id);
        break;
      case 'wealth-timeline':
        createWealthTimeline(id);
        break;
      case 'risk-return':
        createRiskReturnChart(id);
        break;
      case 'dca':
        createDCAAnimation(id);
        break;
    }
  });
});
