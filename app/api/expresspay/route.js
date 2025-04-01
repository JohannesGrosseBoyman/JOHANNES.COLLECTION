import axios from "axios";

export async function POST(req) {
  try {
    const { phoneNumber, amount, provider } = await req.json();

    // ExpressPay API Credentials
    const EXPRESSPAY_MERCHANT_ID = process.env.EXPRESSPAY_MERCHANT_ID;
    const EXPRESSPAY_API_KEY = process.env.EXPRESSPAY_API_KEY;

    // API URL for ExpressPay
    const url = "https://sandbox.expresspaygh.com/api/submit.php"; // Use live URL in production

    // ExpressPay Payment Data
    const paymentData = {
      merchant_id: EXPRESSPAY_MERCHANT_ID,
      api_key: EXPRESSPAY_API_KEY,
      amount: amount, // Amount in GHS
      order_id: `order-${Date.now()}`,
      currency: "GHS",
      phone_number: phoneNumber,
      provider: provider, // "MTN" | "VODAFONE" | "AIRTELTIGO"
      redirect_url: "http://localhost:3000/order-confirmation", // Update for production
    };

    // Send Payment Request to ExpressPay
    const response = await axios.post(url, paymentData, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract Payment URL for Redirection
    if (response.data.result === 1) {
      return new Response(JSON.stringify({ url: response.data.checkout_url }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: response.data.message }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
