import admin from 'firebase-admin';
import fetch from 'node-fetch';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const firestore = admin.firestore();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, email, telefono, monto } = req.body;

    try {
      console.log('Saving data to Firestore:', req.body);
      await firestore.collection('fees').add({
        nombre,
        email,
        telefono,
        monto,
        timestamp: new Date().toISOString(),
      });

      const paypalResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
      });

      const { access_token } = await paypalResponse.json();

      const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: monto,
              },
            },
          ],
        }),
      });

      const orderData = await orderResponse.json();

      if (orderData.error) {
        console.error('PayPal Order Creation Error:', orderData);
        res.status(500).json({ error: 'Error al procesar el pago con PayPal.' });
      } else {
        const approveUrl = orderData.links.find(link => link.rel === 'approve').href;
        res.status(200).json({ url: approveUrl });
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.status(500).json({ error: 'Error al procesar el pago.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
