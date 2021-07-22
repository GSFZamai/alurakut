import { SiteClient } from 'datocms-client';

export default async function criaComunidades(req, res) {
    const TOKEN = 'ecf595397195f75995e7bc7ebdb24c';
    const client = new SiteClient(TOKEN);

    if(req.method === "POST") {
        const newComunity = await client.items.create({
            itemType: '983317',
            ...req.body
        });
    
        res.json({
            ...newComunity
        })

        return
    }

    res.status(404).send('I can GET no!');
}