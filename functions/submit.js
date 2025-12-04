export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      const payload = {
        access_key: env.WEB3FORMS_ACCESS_KEY,
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        botcheck: formData.get("botcheck") || ""  // optional
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"  // required to avoid 1106 error
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
          JSON.stringify({ success: false, error: "Invalid JSON response", raw: text }),
          { headers: { "Content-Type": "application/json" }, status: 500 }
        );
      }
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }
  