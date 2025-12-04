export async function onRequestPost({ request, env }) {
    try {
      const incomingFormData = await request.formData();
  
      // Create a new FormData instance
      const formData = new FormData();
  
      // Copy all entries from incoming formData to new FormData
      for (const [key, value] of incomingFormData.entries()) {
        formData.append(key, value);
      }
  
      // Append access_key
      formData.append("access_key", env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData, // content-type will be set automatically with boundary
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
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }
  