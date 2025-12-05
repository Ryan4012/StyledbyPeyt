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
  
      let resultText = await response.text();
  
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        console.error("Failed to parse JSON from Web3Forms:", resultText);
        return new Response(
          JSON.stringify({ error: "Invalid response from Web3Forms", details: resultText }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }
  
      console.log("WEB3FORMS RESULT:", result);
  
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: response.status,
      });
  
    } catch (err) {
      console.error("Submit.js Error:", err);
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}
  