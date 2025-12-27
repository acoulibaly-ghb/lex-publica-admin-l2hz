
export const config = {
    runtime: 'edge',
};

// Note: Cette route nécessite l'installation de @vercel/kv et la configuration des variables d'environnement
// Si non configuré, elle renvoie une erreur explicative pour le prof.

export default async function handler(req: Request) {
    // Support des formats : Vercel KV, Upstash Marketplace, ou préfixe personnalisé 'STORAGE'
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.STORAGE_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.STORAGE_REST_API_TOKEN;
    const kvEnabled = kvUrl && kvToken;

    // GET: Récupérer tous les profils (pour le dashboard prof)
    if (req.method === 'GET') {
        if (!kvEnabled) return new Response(JSON.stringify({ error: 'DATABASE_NOT_CONFIGURED', message: 'Veuillez configurer Vercel KV ou Upstash Redis.' }), { status: 500 });

        try {
            const profiles = await fetch(`${kvUrl}/get/global_profiles`, {
                headers: { Authorization: `Bearer ${kvToken}` }
            }).then(res => res.json()).then(data => JSON.parse(data.result || '[]'));

            return new Response(JSON.stringify(profiles), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
            return new Response(JSON.stringify([]), { status: 200 });
        }
    }

    // POST: Sauvegarder ou mettre à jour un profil
    if (req.method === 'POST') {
        if (!kvEnabled) return new Response(JSON.stringify({ error: 'DB_DISABLED' }), { status: 500 });

        try {
            const { profile } = await req.json();

            // On récupère la liste actuelle
            const currentProfiles = await fetch(`${kvUrl}/get/global_profiles`, {
                headers: { Authorization: `Bearer ${kvToken}` }
            }).then(res => res.json()).then(data => JSON.parse(data.result || '[]'));

            // On fusionne (mise à jour ou ajout)
            const index = currentProfiles.findIndex((p: any) => p.id === profile.id);
            if (index !== -1) {
                currentProfiles[index] = profile;
            } else {
                currentProfiles.push(profile);
            }

            // On sauvegarde
            await fetch(`${kvUrl}/set/global_profiles`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${kvToken}` },
                body: JSON.stringify(currentProfiles)
            });

            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
            return new Response(JSON.stringify({ error: 'SYNC_ERROR' }), { status: 500 });
        }
    }

    return new Response('Method Not Allowed', { status: 405 });
}
