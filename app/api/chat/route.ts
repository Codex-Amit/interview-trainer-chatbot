import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, profile } = body;

    const langflowEndpoint = process.env.LANGFLOW_API_ENDPOINT;
    const langflowApiKey = process.env.LANGFLOW_API_KEY;

    if (!langflowEndpoint) {
      return NextResponse.json(
        { error: "Langflow API endpoint not configured" },
        { status: 500 }
      );
    }

    // Validate that the endpoint is a proper URL
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(langflowEndpoint);
    } catch {
      return NextResponse.json(
        { 
          error: `Invalid LANGFLOW_API_ENDPOINT. Please provide a full URL like: http://localhost:7860/api/v1/run/${langflowEndpoint}` 
        },
        { status: 500 }
      );
    }

    // Construct the input message with user profile context
    const inputMessage = profile
      ? `[User Profile: Name: ${profile.name}, Experience: ${profile.experience}, Role: ${profile.role}]\n\nUser: ${message}`
      : message;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (langflowApiKey) {
      headers["Authorization"] = `Bearer ${langflowApiKey}`;
      headers["x-api-key"] = langflowApiKey;
    }

    const response = await fetch(validatedUrl.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify({
        input_value: inputMessage,
        output_type: "chat",
        input_type: "chat",
        tweaks: {},
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Langflow API error:", response.status, errorText);
      const errorMessage = response.status === 403
        ? "Langflow returned 403. Check LANGFLOW_API_KEY or LANGFLOW_SKIP_AUTH_AUTO_LOGIN."
        : "Failed to get response from Langflow.";
      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the message from Langflow response
    // Langflow typically returns the response in outputs[0].outputs[0].results.message.text
    let aiMessage = "I apologize, but I couldn't process your request. Please try again.";

    if (data.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
      aiMessage = data.outputs[0].outputs[0].results.message.text;
    } else if (data.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message) {
      aiMessage = data.outputs[0].outputs[0].messages[0].message;
    } else if (data.result) {
      aiMessage = data.result;
    } else if (typeof data === "string") {
      aiMessage = data;
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
