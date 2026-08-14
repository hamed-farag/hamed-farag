"use client";

import { useState } from "react";

const scenarios = [
  {
    id: "mcp",
    label: "Design system × MCP",
    eyebrow: "AGENT-READY UI",
    question: "Build an alert card using only approved product patterns.",
    steps: [
      ["01", "Intent", "The agent receives the product goal, not a pile of CSS guesses."],
      ["02", "Contract", "An MCP server exposes components, tokens, examples, and constraints."],
      ["03", "Compose", "The agent selects approved primitives and assembles a valid interface."],
      ["04", "Verify", "Accessibility, visual rules, and code quality are checked before handoff."],
    ],
    output: ["AlertCard", "severity=critical", "token=surface.danger", "a11y=passed"],
  },
  {
    id: "ontology",
    label: "Ontology-driven UI",
    eyebrow: "SOFTWARE THAT KNOWS ITS DOMAIN",
    question: "Render an asset workflow without hard-coding every new object type.",
    steps: [
      ["01", "Model", "Objects, properties, links, and actions become one shared domain contract."],
      ["02", "Read", "Typed object sets give every screen a predictable query model."],
      ["03", "Render", "The component kit chooses fields and views from property metadata."],
      ["04", "Act", "Named actions validate writes, update optimistically, and leave an audit trail."],
    ],
    output: ["ObjectTable", "type=Asset", "action=acknowledge", "audit=enabled"],
  },
  {
    id: "agents",
    label: "Autonomous delivery",
    eyebrow: "GUARDRAILS BEFORE AUTONOMY",
    question: "Assign a real repository task and return to a reviewed draft pull request.",
    steps: [
      ["01", "Scope", "The task is bounded by repository rules, allowed tools, and success criteria."],
      ["02", "Build", "An agent implements inside a controlled environment with visible progress."],
      ["03", "Review", "Tests, screenshots, and a second-pass review challenge the result."],
      ["04", "Handoff", "A human receives a draft pull request with evidence, not a mystery diff."],
    ],
    output: ["branch=agent/task", "tests=passed", "review=complete", "state=draft-pr"],
  },
];

export function ArchitectureLab() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];

  const selectScenario = (id: string) => {
    setActiveId(id);
    setActiveStep(0);
  };

  return (
    <section className="architecture-lab" id="lab" aria-labelledby="lab-title">
      <div className="lab-intro">
        <p className="section-kicker"><span>●</span> INTERACTIVE ARCHITECTURE LAB</p>
        <h2 id="lab-title">Don&apos;t take my word for it. <em>Trace the system.</em></h2>
        <p>
          Pick a problem, then step through the architecture. This is the layer I care about most:
          turning a promising AI capability into a product teams can understand, operate, and trust.
        </p>
      </div>

      <div className="lab-machine">
        <div className="machine-titlebar">
          <div aria-hidden="true"><span /><span /><span /></div>
          <strong>HF_ARCHITECTURE_LAB.EXE</strong>
          <span>ONLINE</span>
        </div>

        <div className="lab-tabs" role="tablist" aria-label="Architecture scenarios">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              role="tab"
              aria-selected={active.id === scenario.id}
              className={active.id === scenario.id ? "active" : ""}
              onClick={() => selectScenario(scenario.id)}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="lab-screen" role="tabpanel">
          <div className="lab-prompt">
            <span>{active.eyebrow}</span>
            <p>&gt; {active.question}<i className="cursor-block" aria-hidden="true" /></p>
          </div>

          <div className="lab-flow" aria-label={`${active.label} architecture flow`}>
            {active.steps.map(([number, title, description], index) => (
              <button
                key={number}
                type="button"
                className={activeStep === index ? "active" : ""}
                onClick={() => setActiveStep(index)}
                aria-pressed={activeStep === index}
              >
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{description}</small>
              </button>
            ))}
          </div>

          <div className="lab-output">
            <div>
              <span>ACTIVE STEP / {active.steps[activeStep][0]}</span>
              <strong>{active.steps[activeStep][1]}</strong>
              <p>{active.steps[activeStep][2]}</p>
            </div>
            <pre aria-label="Example system output">{active.output.map((line) => <code key={line}>✓ {line}{"\n"}</code>)}</pre>
          </div>
        </div>

        <div className="machine-statusbar"><span>MODE: EXPLAINABLE</span><span>HUMAN IN THE LOOP: YES</span><span>ESC TO RESET</span></div>
      </div>
    </section>
  );
}
