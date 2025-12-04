export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      // Append access key
      formData.append("access_key", env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData // This keeps multipart/form-data format
        // Do NOT set headers here, fetch will do it properly with boundary
      });
  
      const text = await response.text();
  
      // Web3Forms sometimes returns non-JSON error; log raw response for debugging
      console.log("Web3Forms raw response:", text);
  
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        // If not JSON, return raw text as error
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON response", raw: text }),
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
  