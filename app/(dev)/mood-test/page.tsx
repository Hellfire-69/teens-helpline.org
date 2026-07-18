/**
 * DEV-ONLY TEST HARNESS: Mood Engine
 * 
 * Minimal, unstyled test page to verify Mood Engine recommendations,
 * Escalation Layer short-circuiting, and database persistence rules 
 * for both logged-in and anonymous sessions.
 * 
 * NOT a shipped feature. Do not style or link in navigation.
 */
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function MoodTestPage() {
  const supabase = createClient();
  const [authState, setAuthState] = useState<"Loading" | "Guest" | "Anonymous" | "Logged In">("Loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Auth Inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Mood Form
  const [moodValue, setMoodValue] = useState("Happy");
  const [note, setNote] = useState("");
  const [concern, setConcern] = useState("");
  
  // API State
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      updateAuthState(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateAuthState(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const updateAuthState = (user: { id: string; is_anonymous?: boolean; email?: string } | null) => {
    if (!user) {
      setAuthState("Guest");
      setUserEmail(null);
      setUserId(null);
    } else if (user.is_anonymous) {
      setAuthState("Anonymous");
      setUserEmail(null);
      setUserId(user.id);
    } else {
      setAuthState("Logged In");
      setUserEmail(user.email || "No Email");
      setUserId(user.id);
    }
  };

  const handleRegister = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signUp({ email: emailInput, password: passwordInput });
    if (error) {
      setAuthError(error.message);
    } else {
      // SUCCESS! We do NOT manually insert into `profiles` here.
      // Next.js server-side logic (features/auth/service.ts -> getCurrentUserWithRole) 
      // will securely auto-create the profile using the admin client the next time we hit an API.
    }
  };

  const handleLogin = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email: emailInput, password: passwordInput });
    if (error) setAuthError(error.message);
  };

  const handleAnonLogin = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signInAnonymously();
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setResponse(null);

    const payload = {
      mood_value: moodValue,
      note: note.trim() || undefined,
      concern: concern || undefined,
    };

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "monospace" }}>
      <h1>DEV ONLY: Mood Engine Test Harness</h1>
      <p style={{ color: "red" }}>Warning: This is a raw testing page. Do not ship this UI.</p>
      
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
        <h2>Auth State: {authState}</h2>
        {userId && <p>User ID: {userId}</p>}
        {userEmail && <p>Email: {userEmail}</p>}
        
        {authState === "Guest" && (
          <div style={{ marginTop: "10px" }}>
            <input 
              placeholder="Test Email" 
              value={emailInput} onChange={e => setEmailInput(e.target.value)} 
              style={{ marginRight: "5px" }} 
            />
            <input 
              placeholder="Test Password" 
              type="password" 
              value={passwordInput} onChange={e => setPasswordInput(e.target.value)} 
              style={{ marginRight: "5px" }} 
            />
            <button onClick={handleLogin} style={{ marginRight: "5px" }}>Login</button>
            <button onClick={handleRegister} style={{ marginRight: "5px" }}>Register</button>
            <button onClick={handleAnonLogin}>Sign in Anonymously</button>
          </div>
        )}
        
        {authState !== "Guest" && authState !== "Loading" && (
          <button onClick={handleLogout} style={{ marginTop: "10px" }}>Sign Out</button>
        )}
        
        {authError && <p style={{ color: "red" }}>Auth Error: {authError}</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid #ccc", padding: "10px" }}>
        <h2>Submit Mood Entry</h2>
        
        <label>
          Mood Value:
          <select value={moodValue} onChange={e => setMoodValue(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="Happy">Happy</option>
            <option value="Okay">Okay</option>
            <option value="Sad">Sad</option>
            <option value="Overwhelmed">Overwhelmed</option>
            <option value="Anxious">Anxious</option>
          </select>
        </label>

        <label>
          Concern (Optional):
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">(None)</option>
            <option value="Academic Stress">Academic Stress</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Career">Career</option>
            <option value="Identity">Identity</option>
            <option value="Bullying">Bullying</option>
            <option value="Just Exploring">Just Exploring</option>
          </select>
        </label>

        <label>
          Note (Optional risk trigger):
          <textarea 
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Type a note (e.g. 'I want to end it all' to test escalation)"
            style={{ width: "100%", marginTop: "5px", height: "80px" }}
          />
        </label>

        <button type="submit" disabled={loading} style={{ alignSelf: "flex-start", padding: "5px 15px" }}>
          {loading ? "Submitting..." : "Submit to /api/mood"}
        </button>
      </form>

      {apiError && <div style={{ color: "red", marginTop: "20px" }}>API Error: {apiError}</div>}

      {response && (
        <div style={{ marginTop: "20px", border: "1px solid #333", padding: "10px", backgroundColor: "#f9f9f9" }}>
          <h3>Raw JSON Response</h3>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {JSON.stringify(response, null, 2)}
          </pre>
          
          {response.data && !response.data.escalation && (
            <div style={{ marginTop: "15px" }}>
              <h4>Study Hub Deep Link Test</h4>
              <button 
                onClick={async () => {
                  const concernToSlug: Record<string, string> = {
                    "Academic Stress": "academic-stress",
                    "Family": "family-concerns",
                    "Friends": "friendships-relationships",
                    "Career": "career-exploration",
                    "Identity": "confidence-identity",
                    "Bullying": "bullying",
                  };
                  const category = concernToSlug[concern] || "";
                  const contentType = response.data.recommendationCategory;
                  
                  if (contentType === "peer-support") {
                    window.location.href = "/peer-support";
                    return;
                  }
                  
                  // Fetch the matching resource via API
                  const url = `/api/resources?limit=1${category ? `&category=${category}` : ""}&contentType=${contentType}`;
                  const res = await fetch(url);
                  const data = await res.json();
                  
                  if (data.success && data.data.length > 0) {
                    const resource = data.data[0];
                    window.location.href = `/study-hub/${resource.category.slug}/${resource.slug}`;
                  } else {
                    alert("No matching resource found for: " + url);
                  }
                }}
              >
                Go to Recommended Resource
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
