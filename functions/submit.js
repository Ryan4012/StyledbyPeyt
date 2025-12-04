export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
      const payload = {
        access_key: env.WEB3FORMS_ACCESS_KEY,
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        botcheck: formData.get("botcheck")
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"  // <-- FIXES CLOUDFLARE ERROR 1106
        },
        body: JSON.stringify(payload)
      });
  
      const raw = await response.text();
      console.log("Web3Forms raw response:", raw);
  
      // Try to parse JSON
      let result;
      try {
        result = JSON.parse(raw);
      } catch (e) {
        return new Response(
          JSON.stringify({ success: false, error: raw }),
          { status: 500 }
        );
      }
  
      return new Response(JSON.stringify(result), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { status: 500 }
      );
    }
  }
  