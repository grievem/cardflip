export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const XIMILAR_API_TOKEN = process.env.XIMILAR_API_TOKEN || 'YOUR_TOKEN_HERE';

  try {
    const { imageBase64, action } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const endpoint = action === 'grade' 
      ? 'https://api.ximilar.com/collectibles/v2/grade'
      : 'https://api.ximilar.com/collectibles/v2/sport_id';

    const ximilarResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${XIMILAR_API_TOKEN}`,
      },
      body: JSON.stringify({
        records: [{ _base64: imageBase64 }],
        pricing: true,
        slab_id: true,
        magic_ai: true,
      }),
    });

    if (!ximilarResponse.ok) {
      const errorText = await ximilarResponse.text();
      return res.status(ximilarResponse.status).json({ error: 'Ximilar API error', details: errorText });
    }

    const data = await ximilarResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}
