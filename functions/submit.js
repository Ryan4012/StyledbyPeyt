export async function onRequestPost({ request, env }) {
    try {
      const formData = await request.formData();
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";
  
      const payload = {
        access_key: env.WEB3FORMS_ACCESS_KEY,
        subject: "New Contact Form Message",
        from_name: "StyledByPeyt Website",
        botcheck: "",
        data: {
          name,
          email,
          message,
        },
        replyTo: email
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
      console.log("Web3Forms raw response:", result);
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status
      });
  
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
  }
  