export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      // Log all form fields for debugging
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      const payload = {
        access_key: env.WEB3FORMS_ACCESS_KEY,
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        message: formData.get("message") || ""
      };
  
      console.log("Payload to Web3Forms:", JSON.stringify(payload));
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload)
      });
  
      const text = await response.text();
      console.log("Web3Forms raw response:", text);
  
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON from Web3Forms", raw: text }),
          { headers: { "Content-Type": "application/json" }, status: 500 }
        );
      }
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
  
    } catch (err) {
      console.error("Error in Worker:", err);
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }
  