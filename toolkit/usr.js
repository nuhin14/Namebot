const fs = "fs".import().promises;
const { role } = await './toolkit/role.js'.r();

export class ArchiveMemories {

    static async add(somebody) {
        const obj = {
           chat: 1,
           role: role(1),
           energy: cfg.first.energy
        };
        await fs.writeFile(fol[6] + somebody, JSON.stringify(obj, null, 2));
        return obj;
    }

    static async get(somebody) {
        let status = false;
        let stats = await fs.stat(fol[6] + somebody).catch(() => false);
        if (!stats) return status;

        let usr = await fs.readFile(fol[6] + somebody, 'utf8');
        try {
            let arc = JSON.parse(usr);
            arc.role = await role(arc.chat);
            return arc;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('File content:', usr);
            throw error; 
        }
    }

    static async addEnergy(somebody, jmlh) {
        let usr = await fs.readFile(fol[6] + somebody, 'utf8');
        try {
            let arc = JSON.parse(usr);
            arc.energy += parseInt(jmlh);
            arc.role = await role(arc.chat);
            await fs.writeFile(fol[6] + somebody, JSON.stringify(arc, null, 2));
            return arc;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('File content:', usr);
            throw error;
        }
    }

    static async reduceEnergy(somebody, jmlh) {
        let usr = await fs.readFile(fol[6] + somebody, 'utf8');
        try {
            let arc = JSON.parse(usr);
            arc.role = await role(arc.chat);
            let newEnergy = arc.energy - parseInt(jmlh);
            arc.energy = newEnergy < 0 ? 0 : newEnergy;
            await fs.writeFile(fol[6] + somebody, JSON.stringify(arc, null, 2));
            return arc;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('File content:', usr);
            throw error;
        }
    }

    static async addChat(somebody) {
        let usr = await fs.readFile(fol[6] + somebody, 'utf8');
        try {
            let arc = JSON.parse(usr);
            arc.chat += 1;
            arc.role = await role(arc.chat);
            await fs.writeFile(fol[6] + somebody, JSON.stringify(arc, null, 2));
            return arc;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('File content:', usr);
            throw error;
        }
    }
}