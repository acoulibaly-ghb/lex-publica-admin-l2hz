
export const config = {
    runtime: 'edge',
};

// Note: Cette route nécessite l'installation de @vercel/kv et la configuration des variables d'environnement
// Si non configuré, elle renvoie une erreur explicative pour le prof.

export default async function handler(req: Request) {
    const kvEnabled = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

    // GET: Récupérer tous les profils (pour le dashboard prof)
    if (req.method === 'GET') {
        if (!kvEnabled) return new Response(JSON.stringify({ error: 'DATABASE_NOT_CONFIGURED', message: 'Veuillez configurer Vercel KV pour la synchro globale.' }), { status: 500 });

        try {
            // Simulation ou appel réel si configuré
            const profiles = await fetch(`${process.env.KV_REST_API_URL}/get/global_profiles`, {
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
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
            const currentProfiles = await fetch(`${process.env.KV_REST_API_URL}/get/global_profiles`, {
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
            }).then(res => res.json()).then(data => JSON.parse(data.result || '[]'));

            // On fusionne (mise à jour ou ajout)
            const index = currentProfiles.findIndex((p: any) => p.id === profile.id);
            if (index !== -1) {
                currentProfiles[index] = profile;
            } else {
                currentProfiles.push(profile);
            }

            // On sauvegarde
            await fetch(`${process.env.KV_REST_API_URL}/set/global_profiles`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
                body: JSON.stringify(currentProfiles)
            });

            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
            return new Response(JSON.stringify({ error: 'SYNC_ERROR' }), { status: 500 });
        }
    }

    return new Response('Method Not Allowed', { status: 405 });
}
