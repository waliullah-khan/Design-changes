import { WEBHOOK_URL } from '../constants';

export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('nxai_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('nxai_session_id', sessionId);
  }
  return sessionId;
};

export const sendMessageToN8N = async (text: string, sessionId: string): Promise<string> => {
  // In a real scenario, use the actual WEBHOOK_URL. 
  // For demo purposes, we simulate if the URL is not set/invalid.
  if (WEBHOOK_URL.includes('YOUR_N8N_WEBHOOK')) {
    console.warn("Using mock response. Configure WEBHOOK_URL in constants.ts");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate latency
    return `**Mock Response**: I received your message: "${text}". \n\nSince the N8N webhook isn't configured in the code, I'm simulating a successful response. \n\n*Would you like to configure the actual endpoint now?*`;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: text
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    // Support multiple output formats as per common N8N patterns
    return data.output || data.message || data.text || "I processed your request, but received no text output.";
  } catch (error) {
    console.error("N8N Error:", error);
    return "I apologize, but I'm having trouble connecting to the automation server right now. Please try again later.";
  }
};
