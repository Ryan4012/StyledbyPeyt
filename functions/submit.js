export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      const payload = new FormData();
      for (const [key, value] of formData.entries()) {
        payload.append(key, value);
      }
  
      payload.append("access_key", env.WEB3FORMS_ACCESS_KEY);
      payload.append("subject", "New contact form submission");
      payload.append("replyTo", formData.get("email") || "");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
  
      const result = await response.json();
      console.log("Web3Forms API response:", result);
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }
  