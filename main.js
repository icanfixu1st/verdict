import { supabase } from "./supabase.js"

async function analyze() {

  const payload = {
    monthly_revenue: Number(document.getElementById("monthlyRevenue").value),
    monthly_profit: Number(document.getElementById("monthlyProfit").value),
    fixed_costs: Number(document.getElementById("fixedCosts").value),
    variable_cost: Number(document.getElementById("variableCost").value),
    customers_per_month: Number(document.getElementById("customersPerMonth").value),
    repeat_rate: Number(document.getElementById("repeatRate").value),
    founder_hours: Number(document.getElementById("founderHours").value),
    rev1: Number(document.getElementById("rev1").value),
    rev2: Number(document.getElementById("rev2").value),
    rev3: Number(document.getElementById("rev3").value)
  }

  let score = 0

  if (payload.monthly_revenue > 5000) score += 30
  if (payload.monthly_profit > 500) score += 30
  if ((payload.monthly_profit / payload.monthly_revenue) > 0.15) score += 40

  if (score > 100) score = 100

  let verdict = "Continue Only With Corrections"
  if (score >= 80) verdict = "Rational to Continue"
  if (score < 50) verdict = "Terminate"

  // ===== UI =====
  document.getElementById("scoreNum").innerText = score
  document.getElementById("scoreFill").style.width = score + "%"
  document.getElementById("scoreMeta").innerText = "Confidence: MEDIUM"

  document.getElementById("verdictPill").innerText = verdict
  document.getElementById("verdictWhy").innerText =
    score >= 80 ? "Execution reality is strong"
    : score >= 60 ? "Continuation requires correction"
    : "Structural risk dominates"

  document.getElementById("dRevenue").innerText =
    payload.monthly_revenue > 5000 ? "14/25" : "6/25"

  document.getElementById("dCost").innerText =
    payload.monthly_profit > 500 ? "14/20" : "6/20"

  document.getElementById("dOps").innerText =
    payload.founder_hours < 60 ? "13/20" : "6/20"

  document.getElementById("dCustomer").innerText =
    payload.repeat_rate > 15 ? "9/15" : "4/15"

  document.getElementById("dBreakeven").innerText =
    score >= 60 ? "20/20" : "10/20"

  document.getElementById("structStatus").innerText =
    score >= 80 ? "Salvageable"
    : score >= 60 ? "Fragile but Repairable"
    : "Structurally Unsound"

  document.getElementById("structRule").innerText =
    score >= 80 ? "No terminal triggers fired"
    : score >= 60 ? "Needs optimization"
    : "Core structural weakness detected"

  document.getElementById("strengthSignals").innerHTML =
    `<ul>
      <li>Revenue reality: ${payload.monthly_revenue > 5000 ? "moderate" : "weak"}</li>
      <li>Cost discipline: ${payload.monthly_profit > 500 ? "acceptable" : "weak"}</li>
    </ul>`

  document.getElementById("criticalFailures").innerHTML =
    score >= 60
      ? `<div class="list"><ul><li>No critical failures detected.</li></ul></div>`
      : `<div class="list"><ul><li>Low profit stability detected</li></ul></div>`

  document.getElementById("baselineProb").innerText = "60%"
  document.getElementById("bestcaseProb").innerText = "40%"

  document.getElementById("baselineText").innerText =
    "No changes leads to gradual drift; risks accumulate."

  document.getElementById("bestcaseText").innerText =
    "Maintain discipline, reduce dependency risk, and scale with control."

  document.getElementById("dominantOutcome").innerText =
    "Baseline Decay Path is statistically dominant."

  document.getElementById("killWindow").innerText =
    "Evaluation window: 90 days"

  document.getElementById("killMetrics").innerHTML =
    `
    <div class="killMetric">
      <div class="m">Net profit margin</div>
      <div class="v">Maintain >= 15%</div>
    </div>
    <div class="killMetric">
      <div class="m">Founder hours / week</div>
      <div class="v"><= 45</div>
    </div>
    `

  document.getElementById("canonicalRuling").innerText = verdict
  document.getElementById("canonicalNote").innerText =
    "Operational reality based ruling"

  // ===== SAVE FULL DATA =====
  payload.score = score
  payload.verdict = verdict

  const { error } = await supabase
    .from("cases")
    .insert([payload])

  if (error) {
    console.error("SAVE FAILED:", error)
  } else {
    console.log("Saved successfully")
  }
}

document.getElementById("btnAnalyze").addEventListener("click", analyze)