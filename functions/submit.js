export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      // Create new FormData to forward to Web3Forms
      const payload = new FormData();
      for (const [key, value] of formData.entries()) {
        payload.append(key, value);
      }
  
      // Required
      payload.append("access_key", env.WEB3FORMS_ACCESS_KEY);
  
      // Optional but recommended
      payload.append("subject", "New contact form submission");
      payload.append("from_name", formData.get("name") || "");
      payload.append("replyTo", formData.get("email") || "");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload
      });
  
      const text = await response.text();
      console.log("Web3Forms raw response:", text);
  
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: "Invalid JSON from Web3Forms",
          raw: text
        }), { status: 500 });
      }
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status
      });
  
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
  