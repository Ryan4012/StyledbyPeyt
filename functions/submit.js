export async function onRequestPost(context) {
    try {
      const formData = await context.request.formData();
  
      // Attach your secret key
      formData.append("access_key", context.env.WEB3FORMS_ACCESS_KEY);
  
      // Send to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const result = await response.json();
      console.log("WEB3FORMS RESULT:", result);
  
      return new Response(JSON.stringify(result), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      console.error("Submit.js Error:", err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  