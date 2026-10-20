export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();

        const result = await env.AI.run(
          "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
          {
            messages: [
              {
                role: "system",
                content:
                  "You are ChatGujju AI, a helpful assistant. Reply in the language used by the user."
              },
              {
                role: "user",
                content: String(body.message || "")
              }
            ]
          }
        );

        return Response.json({ reply: result.response });
      } catch (error) {
        return Response.json(
          { error: "AI response unavailable. Please try again." },
          { status: 500 }
        );
      }
    }

    return new Response("ChatGujju AI Backend is running!");
  }
};