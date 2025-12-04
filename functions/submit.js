export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
  
      // Log values to see what is actually received
      console.log("Received form data:", { name, email, message });
  
      const payload = {
        access_key: env.WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload),
      });
  
      const raw = await response.text();
      console.log("Web3Forms raw response:", raw);
  
      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON response", raw }),
          { headers: { "Content-Type": "application/json" }, status: 500 }
        );
      }
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
}
  