export async function onRequest(context) {
    try {
      const originalFormData = await context.request.formData();
  
      // DEBUG — log what Cloudflare thinks your env variable is
      console.log("ENV KEY:", context.env.WEB3FORMS_ACCESS_KEY);
  
      // Create a new FormData
      const formData = new FormData();
  
      // Copy existing form entries
      for (const [key, value] of originalFormData.entries()) {
        formData.append(key, value);
      }
  
      // Append your Web3Forms access key
      formData.append("access_key", context.env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const text = await response.text();
  
      console.log("Web3Forms response text:", text);
  
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Web3Forms response is not valid JSON",
            raw: text,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
  }
  