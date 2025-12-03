export async function onRequest(context) {
    try {
      const originalFormData = await context.request.formData();
  
      // Create a new FormData
      const formData = new FormData();
  
      // Copy existing form entries
      for (const [key, value] of originalFormData.entries()) {
        formData.append(key, value);
      }
  
      // Append your Web3Forms access key
      formData.append('access_key', context.env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
  
      const text = await response.text();
  
      // Log for debugging (this appears in your Cloudflare worker logs)
      console.log("Web3Forms response text:", text);
  
      // Try to parse JSON from response
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        return new Response(JSON.stringify({
          success: false,
          error: "Web3Forms response is not valid JSON",
          raw: text
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }
  
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: response.status,
      });
  
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  
  