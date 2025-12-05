export async function onRequestPost(context) {
    try {
    
      const formData = await context.request.formData();
  
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
  
      const payload = {
        access_key: context.env.WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      console.log("WEB3FORMS RESULT:", result);

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
  
    } catch (err) {
      console.error("Submit.js Error:", err);
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500 }
      );
    }
}
  