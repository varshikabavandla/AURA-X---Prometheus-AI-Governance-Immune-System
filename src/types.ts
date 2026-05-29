/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AgentType {
  // Target Agents
  CUSTOMER_SUPPORT = "customer_support",
  HR = "hr",
  FINANCE = "finance",
  SALES = "sales",

  // Governance Layers
  SECURITY = "security",
  RISK = "risk",
  POLICY = "policy",
  COMPLIANCE = "compliance",
  REMEDIATION = "remediation",
  LEARNING = "learning",
  DRIFT = "drift",
  EXECUTIVE = "executive"
}

export enum ThreatSeverity {
  INFO = "INFO",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export interface EnterpriseAgent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  isEnabled: boolean;
  systemPrompt: string;
  allowedTools: string[];
  status: "idle" | "running" | "blocked" | "recovered";
}

export interface ThreatReport {
  detected: boolean;
  category: string;
  severity: ThreatSeverity;
  reason: string;
  patternsIdentified: string[];
}

export interface RiskReport {
  score: number; // 0 - 100
  businessImpact: string;
  vulnerabilitySource: string;
  recommendedActions: string[];
}

export interface PolicyRule {
  id: string;
  name: string;
  triggerCondition: string;
  actionType: "BLOCK" | "ESCALATE" | "ALLOW" | "ALERT";
  active: boolean;
}

export interface PolicyDecision {
  ruleMatched: string;
  decision: "BLOCK" | "ESCALATE" | "ALLOW";
  justification: string;
}

export interface ComplianceReport {
  status: "COMPLIANT" | "NON_COMPLIANT";
  violations: string[];
  gdprArticlesReferenced: string[];
  auditReport: string;
}

export interface RemediationReport {
  actionsTaken: string[];
  sessionStatus: "REVOKED" | "STANDBY" | "BLOCKED" | "CREDENTIALS_ROTATED";
  timestamp: string;
}

export interface LearningReport {
  patternStored: string;
  categoryClustering: string;
  knowledgeBaseId: string;
  updatedDetectionSignature: string;
}

export interface DriftReport {
  driftScore: number; // 0 - 100
  reasoningDegradation: string;
  hallucinationIndex: number; // 0 - 100
  behavioralAnalysis: string;
}

export interface ExecutiveReport {
  summary: string;
  boardMitigationStatement: string;
  governanceMaturityRating: string;
  recommendedBudgetFocus: string;
}

// Spark spans represent the tracing payload for Arize Phoenix observability
export interface TraceSpan {
  id: string;
  parentId: string | null;
  name: string;
  agentType: AgentType;
  startTime: string;
  endTime: string;
  status: "OK" | "ERROR";
  attributes: {
    input?: string;
    output?: any;
    tokensEvaluated?: number;
    latencyMs?: number;
    evaluationHallucination?: number;
    evaluationToxicity?: number;
    [key: string]: any;
  };
}

export interface GovernanceIncident {
  id: string;
  timestamp: string;
  targetAgent: AgentType;
  prompt: string;
  threat: ThreatReport;
  risk: RiskReport;
  policy: PolicyDecision;
  compliance: ComplianceReport;
  remediation: RemediationReport;
  learning: LearningReport;
  drift: DriftReport;
  executive: ExecutiveReport;
  traces: TraceSpan[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  status: "SUCCESS" | "BLOCKED" | "ALERT" | "FAILED";
  details: string;
}

export interface DatabaseState {
  agents: EnterpriseAgent[];
  incidents: GovernanceIncident[];
  audit_logs: AuditLog[];
  policies: PolicyRule[];
  knowledge_base: {
    id: string;
    pattern: string;
    category: string;
    signature: string;
    addedAt: string;
  }[];
}
