import { createClient } from '@supabase/supabase-js';

const url = 'https://bpexhtlgxbmvtpvivxiw.supabase.co';
const key = 'sb_publishable_Kv3F2eGU5PWShCOZs0XSAw_QLL9M29l';

const supabase = createClient(url, key);

async function checkSchema() {
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    if (error) {
        console.error('Error fetching data:', error);
    } else if (data && data.length > 0) {
        console.log('Columns in projects table:', Object.keys(data[0]));
    } else {
        console.log('No data in projects table. Checking OpenAPI schema...');
        try {
            const response = await fetch(`${url}/rest/v1/`, {
                headers: { 'apikey': key }
            });
            const schema = await response.json();
            const projectsTable = schema.definitions.projects;
            if (projectsTable) {
                console.log('Columns in projects table (schema):', Object.keys(projectsTable.properties));
            } else {
                console.log('Projects table not found in schema definitions.');
            }
        } catch (err) {
            console.error('Failed to fetch schema:', err);
        }
    }
}

checkSchema();
