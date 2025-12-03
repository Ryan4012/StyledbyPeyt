export async function onRequest(context) {
    try {
      const formData = await context.request.formData();
  
      // Append access_key from env var
      const accessKey = context.env.WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        return new Response(
          JSON.stringify({ success: false, error: 'Access key missing in environment' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      formData.append('access_key', accessKey);
  
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: response.status,
      });
    } catch (error) {
      // Return the error message so you can see it in devtools
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  