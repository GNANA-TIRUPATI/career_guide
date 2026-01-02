import Groq from 'groq-sdk';

// Initialize Groq client with API key from environment
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side usage
});

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatbotContext {
    userDomain?: string;
    assessmentResult?: any;
    userName?: string;
    currentModule?: string;
}

/**
 * Extract username from user message if they introduce themselves
 */
export function extractUsername(message: string): string | null {
    // Patterns to detect username introduction
    const patterns = [
        /my name is (\w+)/i,
        /i'm (\w+)/i,
        /i am (\w+)/i,
        /call me (\w+)/i,
        /this is (\w+)/i,
    ];

    for (const pattern of patterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

/**
 * Generate system prompt based on context
 */
function generateSystemPrompt(context?: ChatbotContext): string {
    const basePrompt = `You are "Personal Guider", an intelligent AI assistant for the Hidden Strength Identifier platform. 
You help users understand their cognitive strengths, career paths, and provide personalized guidance.

Your capabilities:
- Explain assessment results and predictions
- Provide career advice based on identified strengths
- Answer questions about the ML-powered analysis
- Help users navigate any module or feature they're struggling with
- Collect user feedback constructively
- Offer learning path recommendations
- Remember user's name when they tell you

Be professional, encouraging, and insightful. Keep responses concise (2-3 paragraphs max).
Always address users by their name if you know it.`;

    let contextualPrompt = basePrompt;

    if (context?.userName) {
        contextualPrompt += `\n\nUser's name: ${context.userName}. Always address them by name when appropriate.`;
    }

    if (context?.userDomain) {
        contextualPrompt += `\n\nUser's domain of interest: ${context.userDomain}. Tailor your advice to this domain.`;
    }

    if (context?.currentModule) {
        contextualPrompt += `\n\nUser is currently in: ${context.currentModule} module. Provide specific help for this section if needed.`;
    }

    return contextualPrompt;
}

/**
 * Send a message to Groq AI and get response
 */
export async function sendChatMessage(
    messages: ChatMessage[],
    context?: ChatbotContext
): Promise<string> {
    try {
        // Add system message if not present
        const systemMessage: ChatMessage = {
            role: 'system',
            content: generateSystemPrompt(context),
        };

        const allMessages = [systemMessage, ...messages];

        const completion = await groq.chat.completions.create({
            messages: allMessages,
            model: 'llama-3.3-70b-versatile', // Fast and capable model
            temperature: 0.7,
            max_tokens: 500,
            top_p: 0.9,
        });

        return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error('Failed to get AI response. Please check your connection and try again.');
    }
}

/**
 * Generate prediction explanation using AI
 */
export async function explainPrediction(
    strengthName: string,
    percentage: number,
    userDomain?: string
): Promise<string> {
    const messages: ChatMessage[] = [
        {
            role: 'user',
            content: `Explain why someone with ${percentage}% ${strengthName} strength would excel in ${userDomain || 'their field'}. Be specific and encouraging.`,
        },
    ];

    return sendChatMessage(messages);
}

/**
 * Get career recommendations using AI
 */
export async function getCareerAdvice(
    primaryStrength: string,
    secondaryStrengths: string[],
    userDomain?: string
): Promise<string> {
    const messages: ChatMessage[] = [
        {
            role: 'user',
            content: `Given primary strength: ${primaryStrength}, and secondary strengths: ${secondaryStrengths.join(', ')}, suggest 3 specific career paths${userDomain ? ` in ${userDomain}` : ''}. Be concise.`,
        },
    ];

    return sendChatMessage(messages);
}

/**
 * Process user feedback with AI
 */
export async function processFeedback(
    feedback: string,
    rating: number
): Promise<string> {
    const messages: ChatMessage[] = [
        {
            role: 'user',
            content: `User gave ${rating}/5 rating with feedback: "${feedback}". Provide a brief, empathetic acknowledgment and ask if they'd like more personalized guidance.`,
        },
    ];

    return sendChatMessage(messages);
}
