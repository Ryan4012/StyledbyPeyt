export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
  
      // Create a new FormData for the Web3Forms API request
      const payload = new FormData();
  
      // Copy all fields from original form
      for (const [key, value] of formData.entries()) {
        payload.append(key, value);
      }
  
      // Append your access key
      payload.append("access_key", env.WEB3FORMS_ACCESS_KEY);
  
      // Send the form data as multipart/form-data
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload
      });
  
      const result = await response.json();
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
      });
  
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }
  