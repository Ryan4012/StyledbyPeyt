export async function onRequest(context) {
    try {
      const formData = await context.request.formData();
      formData.append('access_key', context.env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
  
      const text = await response.text();  // get raw text response
  
      console.log("Web3Forms response text:", text);
  
      // Now try to parse JSON only if valid
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
  
  