export async function onRequestPost({ request, env }) {
    try {
      const incomingFormData = await request.formData();
  
      const formData = new FormData();
      for (const [key, value] of incomingFormData.entries()) {
        formData.append(key, value);
      }
  
      formData.append("access_key", env.WEB3FORMS_ACCESS_KEY);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const text = await response.text();
      console.log("Web3Forms raw response:", text);
  
      return new Response(text, {
        headers: { "Content-Type": "application/json" },
        status: response.status
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
  