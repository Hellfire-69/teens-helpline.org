export type RiskSignal =
  | "self_harm"
  | "suicidal_ideation"
  | "substance_use"
  | "abuse"
  | "violence"
  | null;

export interface EscalationCheckResult {
  escalate: boolean;
  signal: RiskSignal;
}

const RISK_PATTERNS: Record<Exclude<RiskSignal, null>, RegExp[]> = {
  suicidal_ideation: [
    /\b(kill myself|kill themselves|kill himself|kill herself|kill yourself)\b/i,
    /\b(end my life|end their life|end his life|end her life)\b/i,
    /\b(end it all|commit suicide|want to die|wants to die|wanted to die)\b/i,
    /\b(go to sleep forever|not be here anymore|don'?t want to be here anymore|no reason to live)\b/i,
    /\b(better off dead|better off without me|tired of living)\b/i,
    /\b(kms|suicide|suicidal)\b/i,
    /\b(unalive|unalive myself|unalive themselves|unalive himself|unalive herself)\b/i,
    /\b(thoughts about dying|think about death|thinking about death|thinking about not existing)\b/i,
  ],
  self_harm: [
    /\b(cut|cuts|cutting) (myself|themselves|himself|herself|my wrists|their wrists)\b/i,
    /\b(hurt|hurting) (myself|themselves|himself|herself)\b/i,
    /\b(burn|burning) (myself|themselves|make myself bleed)\b/i,
    /\b(scratch|scratches|scratching) (myself|themselves|himself|herself|my arms|my legs)\b/i,
    /\b(with a (blade|razor|knife))\b/i,
    /\b(self harm|self-harm|self injury|self-injury)\b/i,
    /\b(punish myself|slitting my wrists)\b/i,
  ],
  substance_use: [
    /\b(overdose|od|take too many pills|took too many pills)\b/i,
    /\b(drink until (i|they|he|she) pass out|drink myself to sleep)\b/i,
    /\b(get high to forget|meth|heroin|fentanyl|cocaine)\b/i,
  ],
  abuse: [
    /\b(hits me|beats me|touches me|touching me)\b/i,
    /\b(molest|molested|rape|raped|abused|assaulted)\b/i,
    /\b(scared to go home|afraid to go home)\b/i,
    /\b(afraid of my (dad|mom|uncle|brother|sister|parents|stepdad|stepmom))\b/i,
    /\b(scared of my (dad|mom|uncle|brother|sister|parents|stepdad|stepmom))\b/i,
  ],
  violence: [
    /\b(kill him|kill her|kill them|kill everyone)\b/i,
    /\b(shoot up|bring a gun|stab|murder|beat (him|her|them) to death)\b/i,
  ],
};

/**
 * Checks a message against banned patterns (Escalation Layer).
 * This is a rule-based check that MUST run before any AI provider call.
 */
export function checkRiskSignal(message: string): EscalationCheckResult {
  const normalizedMsg = message.toLowerCase();

  for (const [signal, patterns] of Object.entries(RISK_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedMsg)) {
        return { escalate: true, signal: signal as RiskSignal };
      }
    }
  }

  return { escalate: false, signal: null };
}
